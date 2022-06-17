/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-17 10:17:12
 */
import React, { useState } from "react";

import setGraph, { center } from "../util/demo";
import "./paint.less";

let graph = null;
setTimeout(() => {
  graph = setGraph();
}, 0);
export default () => {
  const [nodeType, setNodeType] = useState("action");
  //渲染链接效果
  const addNode = (type) => {
    const newNode = center.createNode(type);
    //视图新建
    graph.resetCells([
      ...graph.getNodes(),
      ...graph.getEdges(),
      graph.createNode(newNode.viewData),
    ]);
  };
  return (
    <div className="top">
      <button onClick={() => addNode(nodeType)}>新建</button>
      <select onChange={(e) => setNodeType(e.target.value)}>
        <option value="action">action</option>
        <option value="judge">judge</option>
      </select>
      <div className="paint" id="container"></div>
      <div  id="miniMap"></div>
    </div>
  );
};
