import { combineReducers } from "redux"
import quoteReducer from "./adminReducer"

export default combineReducers({
  quote: quoteReducer
})
