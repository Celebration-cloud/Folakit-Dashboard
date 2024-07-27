import { ActionTypes } from "."

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {
  dispatch({ type: ActionTypes.GET_CUSTOMER_LIST })
  
}
