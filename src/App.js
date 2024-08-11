import "./App.css";
import { Center, Flex, Box } from "@chakra-ui/react";
import Auth from "./Pages/AuthPage/Auth";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import { useLocation } from "react-router-dom";
import SearchPage from "./Pages/SearchPage/SearchPage";
import UserPage from "./Pages/UserPage/UserPage";
import useAuthStore from "./store/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
function App() {
  const location = useLocation();
  
  const authUser = useAuthStore(state => state.user)
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      
        <Navbar>
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/auth' /> } />
            <Route path="/auth" element={!authUser ? <Auth />  :  <Navigate to='/' />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:username" element={<UserPage />} />
          </Routes>
        </Navbar>
      
    </>
  );
}

export default App;
