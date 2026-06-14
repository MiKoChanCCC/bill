import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBillList } from "@/store/modules/billReducer";
import { TabBar } from "antd-mobile";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";
import "./index.scss";

const tabs = [
  {
    key: "/month",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

export default function Layout() {
  const dispatch = useDispatch();
  // const { billList } = useSelector((state) => state.bill);
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
