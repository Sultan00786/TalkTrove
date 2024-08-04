import React, { Suspense, lazy } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Loader from "./components/layout/Loader";
import Cookies from "universal-cookie";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const GroupEdit = lazy(() => import("./components/editGroup/GroupEdit"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user, token } = useSelector((state) => state.user);
  if (token) {
    const cookies = new Cookies();
    cookies.set("ChatApp_token", token, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  }
  return (
    <div className=" bg-gray-200 w-full min-h-[100vh] overflow-hidden">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={true} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/groups" element={<Group />} />
              <Route
                path="/groups/group-edit/:chatId"
                element={<GroupEdit />}
              />
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
