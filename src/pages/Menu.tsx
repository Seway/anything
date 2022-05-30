import { Drawer } from "antd";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

import "./Menu.less";

export default () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="Menu-button" onClick={showDrawer}>
        Open
      </div>

      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </Drawer>
    </>
  );
};
