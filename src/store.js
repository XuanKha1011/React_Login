import { createStore } from "redux";
import rotateReducer from "reducers/rotateReducer";
import { connect } from "react-redux";

function configureStore(state = { rotating: true }) {
  return createStore(rotateReducer,state);
}

export default configureStore;
