import { createStore } from "redux";

function userReducer(state = { user: {} }, action) {
  switch (action.type) {
    case "admin/add":
      state.user = action.payload
      return { state };
    case "student/add":
      state.user= action?.payload
      return { state };
    default:
      return state;
  }
}

let store = createStore(userReducer);

export default store;
