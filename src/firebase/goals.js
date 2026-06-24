import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

export const createGoal = async (
  userId,
  goalData
) => {
  await addDoc(
    collection(db, "users", userId, "goals"),
    {
      ...goalData,
      createdAt: serverTimestamp(),
    }
  );
};

export const getGoals = async (userId) => {
  const snapshot = await getDocs(
    collection(db, "users", userId, "goals")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};