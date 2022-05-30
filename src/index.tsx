/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 14:44:03
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-05-30 15:59:00
 */
// webpack的入口文件：src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import "./index.less";

import Menu from './pages/Menu.tsx';
function App() {
  return (
    <div className="App">
      <Menu></Menu>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
