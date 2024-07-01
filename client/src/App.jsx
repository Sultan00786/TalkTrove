import React, { Suspense, lazy } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Loader from "./components/layout/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const user = true; // to do
  return (
    <div className=" bg-gray-200 w-full min-h-[100vh]">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={true} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/group" element={<Group />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
