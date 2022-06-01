/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-01 10:14:14
 */
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes,Route } from "react-router-dom";

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

ReactDOM.render(<App />, document.getElementById("root"));
