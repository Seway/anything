/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 16:40:01
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-05-31 14:42:08
 */
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import About from "./About";
export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={["2"]} mode="inline">
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Routes>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};
