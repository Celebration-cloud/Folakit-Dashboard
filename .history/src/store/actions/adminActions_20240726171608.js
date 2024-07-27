import { doc, onSnapshot } from "firebase/firestore";
import { ActionTypes } from "."
import { db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {
  try {
    const s = onSnapshot(doc(db, "users"), (doc) => {
      console.log("Current data: ", doc.data());
    });
    dispatch({ type: ActionTypes.GET_CUSTOMER_LIST });
    return () => {
      s();
    }
  } catch (error) {
    toaster.danger(error.message)
  }

}
