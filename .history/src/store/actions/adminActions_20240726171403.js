import { ActionTypes } from "."
import { doc, onSnapshot } from "firebase/firestore";

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {

  const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
  });
  dispatch({ type: ActionTypes.GET_CUSTOMER_LIST })

}
