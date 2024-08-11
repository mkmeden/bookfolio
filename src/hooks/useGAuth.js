import React from 'react'
import { auth, firestore } from '../firebase/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import useAuthStore from '../store/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const useGAuth = () => {

const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
const showToast = useShowToast()
const loginUser = useAuthStore((state) => state.login);

 const GLogin = async () => {

    try {
        const newUser = await signInWithGoogle();

        if(newUser)
        {
            const useRef = doc(firestore, "users" , newUser.user.uid);
            const userSnap = await getDoc(useRef);

            if(userSnap.exists())
            {
                const userDoc = userSnap.data()
                localStorage.setItem('user-info', JSON.stringify(userDoc))
                loginUser(userDoc);
            }

            else
            {
                const userDoc = {
                    uid : newUser.user.uid,
                    name : newUser.user.displayName,
                    username : newUser.user.email.split("@")[0] ,
                    friends : [], 
                    likes : [],
                    reads : [],
                    profilePicURL : "" ,
                }

                await setDoc(doc(firestore , "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info" , JSON.stringify(userDoc));
                loginUser(userDoc)
            }
        }

        else
        {
            showToast('Error',  error.message, 'error');
        }
    } catch (error) {
        showToast("Error",  error.message , 'error');
    }
 }

  return {GLogin};
}

export default useGAuth
