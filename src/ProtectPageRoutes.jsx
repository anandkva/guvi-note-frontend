import React from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import MyTeam from "./pages/MyTeam";
import PersonalTodo from "./pages/PersonalTodo";
import ProtectRoute from "./components/ProtectRoute";
import PageNotFound from "./pages/PageNotFound";
import CreateGoalForm from "./pages/CreateGoal";
import UpdateTeamGoal from "./pages/UpdateTeamGoal";

export default function ProtectPageRoutes() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-6">
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/team-goal" element={<MyTeam />} />
            <Route exact path="/my-goal" element={<PersonalTodo />} />
            <Route exact path="/create-goal" element={<CreateGoalForm />} />
            <Route exact path="/edit-goal/:id" element={<UpdateTeamGoal />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}
