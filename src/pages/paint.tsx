/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-21 16:58:14
 */
import React, { useEffect } from "react";

import setGraph, { center } from "../util/demo";
import Drawer from "../pages/Drawer";
import store from "../store";

import "./paint.less";
export default () => {
  let graph, dnd;
  useEffect(() => {
    const result = setGraph({ store });
    graph = result.graph;
    dnd = result.dnd;
    // store.subscribe(() => console.log(store.getState()));
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
      <Drawer />
    </div>
  );
};
