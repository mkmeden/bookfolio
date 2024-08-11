import useAuthStore from "../store/auth";
import {auth,firestore} from "../firebase/firebase"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from "./useShowToast";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"; 
const useSignUpWithEmailAndPassword = ()=>{
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser= useAuthStore(state => state.login)

    const signup = async (inputs) => {
      console.log(inputs)
        if (
            !inputs.email ||
            !inputs.password ||
            !inputs.username ||
            !inputs.name||
            !inputs.confirmPassword
          ) {
            showToast("Error", "Please fill all the fields", "error");

            return;
          }

          if(inputs.password !== inputs.confirmPassword)
          {
            showToast('Error' , "Passwords doesnt match"  , 'error');
            return
          }
        
          const usersRef = collection(firestore,  'users');
          const q  = query(usersRef , where('username', '==' , inputs.username))
          const querySnapshot = await getDocs(q);
          
          if(!querySnapshot.empty){
            showToast('Error' , 'username already exist','error' )
            return
          }

          try{
            const newUser = await createUserWithEmailAndPassword(inputs.email , inputs.password)
            
            if(!newUser && error)
            {
                showToast('Error', error.message , 'error')
            }

            if(newUser)
            {
                const userDoc = {
                    uid : newUser.user.uid,
                    name : inputs.name,
                    username : inputs.username ,
                    friends : [], 
                    likes : [],
                    reads : [],
                    profilePicURL : "" ,

                }

                const userDocRef = doc(firestore, 'users', newUser.user.uid);
                await setDoc(userDocRef ,userDoc )
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc)
                showToast('Success', 'Signing up is successful' , 'success')

            }
        
        }
          catch(error)
          {
            showToast('Error',  error.message , 'error')
          }
      
    }

    return [loading , error, signup]

}


export default useSignUpWithEmailAndPassword;