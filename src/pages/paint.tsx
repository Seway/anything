/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-13 13:51:40
 */
import React, { useState } from "react";
import Draggable from "react-draggable";

import "./paint.less";

const right = [
  {
    name: "A1",
  },
  {
    name: "A2",
  },
];

const left = [
  {
    name: "B1",
  },
  {
    name: "B2",
  },
];
export default () => {
  const [nodeList, setNodeList] = useState([1, 2, 3, 4, 5]),
    [connectList, setConnectList] = useState([]),
    addNode = () => {
      setNodeList([...nodeList, nodeList.length]);
    },
    pushConnectList = (arg) => {
      setConnectList([...connectList, arg]);
    },
    leftClick = (e, Item) => {
      const { from, formActionName } = window.inter_my_0119;
      console.log(
        from,
        formActionName,
        Item,
        e.target.getAttribute("action-name")
      );
      pushConnectList({
        from,
        formActionName,
        to: Item,
        toActionName: e.target.getAttribute("action-name"),
      });
    },
    rightClick = (e, Item) => {
      const actionName = e.target.getAttribute("action-name"),
        point = Item;
      window.inter_my_0119 = {
        from: point,
        formActionName: actionName,
      };
      console.log(actionName, point);
    };
  return (
    <div className="paint">
      <button onClick={() => addNode()}>addNode</button>
      {nodeList.map((Item) => {
        return (
          <Draggable key={Item} handle=".drag-handler">
            <div className="paint-node">
              <div
                className="paint-node-left"
                onMouseUp={(e) => leftClick(e, Item)}
              >
                {left.map((l) => (
                  <div
                    key={l.name}
                    action-name={l.name}
                    className="paint-node-left-single"
                  >
                    {l.name}
                  </div>
                ))}
              </div>
              <div className="drag-handler">{Item}</div>
              <div
                className="paint-node-right"
                onMouseDown={(e) => rightClick(e, Item)}
              >
                {right.map((r) => (
                  <div
                    key={r.name}
                    action-name={r.name}
                    className="paint-node-right-single"
                  >
                    {r.name}
                  </div>
                ))}
              </div>
            </div>
          </Draggable>
        );
      })}
      <div className="paint-list">
        {connectList.map((item, index) => {
          return (
            <li key={index}>
              项目{item.from}-任务{item.formActionName} 触发 项目{item.to}
              -任务{item.toActionName}
            </li>
          );
        })}
      </div>
    </div>
  );
};
