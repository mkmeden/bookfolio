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

const useOnRead = (bookData) => {
  const setUser = useAuthStore((state) => state.setUser);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const setBooks = useBookStore((state) => state.setBooks);
  const [read, setRead] = useState(false);
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    const autoCheckRead = async () => {
      if (!authUser || !bookData?.id) return;

      const userDocRef = doc(firestore, "users", authUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setRead(userDoc.data().reads.includes(bookData.id));
      }
    };

    autoCheckRead();
  }, [authUser, bookData]);

  const readMark = async (bookData) => {
    try {
      setisLoading(true);

      const userDocRef = doc(firestore, "users", authUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        if (userDoc.data().reads.includes(bookData.id)) {
          console.log("not empty");

          await updateDoc(doc(firestore, "users", authUser.uid), {
            reads: arrayRemove(bookData.id),
          });

          setUser({...authUser , reads : userDoc.data().reads.filter((id) => id!== bookData.id)} )
          localStorage.setItem('user-info' , JSON.stringify(authUser)) //new

          await updateDoc(doc(firestore, "books", bookData.id), {
            reads: arrayRemove(authUser.uid),
          });

          showToast(
            "Read",
            "Succefully removed from read, book has been removed from your collection",
            "success"
          );
        } else {
          console.log(" empty");
  
          const bookDocRef = doc(firestore, "books", bookData.id);
          const bookDoc = await getDoc(bookDocRef);
          const book = {
            id: bookData.id,
            likes: bookDoc.data()?  bookDoc.data().likes:[] , 
            reads: [authUser.uid],
            title: bookData.title,
            description: bookData.description?bookData.description : "",
            thumbnail: bookData.thumbnail,
          };
          if(!bookDoc.data())
            await setDoc(doc(firestore, "books", bookData.id), book);
            else
            {
              await updateDoc(doc(firestore, "books", bookData.id), {
                reads: arrayUnion(authUser.uid),
              });
            }
            
          await updateDoc(doc(firestore, "users", authUser.uid), {
            reads: arrayUnion(bookData.id),
          });
          setUser({...authUser , reads : [...userDoc.data().reads, bookData.id]} )
          localStorage.setItem('user-info' , JSON.stringify(authUser)) //new

          showToast(
            "Read",
            "Succefully read the book, book has been added to your collection",
            "success"
          );
        }
      }

      setRead(!userDoc.data().reads.includes(bookData.id));
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setisLoading(false);
    }
  };

  return [readMark, read, loading];
};

export default useOnRead;
