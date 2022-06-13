/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-10 17:30:06
 */
import React, { useState } from "react";

import Factory from "../util/factory";
const factory=new Factory();
export default () => {
  const [taskList, setTaskList] = useState(factory.taskList);
  const findTask = (id) => {
    const res=taskList.find((item) => item.id == id);
   return res;
  };
  const actionList = (
    <div>
      <p>list</p>
      {factory.taskList.map((element) => {
        if (element.type === "action")
          return (
            <div key={element.id}>
              <p style={{ color: element.color }}>
                {element.id}/{element.type}
              </p>
              <ul>
                {element.connectTask.map(item=><li>{item.id}</li>)}
              </ul>
              <input onChange={(e) => element.addTask(findTask(e.target.value))} />
              <button onClick={()=>element.execute({data:1})}>激活</button>
            </div>
          );
      })}
    </div>
  );
  const enterList = (
    <div>
      <p>list</p>
      {factory.taskList.map((element) => {
        if (element.type === "enter")
          return (
            <div key={element.id}>
              <p style={{ color: element.color }}>
                {element.id}/{element.type}
              </p>
              <ul>
                {element.connectTask.map(item=><li>{item.id}</li>)}
              </ul>
              <input onChange={(e) => element.addTask(findTask(e.target.value))} />
              <button onClick={()=>{element.execute({data:1});}}>激活</button>
            </div>
          );
      })}
    </div>
  );
  return (
    <div>
      <p>动作-任务</p>
      <button
        onClick={() => {
          console.log("click", taskList, factory.taskList);
          factory.createTask("action");
          setTaskList([...factory.taskList]);
          // setFactory(factory);
        }}
      >
        新增action
      </button>
      {actionList}

      <p>动作-入口</p>
      <button
        onClick={() => {
          console.log("click", taskList, factory.taskList);
          factory.createTask("enter");
          setTaskList([...factory.taskList]);
          // setFactory(factory);
        }}
      >
        新增enter
      </button>
      {enterList}
    </div>
  );
};
