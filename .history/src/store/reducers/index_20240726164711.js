import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    key: reducerName
})

const reduxStore = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk)))

export default reduxStore