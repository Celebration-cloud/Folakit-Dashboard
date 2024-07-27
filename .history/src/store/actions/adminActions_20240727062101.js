import { collection, doc, getDocs, onSnapshot, updateDoc, writeBatch } from "firebase/firestore";
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

export const updateOrder = (orderId, userData) => async () => {
    try {
        const updateOrderRef = doc(db, "orders", orderId);

        await updateDoc(updateOrderRef, {
          status: userData,
        });

    } catch (error) {
         toaster.warning( error.message )
         console.log( error.message )
    }
}

export const updateProductItem = (userData) => async () => {
    try {
      const mapRef = userData.map(item => {
        const productRef = doc(db, "products", item.product);
      })
    const collectionRef = collection(db, "products"); // Replace with your actual collection name

    // Fetch all documents in the collection
    const querySnapshot = await getDocs(collectionRef);

    const batch = writeBatch(db)

    // Modify each document (for example, add a new field)
    querySnapshot.forEach((doc) => {
      const updatedData = {
        ...userData// Modify this line as needed
      };

      // Queue the update
      batch.update(doc.ref, updatedData);
    });

    // Commit the batch update
    await batch.commit();
          
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