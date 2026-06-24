import { db } from "./firebaseConfig";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

/* =========================
   TRANSACTIONS
========================= */

export const addTransaction = async (
  transaction
) => {
  return await addDoc(
    collection(db, "transactions"),
    transaction
  );
};

export const getTransactions = async (
  userId
) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort(
      (a, b) =>
        (b.createdAt || 0) -
        (a.createdAt || 0)
    );
};

export const deleteTransaction =
  async (id) => {
    await deleteDoc(
      doc(db, "transactions", id)
    );
  };

/* =========================
   BUDGETS
========================= */

export const addBudget = async (
  budget
) => {
  return await addDoc(
    collection(db, "budgets"),
    budget
  );
};

export const getBudgets = async (
  userId
) => {
  const q = query(
    collection(db, "budgets"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateBudget = async (
  id,
  data
) => {
  await updateDoc(
    doc(db, "budgets", id),
    data
  );
};

export const deleteBudget =
  async (id) => {
    await deleteDoc(
      doc(db, "budgets", id)
    );
  };

/* =========================
   GOALS
========================= */

export const addGoal = async (
  goal
) => {
  return await addDoc(
    collection(db, "goals"),
    goal
  );
};

export const getGoals = async (
  userId
) => {
  const q = query(
    collection(db, "goals"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateGoal = async (
  id,
  data
) => {
  await updateDoc(
    doc(db, "goals", id),
    data
  );
};

export const deleteGoal =
  async (id) => {
    await deleteDoc(
      doc(db, "goals", id)
    );
  };

/* =========================
   USER PROFILE
========================= */

export const createUserProfile =
  async (profile) => {
    return await addDoc(
      collection(db, "users"),
      profile
    );
  };

export const getUserProfile =
  async (userId) => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
  };