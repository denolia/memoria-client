import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInContainer } from "./Auth/Login/containers/SignInContainer";
import { SignUpContainer } from "./Auth/Login/containers/SignUpContainer";
import { Header } from "./Header/Header";
import { CalendarView } from "./Items/Calendar/CalendarView";
import { ManageSpace } from "./Spaces/ManageSpace";
import { EpicBoardView } from "./views/EpicBoardView";
import { TaskBoardView } from "./views/TaskBoardView";

const sections = [
  { title: "board", url: "/" },
  { title: "calendar", url: "/calendar" },
  { title: "epics", url: "/epics" },
  { title: "triage", url: "/triage" },
];

export function AppRoutes() {
  return (
    <div className="container">
      <Header sections={sections} />
      <Routes>
        <Route path="/" element={<TaskBoardView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/epics" element={<EpicBoardView />} />

        <Route path="/login" element={<SignInContainer />} />
        <Route path="/register" element={<SignUpContainer />} />
        <Route path="/spaces/:spaceId" element={<ManageSpace />} />
      </Routes>
    </div>
  );
}
