import { useMemo, useState } from "react";
import { NavBar, DatePicker } from "antd-mobile";
import { useSelector } from "react-redux";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import "./index.scss";

const Month = () => {
  const [visible, setVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const { billList } = useSelector((state) => state.bill);
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log("asd", monthGroup);

  const confirm = (data) => {
    setVisible(false);
    const formatData = dayjs(data).format("YYYY-MM");
    setCurrentTime(formatData);
  };

  const trueVisible = () => {
    setVisible(true);
  };

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">{currentTime}账单</span>
            <span
              className={classNames("arrow", visible && "expand")}
              onClick={trueVisible}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={visible}
            onConfirm={confirm}
            onCancel={() => setVisible(false)}
            onClose={() => setVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
