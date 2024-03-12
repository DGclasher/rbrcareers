import { Readable } from "stream";
import { createObjectCsvStringifier } from "csv-writer";

export const exportCsv = async (data) => {
  try {
    let records = [];
    data.forEach((applicant) => {
      const formattedQualifications = applicant.qualifications
        .map((q) => `${q.degree} - ${q.institute}`)
        .join(", ");
      records.push({
        name: applicant.applicantName,
        email: applicant.applicantEmail,
        phone: applicant.applicantPhone,
        yearsOfExperience: applicant.yearsOfExperience,
        qualifications: formattedQualifications,
        resumeUrl: applicant.resumeUrl,
      });
    });

    const csvWriter = createObjectCsvStringifier({
      header: [
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "phone", title: "Phone" },
        { id: "yearsOfExperience", title: "YOE" },
        { id: "qualifications", title: "Qualifications" },
        { id: "resumeUrl", title: "Resume" },
      ],
    });

    const csvData = csvWriter.getHeaderString() + csvWriter.stringifyRecords(records);
    const csvStream = new Readable();
    csvStream.push(csvData);
    csvStream.push(null);
    return csvStream;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
