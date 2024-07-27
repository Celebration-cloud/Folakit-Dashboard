import { applyMiddleware, compose, createStore } from "redux"
import appReducer from "./reducers"

const middlewares = [
  // Add your middlewares here
]
const enhancer = (import.process.env.NODE_ENV === "development"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose
  : compose)(applyMiddleware(...middlewares))

export default createStore(appReducer, enhancer)
