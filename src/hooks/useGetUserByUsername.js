import React from "react";
import useShowToast from "./useShowToast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useState } from "react";

const useGetUserByUsername = () => {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const searchUser = async (username) => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (username.length === 0) {
        showToast(
          "Not found",
          `No user with the name ${username} is found`,
          "info"
        );
        setLoading(false);
        return;
      }

      if (querySnapshot.empty) {
        showToast(
          "Not found",
          `No user with the name ${username} is found`,
          "info"
        );
        setLoading(false);
        return;
      }

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return [searchUser, user, loading];
};

export default useGetUserByUsername;
