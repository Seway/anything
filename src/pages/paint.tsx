/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-17 16:21:34
 */
import React, { useState } from "react";

import setGraph, { center } from "../util/demo";
import "./paint.less";

let graph = null;
let dnd = null;
setTimeout(() => {
  const result = setGraph();
  graph = result.graph;
  dnd = result.dnd;
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

  const startDrag = (e) => {
    const target = e.currentTarget;
    const type = target.getAttribute("data-type");
    const newNode = center.createFakeNode(type);
    const node = graph.createNode(newNode.viewData);

    dnd.start(node, e.nativeEvent);
  };
  return (
    <div className="top">
      <div>
        <button onClick={() => addNode(nodeType)}>新建</button>
        <select onChange={(e) => setNodeType(e.target.value)}>
          <option value="action">action</option>
          <option value="judge">judge</option>
        </select>
      </div>
      <div className="dnd-wrap">
        列表
        <div data-type="action" className="dnd-rect" onMouseDown={startDrag}>
          action
        </div>
        <div data-type="judge" className="dnd-circle" onMouseDown={startDrag}>
          judge
        </div>
      </div>
      <div className="paint" id="container"></div>
      <div id="miniMap"></div>
    </div>
  );
};
