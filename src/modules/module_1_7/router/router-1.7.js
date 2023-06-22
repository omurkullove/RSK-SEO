import React from "react";
import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage";

export const Mainrouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};
