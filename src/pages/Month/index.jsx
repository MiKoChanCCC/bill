import { useEffect, useMemo, useState } from "react";
import { NavBar, DatePicker } from "antd-mobile";
import { useSelector } from "react-redux";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import "./index.scss";
import DayBill from "./components/DayBill";

const Month = () => {
  // 控制日期选择
  const [visible, setVisible] = useState(false);

  const [currentTime, setCurrentTime] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  // 将异步数据按月分组
  const { billList } = useSelector((state) => state.bill);
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  // console.log("asd", monthGroup);

  const [currentMonthList, setCurrentMonthList] = useState([]);

  // 确认的回调函数
  const confirm = (data) => {
    setVisible(false);
    const formatData = dayjs(data).format("YYYY-MM");
    setCurrentTime(formatData);
    setCurrentMonthList(monthGroup[formatData] || []);
  };
  // console.log(currentMonthList);

  // 初始化时显示的数据
  useEffect(() => {
    // 获取并格式化当前时间
    const nowDate = dayjs().format("YYYY-MM");
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);

  const monthList = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((pre, next) => {
        return pre + next.money;
      }, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((pre, next) => {
        return pre + next.money;
      }, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentMonthList]);

  const trueVisible = () => {
    setVisible(true);
  };

  // 按日分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD"),
    );
    const keys = Object.keys(groupData);
    return {
      groupData,
      keys,
    };
  }, [currentMonthList]);

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
              <span className="money">{monthList.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthList.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthList.total.toFixed(2)}</span>
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
        {dayGroup.keys.map((key) => {
          return (
            <DayBill key={key} date={key} billList={dayGroup.groupData[key]} />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
