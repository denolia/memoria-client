import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInContainer } from "./Auth/Login/containers/SignInContainer";
import { SignUpContainer } from "./Auth/Login/containers/SignUpContainer";
import { Header } from "./Header";
import { BoardView } from "./Items/Board/BoardView";

const sections = [
  { title: "Board", url: "/" },
  { title: "Add Task", url: "/create" },
];

export function AppRoutes() {
  return (
    <div className="container">
      <Header title="Task tracker" sections={sections} />

      <Routes>
        <Route path="/" element={<BoardView />} />
        {/* <Route path="/edit/:id" element={<EditPage />} /> */}
        {/* <Route path="/create" element={<CreateItemPage />} /> */}
        <Route path="/login" element={<SignInContainer />} />
        <Route path="/register" element={<SignUpContainer />} />
      </Routes>
    </div>
  );
}
