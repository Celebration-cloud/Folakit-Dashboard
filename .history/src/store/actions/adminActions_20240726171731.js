import { doc, onSnapshot } from "firebase/firestore";
import { ActionTypes } from "."
import { db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// EXAMPLE HOW TO USE ACTION
export const getCustomerList = (dispatch) => {
  try {
    const customerRef = doc(db, "users")
    const dispatchShot = getDocs
    const unsubscribe = onSnapshot(doc(db, "users"), (doc) => {
      console.log("Current data: ", doc.data());
    });
    dispatch({ type: ActionTypes.GET_CUSTOMER_LIST });
    return () => {
      unsubscribe();
    }
  } catch (error) {
    toaster.danger(error.message)
  }

}
