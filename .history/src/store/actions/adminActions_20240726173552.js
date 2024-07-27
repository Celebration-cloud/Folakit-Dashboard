import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ActionTypes } from "."
import { db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// EXAMPLE HOW TO USE ACTION


export const getCustomerList = (userData) => async (dispatch, getState) => {
  try {
    const customerRef = collection(db, "users");
    const dispatchShot = await getDocs(customerRef);
    if (!dispatchShot.empty()) {
      
    }
    const unsubscribe = onSnapshot(customerRef, (doc) => {
      console.log("Current data: ", doc.data());
    });
    dispatch({ type: ActionTypes.GET_CUSTOMER_LIST });
    return () => {
      unsubscribe();
    };
  } catch (error) {
    
    toaster.danger(error.message)
  }
};