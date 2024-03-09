import firebaseConfig from "../config/firebaseconfig.js";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadResumeToFirebase = async (resumeFile, id) => {
  try {
    const storageRef = ref(
      storage,
      `resumes/${id}.${resumeFile.originalname.split(".").pop()}`
    );
    await uploadBytes(storageRef, resumeFile.buffer);
    const resumeUrl = await getDownloadURL(storageRef);
    return resumeUrl;
  } catch (error) {
    console.error("Error uploading resume to Firebase:", error);
    throw error;
  }
};

export const deleteFileFromFirebase = async (resumeUrl) => {
  try {
    const fileRef = ref(storage, resumeUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting resume from Firebase:", error);
    throw error;
  }
};
