import React from "react";
import useBookStore from "../store/books";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
const useGetBooks = () => {

  const setBooks = useBookStore((state) => state.setBooks);
  const showToast = useShowToast();
  const getBooks = async () => {
    try {

      const books =[]
      const querySnapshot = await getDocs(collection(firestore, "books"));
      querySnapshot.forEach((doc) => {
  
        books.push(doc.data());
      });
      
      setBooks(books);

    } catch (error) {
      showToast("Error" , error.message , "error")
    }
  };

  return [getBooks]
};

export default useGetBooks;
