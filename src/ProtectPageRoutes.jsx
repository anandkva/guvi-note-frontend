import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import MyTeam from "./pages/MyTeam";
import PersonalTodo from "./pages/PersonalTodo";
import ProtectRoute from "./components/ProtectRoute";
import PageNotFound from "./pages/PageNotFound";

export default function ProtectPageRoutes() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-6">
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/my-team" element={<MyTeam />} />
            <Route exact path="/todo" element={<PersonalTodo />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}
