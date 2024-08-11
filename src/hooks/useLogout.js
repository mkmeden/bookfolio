import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import useAuthStore from '../store/auth';
import {auth} from '../firebase/firebase'
const useLogout = () => {

    const showToast = useShowToast();
    const [signOut, loading, error] = useSignOut(auth);
    const stateLogout = useAuthStore(state=>state.logout)

    const logout = async ()=> {
        
    try {
        
        await signOut();
        showToast('Success' , 'Logged out' , 'success')
        localStorage.removeItem('user-info')
        stateLogout()

    } catch (error) {
        showToast('Error' , error.message, 'error')
    }



    }

  return [logout, loading ,error] 
}

export default useLogout
