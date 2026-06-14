import { Button } from "antd-mobile";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      Layout
      <Outlet />
      <Button color="primary">qweqwre</Button>
      <div className="purple">
        <Button color="primary">asdqw</Button>
      </div>
    </div>
  );
}
