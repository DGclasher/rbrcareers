import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import Application from '../models/application.js';

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('resumes');
});

export const applyJob = async (req, res) => {
    try {
        const {
            jobId,
            applicantName,
            applicantEmail,
            applicantPhone,
            coverLetter
        } = req.body;
        
        if (!req.files || !req.files.resume) {
            return res.status(400).json({ message: 'No resume file uploaded.' });
        }

        const resumeFile = req.files.resume;

        // Create write stream for uploading resume to GridFS
        const writeStream = gfs.createWriteStream({
            filename: resumeFile.name,
            metadata: {
                contentType: resumeFile.mimetype
            }
        });

        // Pipe the file buffer to GridFS
        writeStream.write(resumeFile.data);

        writeStream.on('close', async (file) => {
            // Resume uploaded successfully to GridFS
            const newApplication = new Application({
                jobId,
                applicantName,
                applicantEmail,
                applicantPhone,
                coverLetter,
                resume: {
                    fileId: mongoose.Types.ObjectId(file._id), // Convert file._id to ObjectId
                    filename: file.filename,
                    contentType: file.metadata.contentType
                }
            });

            await newApplication.save();

            return res.status(201).json({ message: "Application submitted successfully", id: newApplication._id });
        });

        writeStream.end(); // End the write stream
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
