import { ActionTypes } from "."

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {
  import { doc, onSnapshot } from "firebase/firestore";

  const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
  });
  dispatch({ type: ActionTypes.GET_CUSTOMER_LIST })

}
