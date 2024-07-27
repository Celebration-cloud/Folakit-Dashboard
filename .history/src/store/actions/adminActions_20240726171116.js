import { ActionTypes } from "."

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {
  const customersRef = Doc

  dispatch({ type: ActionTypes.GET_CUSTOMER_LIST })

}
