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
  
  } catch (error) {
    
    toaster.danger(error.message)
  }
};