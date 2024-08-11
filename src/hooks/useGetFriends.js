import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/auth';
import useProfileStore from '../store/profile';

const useGetFriends = () => {

    const [friends , setFriends] = useState([])
    const showToast = useShowToast();
    const authUser = useAuthStore(state=> state.user)
    const userProfile = useProfileStore(state=>state.user)
    const getFriends = async() => {

        try {
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("uid", "in", userProfile.friends));
        
            const querySnapshot = await getDocs(q);
        
            let data = [];
        
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });

            setFriends(data);

        } catch (error) {
            showToast("Error", error.message, 'error');
        }
    }

  return [getFriends , friends];
}

export default useGetFriends
