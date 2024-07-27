import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ActionTypes } from "."
import { auth, db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// EXAMPLE HOW TO USE ACTION

export const loginAdmin =
  (userData) => async (dispatch) => {
    try {
      const navigate = useNavigate()
      const user = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const users = user.user;
      toaster.success("Logged in Successfully");
      dispatch({ type: ActionTypes.GET_SESSION, payload: users });
      navigate('/admin')
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      dispatch({ type: ActionTypes.GET_LOADING, payload: false });
      toaster.danger(errorCode, errorMessage);
    }
  };

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

export const updateProductItem = async (userData) => {
  try {
    const updatePromises = userData.map(async (item) => {
      const productRef = doc(db, "products", item.product);
      await updateDoc(productRef, {
        quantity: item.quantity,
      });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("An error occurred:", error);
    toaster.warning(error.message); // Show a warning using your toaster library
  }
};
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