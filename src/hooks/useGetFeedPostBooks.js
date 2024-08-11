import React, { useEffect, useState } from "react";
import useAuthStore from "../store/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPostBooks = () => {
    const [loading , setLoading] = useState(false )
  const authUser = useAuthStore((state) => state.user);
  const [friendsBooks, setFriendsBooks] = useState([]);
  const getFeedBooks = async () => {

    setLoading(true)
    if(authUser.friends.length==0)
    {
        setLoading(false)
        return
    }
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("uid", "in", authUser.friends));

    const querySnapshot = await getDocs(q);

    let data = [];

    querySnapshot.forEach((doc) => {
      data.push({
        name: doc.data().name,
        profilePicURL : doc.data().profilePicURL,
        likes: doc.data().likes,
        reads: doc.data().reads,
      });
    });

    const allBooks = [];
    const booksSnapshot = await getDocs(collection(firestore, "books"));
    booksSnapshot.forEach((doc) => {
      allBooks.push(doc.data());
    });

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].likes.length; j++) {
        data[i].likes[j] = allBooks.find(
          (item) => item.id === data[i].likes[j]
        );
      }

      for (let j = 0; j < data[i].reads.length; j++) {
        data[i].reads[j] = allBooks.find(
          (item) => item.id === data[i].reads[j]
        );
      }

      let bData = [];

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].likes.length; j++) {
          if (data[i].likes[j])
            bData.push({
              name: data[i].name,
              profilePicURL : data[i].profilePicURL,
              type: "liked",
              book: data[i].likes[j],
            });
        }

        for (let j = 0; j < data[i].reads.length; j++) {
          if (data[i].reads[j])
            bData.push({
              name: data[i].name,
              profilePicURL : data[i].profilePicURL,
              type: "read",
              book: data[i].reads[j],
            });
        }
      }

      setFriendsBooks(bData);
      setLoading(false)
    }
  };

  useEffect(() => {
    console.log("effect is run")
    getFeedBooks();
  }, [authUser.likes , authUser.reads]);

  return [friendsBooks, loading];
};

export default useGetFeedPostBooks;
