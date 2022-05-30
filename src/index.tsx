/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 14:44:03
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-05-30 14:52:14
 */
// webpack的入口文件：src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import "./index.less";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Webpack V5 + React </h1>
      </header>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
