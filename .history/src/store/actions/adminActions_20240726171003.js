import { ActionTypes } from "."

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {
  firebase.database().ref(/* path */).on(eventType,(snapshot)=> {
   /* handle read data */
  console.log( /* log data */)
   });

  dispatch({ type: ActionTypes.GET_CUSTOMER_LIST })

}
