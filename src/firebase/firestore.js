import { db } from "./firebaseConfig";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addTransaction = async (transaction) => {
  return await addDoc(
    collection(db, "transactions"),
    transaction
  );
};

export const getTransactions = async (userId) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};