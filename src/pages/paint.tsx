/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-21 15:43:49
 */
import React, { useState, useEffect } from "react";

import setGraph, { center } from "../util/demo";
import Drawer from "../pages/Drawer";
import "./paint.less";

// let graph, dnd, oNmessage;
// setTimeout(() => {
//   const result = setGraph();
//   graph = result.graph;
//   dnd = result.dnd;
//   oNmessage = result.oNmessage;
// }, 0);
export default () => {
  const [selectedList, setSelectedList] = useState([]);
  let graph, dnd;

  useEffect(() => {
    const result = setGraph();
    graph = result.graph;
    dnd = result.dnd;
  }, []);
  const startDrag = (e) => {
    const target = e.currentTarget;
    const type = target.getAttribute("data-type");
    const newNode = center.createDndNode(type);
    const node = graph.createNode(newNode.viewData);
    dnd.start(node, e.nativeEvent);
  };

  return (
    <div className="top">
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
      <Drawer selectedList={selectedList} setSelectedList={setSelectedList} />
    </div>
  );
};
