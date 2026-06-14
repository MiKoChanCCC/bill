import { Button } from "antd-mobile";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBillList } from "@/store/modules/billReducer";

export default function Layout() {
  const dispatch = useDispatch();
  const { billList } = useSelector((state) => state.bill);
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);
  return (
    <div>
      Layout
      <Outlet />
      <Button color="primary">qweqwre</Button>
      <div className="purple">
        <Button color="primary">asdqw</Button>
      </div>
      <ul>
        {billList.map((item) => {
          <li key={item.id}>{item.useFor}</li>;
        })}
      </ul>
    </div>
  );
}
