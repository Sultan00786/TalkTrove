import React, { lazy } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));

function App() {
  return (
    <div className=" bg-sky-100 w-full h-[100vh]">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/group" element={<Group />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
