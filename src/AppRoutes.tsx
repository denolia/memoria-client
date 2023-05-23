import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInContainer } from "./Auth/Login/containers/SignInContainer";
import { SignUpContainer } from "./Auth/Login/containers/SignUpContainer";
import { Header } from "./Header";
import { BoardView } from "./Items/Board/BoardView";
import { CalendarView } from "./Items/Calendar/CalendarView";

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
        <Route path="/" element={<BoardView />} />
        <Route path="/calendar" element={<CalendarView />} />

        <Route path="/login" element={<SignInContainer />} />
        <Route path="/register" element={<SignUpContainer />} />
      </Routes>
    </div>
  );
}
