// import { useState } from "react";
import { Menu, Typography } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import {
  BillingIcon,
  Dashboard,
  File,
  ListIcon,
  User,
  LogoWhite,
} from "../icon/Icon";

const { Text, Title } = Typography;

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand" style={{ display: "flex" }}>
        <LogoWhite size={40} />
        <span style={{ display: "flex", flexWrap: "wrap", alignContent: "center" }}>FPT-SEP Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <Dashboard />
            </span>
            <span className="label">Trang chủ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/billing">
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              <BillingIcon />
            </span>
            <span className="label">Hóa đơn</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/user">
            <span
              className="icon"
              style={{
                background: page === "users" ? color : "",
              }}
            >
              <User size={20} />
            </span>
            <span className="label">Danh sách người dùng</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/job">
            <span
              className="icon"
              style={{
                background: page === "jobs" ? color : "",
              }}
            >
              <ListIcon />
            </span>
            <span className="label">Danh sách công việc</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/applications">
            <span
              className="icon"
              style={{
                background: page === "jobs" ? color : "",
              }}
            >
              <File size={16} />
            </span>
            <span className="label">
              Danh sách đơn<br />ứng tuyển
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/freelancerProfile">
            <span
              className="icon"
              style={{
                background: page === "jobs" ? color : "",
              }}
            >
              <File size={16} />
            </span>
            <span className="label">Freelacner Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
