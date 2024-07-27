import { ActionTypes } from "../actions"

const initialState = {
  customerList: null,
  orderList: null,
  productList: null,
  loading: false,
  session: null
}

// EXAMPLE OF A REDUCER
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMER_LIST:
      return { ...state, customerList: action.payload, loading: false }

    case ActionTypes.GET_CUSTOMER_ORDERS:
      return { ...state, orderList: action.payload, loading: false }

    case ActionTypes.GET_PRODUCT_LIST:
      return { ...state, productList: action.payload, loading: false }
    
    default:
      return { ...initialState }
  }
}

export default adminReducer
