import {useState, useEffect} from 'react'
import useAuthStore from '../store/auth'
import { firestore } from '../firebase/firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'


const useAddFriend = (userId) => {
    const [isLoading , setIsLoading] = useState(false)
    const [isFriends , setIsFriends] = useState(false)
    const authUser = useAuthStore(state=>state.user)
    const setAuthUser = useAuthStore(state=> state.setUser)
    const addFriend = async(userId) => {

        setIsLoading(true)

        const currentUserRef = doc(firestore , 'users' , authUser.uid)
        await updateDoc(currentUserRef , {
            ...authUser, 
            friends :  isFriends ? arrayRemove(userId) :  arrayUnion(userId)
        })

        if(isFriends)
        {
            setAuthUser({...authUser , friends : authUser.friends.filter((uid) => uid!=userId)})
            localStorage.setItem('user-info' , JSON.stringify(authUser))
            setIsFriends(false)
        }

        else
        {
            setAuthUser({...authUser , friends : [...authUser.friends , userId]})
            localStorage.setItem('user-info' , JSON.stringify(authUser))
            setIsFriends(true)

        }

        setIsLoading(false)

    }

    useEffect(() =>{

        console.log("before",authUser)
        const updateStateAuthUser=  async()=> {
            const docRef = doc(firestore, "users", authUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAuthUser(docSnap.data());
                localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
              }
        }
        updateStateAuthUser()
        console.log("after",authUser)
  
        if(authUser)
        {
             const isFriends = authUser.friends.includes(userId)
             setIsFriends(isFriends)
        }
    } , [ userId,isFriends])


  return [addFriend, isFriends,isLoading]
}

export default useAddFriend
