import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Landing from './pages/Landing';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import { useSetRecoilState } from "recoil";
import { authAtom } from "./store/atom/authAtom.tsx";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKENED_URL } from '../config';
import VerifyEmail from './pages/VerifyEmail.tsx';

function App() {
  const setAuthAtom = useSetRecoilState(authAtom);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       setIsLoggedIn(false);
  //       return;
  //     }

  //     axios.post(`${BACKENED_URL}/api/v1/user/signin`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `${token}`
  //       }
  //     }).then(() => {
  //       setAuthAtom(true);
  //       setIsLoggedIn(true);
  //     }).catch(() => {
  //       setIsLoggedIn(false);
  //     })
  //   }
  //   checkAuth();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path='/publish' element={<CreateBlog />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
