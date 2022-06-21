/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-06-21 16:44:33
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-21 16:56:17
 */
import { createStore } from "redux";

function counterReducer(state = { query: [] }, action) {
  switch (action.type) {
    case "query/Describe":
      return { query: [...state.query, action.arg] };
    case "query/Unsubscribe":
      return { query: state.query.filter((node) => node.id != action.arg.id) };
    default:
      return state;
  }
}

const store = createStore(counterReducer);
export default store;

// store.dispatch({ type: "counter/incremented" });
// // {value: 1}
// store.dispatch({ type: "counter/incremented" });
// // {value: 2}
// store.dispatch({ type: "counter/decremented" });
// {value: 1}
