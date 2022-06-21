/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-06-21 13:36:24
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-21 17:02:53
 */

import React, {
  useState,
  //   useEffect,
} from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import store from "../store";

import "./Drawer.less";
export default () => {
  const [selectedList, setSelectedList] = useState([]);
  store.subscribe(() => {
    setSelectedList(store.getState().query);
    console.log(store.getState());
  });

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="drawer">
      <Collapse onChange={onChange}>
        {selectedList.map((node) => (
          <Panel header={node.id} key={node.id}>
            <p>{JSON.stringify(node.ports)}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
