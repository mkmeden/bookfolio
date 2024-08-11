import React from "react";
import useAuthStore from "../store/auth";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import {
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useBookStore from "../store/books";
import { useState, useEffect } from "react";
const useOnLike = (bookData) => {
  const authUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useShowToast();
  const setBooks = useBookStore((state) => state.setBooks);
  const [liked, setLiked] = useState(false);
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    const autoCheckLike = async () => {
      if (!authUser || !bookData?.id) return;

      const userDocRef = doc(firestore, "users", authUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setLiked(userDoc.data().likes.includes(bookData.id));
      }
    };

    autoCheckLike();
  }, [authUser, bookData]);

  const like = async (bookData) => {
    try {
      setisLoading(true);

      const userDocRef = doc(firestore, "users", authUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        if (userDoc.data().likes.includes(bookData.id)) {
          console.log("not empty");

          await updateDoc(userDocRef, {
            likes: arrayRemove(bookData.id),
          });

          const userDoc2 = await getDoc(userDocRef);
          setUser({
            ...authUser,
            likes: userDoc2.data().likes.filter((id) => id !== bookData.id),
          });
          localStorage.setItem('user-info' , JSON.stringify(authUser)) //new


          await updateDoc(doc(firestore, "books", bookData.id), {
            likes: arrayRemove(authUser.uid),
          });
          showToast(
            "Unliked",
            "Succefully unliked the book, book has been removed from your collection",
            "success"
          );
        } else {
          console.log(" empty");
          const bookDocRef = doc(firestore, "books", bookData.id);
          const bookDoc = await getDoc(bookDocRef);
          const book = {
            id: bookData.id,
            likes: bookDoc.data()? [...bookDoc.data().likes , authUser.uid]:[authUser.uid],
            reads: bookDoc.data() ? bookDoc.data().reads : [],
            title: bookData.title,
            description: bookData.description ? bookData.description : "",
            thumbnail: bookData.thumbnail,
          };

          console.log("empty case", bookData);
          if(!bookDoc.data())
          { 
            await setDoc(doc(firestore, "books", bookData.id), book);
          }
          else
          {
            console.log("boom")

            await updateDoc(doc(firestore, "books", bookData.id), {
              likes: arrayUnion(authUser.uid),
            });
          }
          
          await updateDoc(doc(firestore, "users", authUser.uid), {
            likes: arrayUnion(bookData.id),
          });

          setUser({
            ...authUser,
            likes: [...userDoc.data().likes, bookData.id],
          });

                    localStorage.setItem('user-info' , JSON.stringify(authUser)) //new


          showToast(
            "Liked",
            "Succefully liked the book, book has been added to your collection",
            "success"
          );
        }
      }

      setLiked(!userDoc.data().likes.includes(bookData.id));
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setisLoading(false);
    }
  };

  return [like, liked, loading];
};

export default useOnLike;
