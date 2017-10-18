import { createStore } from "redux";
import rootReducer from "./index";

export default function configureStore() {
  let store = createStore(rootReducer);
  return store;
}
