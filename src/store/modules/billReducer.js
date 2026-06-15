import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billReducer = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const { setBillList, addBill } = billReducer.actions;
const fetchBillList = () => {
  return async (dispatch) => {
    let res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};

const fetchAddBill = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8888/ka", data);
    dispatch(addBill(res.data));
  };
};

export { fetchBillList, fetchAddBill };

const reducer = billReducer.reducer;

export default reducer;
