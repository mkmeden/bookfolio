import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { firestore, storage } from "../firebase/firebase";
import useAuthStore from "../store/auth";
import useProfileStore from "../store/profile";
import { doc, updateDoc } from "firebase/firestore";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore(state=>state.setUser)
  const setUserProfile = useProfileStore(state=>state.setUserProfile)


  const uploadImage = async (e) => {
    setLoading(true);
    const image = e.target.files[0];

    const storageRef = ref(storage, `images/${authUser.username}`);

    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);

    const updatedUser = {...authUser , profilePicURL : downloadURL}

    const userDocRef = doc(firestore, 'users',authUser.uid )
    await updateDoc(userDocRef , updatedUser)

    setAuthUser(updatedUser)
    setUserProfile(updatedUser)
    localStorage.setItem('user-info' , JSON.stringify(updatedUser))
    localStorage.setItem('profile-info' , JSON.stringify(updatedUser))
    setLoading(false);
  };
  return [uploadImage, loading];
};

export default useUploadImage;
