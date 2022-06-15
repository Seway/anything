/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-14 15:23:55
 */
import React from "react";

import setGraph from "../util/demo";
import "./paint.less";

// const arr = [
//   {
//     id: "1",
//     shape: "er-rect",
//     label: "入口",
//     width: 150,
//     height: 24,
//     position: {
//       x: 24,
//       y: 150,
//     },
//     ports: [
//       {
//         id: "1-7",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "显示",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "1-5",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "隐藏",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "1-6",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "请求接口",
//           },
//           portTypeLabel: {
//             text: "NUMBER",
//           },
//         },
//       },
//       {
//         id: "1-2",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "单击",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "1-3",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "初始化完成",
//           },
//           portTypeLabel: {
//             text: "NUMBER",
//           },
//         },
//       },
//       {
//         id: "1-4",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "请求数据完成",
//           },
//           portTypeLabel: {
//             text: "BOOLEAN",
//           },
//         },
//       },
//     ],
//   },
//   {
//     id: "2",
//     shape: "er-rect",
//     label: "中间件",
//     width: 150,
//     height: 24,
//     position: {
//       x: 250,
//       y: 210,
//     },
//     ports: [
//       {
//         id: "2-1",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "判断为是",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "2-2",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "判断为否",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "312-2",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "判断",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//     ],
//   },
//   {
//     id: "3",
//     shape: "er-rect",
//     label: "出口",
//     width: 150,
//     height: 24,
//     position: {
//       x: 480,
//       y: 350,
//     },
//     ports: [
//       {
//         id: "3-1",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "显示",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "3-2",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "隐藏",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "3-3",
//         group: "action",
//         attrs: {
//           portNameLabel: {
//             text: "请求接口",
//           },
//           portTypeLabel: {
//             text: "NUMBER",
//           },
//         },
//       },
//       //
//       {
//         id: "3-4",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "单击",
//           },
//           portTypeLabel: {
//             text: "STRING",
//           },
//         },
//       },
//       {
//         id: "3-5",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "初始化完成",
//           },
//           portTypeLabel: {
//             text: "NUMBER",
//           },
//         },
//       },
//       {
//         id: "3-6",
//         group: "event",
//         attrs: {
//           portNameLabel: {
//             text: "请求数据完成",
//           },
//           portTypeLabel: {
//             text: "BOOLEAN",
//           },
//         },
//       },
//     ],
//   },
// ];
// const connect = [
//   {
//     id: "4",
//     shape: "edge",
//     source: { cell: "1", port: "1-3" },
//     target: { cell: "2", port: "312-2" },
//     attrs: { line: { stroke: "#A2B1C3", strokeWidth: 2 } },
//     zIndex: 10,
//   },
//   {
//     id: "5",
//     shape: "edge",
//     source: { cell: "2", port: "2-1" },
//     target: { cell: "3", port: "3-1" },
//     attrs: { line: { stroke: "#A2B1C3", strokeWidth: 2 } },
//     zIndex: 10,
//   },
//   {
//     id: "753db278-cc80-4ee4-b682-9934ed17b474",
//     shape: "edge",
//     source: { cell: "2", port: "2-2" },
//     target: { cell: "3", port: "3-3" },
//     attrs: { line: { stroke: "#A2B1C3", strokeWidth: 2 } },
//     zIndex: 11,
//   },
//   {
//     id: "704342da-87aa-406d-9dbc-1174505bbbec",
//     shape: "edge",
//     source: { cell: "1", port: "1-4" },
//     target: { cell: "3", port: "3-2" },
//     attrs: { line: { stroke: "#A2B1C3", strokeWidth: 2 } },
//     zIndex: 12,
//   },
//   {
//     id: "72e352f6-600f-4f10-b84f-4414b7d15dce",
//     shape: "edge",
//     source: { cell: "3", port: "3-4" },
//     target: { cell: "1", port: "1-7" },
//     attrs: { line: { stroke: "#A2B1C3", strokeWidth: 2 } },
//     zIndex: 13,
//   },
// ];
setTimeout(() => {
  setGraph();
}, 0);
export default () => {
  //渲染链接效果

  return (
    <div className='top'>
      <div className="paint" id="container"></div>
    </div>
  );
};
