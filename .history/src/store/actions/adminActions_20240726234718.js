import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ActionTypes } from "."
import { db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// EXAMPLE HOW TO USE ACTION


export const getCustomerList = () => async (dispatch) => {
  try {
    const customerRef = collection(db, "users");
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
  
  
  } catch (error) {
    
    toaster.danger(error.message)
  }
};
export const getCustomerOrders = () => async (dispatch) => {
  try {
    const customerRef = collection(db, "orders");
   const unsubscribe = onSnapshot(customerRef, (snapshot) => {
      const documentData = [];
      snapshot.forEach((doc) => {
        // Extract data and add document ID
        documentData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch({ type: ActionTypes.GET_CUSTOMER_ORDERS, payload: documentData });
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  
  
  } catch (error) {
    
    toaster.danger(error.message)
  }
};

export const updateOrder = (id,userData) => async () => {
    try {
        const updateOrderRef = doc(db, "orders", userData.id);

        await updateDoc(updateOrderRef, {
          status: userData.status,
        });

    } catch (error) {
         toaster.warning( error.message )
         console.log( error.message )
    }
}

export const updateProductItem = (userData) => async () => {
    try {
        const productCollectionRef = collection(db, "products");

        await updateDoc(productCollectionRef, userData);

    } catch (error) {
         toaster.warning( error.message )
         console.log( error.message )
    }
}
export const getProductItems = () => async (dispatch) => {
  try {
    const productCollectionRef = collection(db, "products");

    const unsubscribe = onSnapshot(productCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      dispatch({ type: ActionTypes.GET_PRODUCT_LIST, payload: newData });
    });
    return () => {
      unsubscribe();
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    toaster.danger(errorCode, errorMessage);
  }
};