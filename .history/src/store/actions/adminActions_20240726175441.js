import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ActionTypes } from "."
import { db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// EXAMPLE HOW TO USE ACTION


export const getCustomerList = (userData) => async (dispatch, getState) => {
  try {
    const customerRef = collection(db, "users");
    const dispatchShot = await getDocs(customerRef);
    if (!dispatchShot.) {
   const unsubscribe = onSnapshot(customerRef, (snapshot) => {
      const documentData = [];
      snapshot.forEach((doc) => {
        // Extract data and add document ID
        documentData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch({ type: ActionTypes.GET_CUSTOMER_LIST, payload: documentData });
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  
    }else{
      toaster.notify('No customers found', {
        intent: 'error',
        });
    }
  
  } catch (error) {
    
    toaster.danger(error.message)
  }
};