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
  },
});

const { setBillList } = billReducer.actions;
const fetchBillList = () => {
  return async (dispatch) => {
    let res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};

export { fetchBillList };

const reducer = billReducer.reducer;

export default reducer;
