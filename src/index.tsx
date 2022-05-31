/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-05-31 14:41:31
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.less";

import Main from "./pages/Main";
const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
