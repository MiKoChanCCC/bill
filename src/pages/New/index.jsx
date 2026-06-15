import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchAddBill } from "@/store/modules/billReducer";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const New = () => {
  const navigate = useNavigate();
  const [typeBill, setTypeBill] = useState("pay");
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState("");
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const moneyChange = (value) => {
    setMoney(value);
  };

  const dispatch = useDispatch();

  // 提交账单事件
  const saveBill = () => {
    // 统计账单
    const data = {
      type: typeBill,
      money: typeBill === "pay" ? -money : +money,
      date: date,
      useFor: useFor,
    };
    dispatch(fetchAddBill(data));
  };

  const dateConfirm = (value) => {
    setDateVisible(false);
    setDate(value);
  };

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(typeBill === "pay" ? "selected" : "")}
            onClick={() => setTypeBill("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames(typeBill === "income" ? "selected" : "")}
            shape="rounded"
            onClick={() => setTypeBill("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>
                {dayjs(date).format("YYYY-MM-DD")}
              </span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onCancel={() => setDateVisible(false)}
                onClose={() => setDateVisible(false)}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[typeBill].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        item.type === useFor ? "selected" : "",
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
