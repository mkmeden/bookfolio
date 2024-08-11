import React from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/auth";
import useShowToast from "./useShowToast";

const useSignIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signIn = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill in all the fields", "error");
    }

    try {

      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());

        showToast("Success", "Logged in Successfuly", "success");
      } else {
        showToast("Error", error.message, "error");
        return;
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return [loading, error, signIn];
};

export default useSignIn;
