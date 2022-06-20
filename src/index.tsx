/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-20 14:38:58
 */
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.less";

import Main from "./pages/Main";
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Main />}></Route>
      </Routes>
    </HashRouter>
  );
};
const root = createRoot(document.getElementById("root"));
root.render(<App />);
