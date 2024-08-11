import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";




const useGetSuggestedUser = () => {

    const [suggestedUsers , setSuggestedUsers] = useState([])

    useEffect(()=>{getSuggestedUser()} , []);
    
  const getSuggestedUser = async () => {

    const querySnapshot = await getDocs(collection(firestore, "users"));

    let data =[];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setSuggestedUsers(data)
  };
  return [suggestedUsers];
};

export default useGetSuggestedUser;
