import { create } from "zustand";

const useProfileStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('profile-info')),
    setUserProfile: (userProfile) => set({user : userProfile}) ,

}))

export default useProfileStore