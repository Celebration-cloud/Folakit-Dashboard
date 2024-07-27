import { ActionTypes } from "../actions"

const initialState = {
  customerList: null,
  orderList: null,
  productList: null,
  loading: false,
}

// EXAMPLE OF A REDUCER
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMER_LIST:
      return { ...state, customerList: null, loading: false }

    case ActionTypes.GET_CUSTOMER_ORDERS:
      return { ...state, orderList: action.payload, loading: false }

    case ActionTypes.GET_PRODUCT_LIST:
      return { ...state, productList: null, loading: false }

    default:
      return { ...initialState }
  }
}

export default adminReducer
