/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-06-21 13:36:24
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-21 15:04:18
 */

import React, {
  //useState,
  useEffect,
} from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

import "./Drawer.less";
export default (props) => {
  //   const [selectedList, setSelectedList] = useState([]);
  useEffect(() => {
    console.log(props.selectedList);
  }, [props]);
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="drawer">
      <Collapse onChange={onChange}>
        {props.selectedList.map((node) => (
          <Panel header={node.name} key={node.id}>
            <p>{JSON.stringify(node)}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
