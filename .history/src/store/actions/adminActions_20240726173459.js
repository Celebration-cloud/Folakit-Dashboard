import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ActionTypes } from "."
import { db } from "../../server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// EXAMPLE HOW TO USE ACTION


export const getCustomerList = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType });
    const { data } = await axios.post(URL, userData);
    dispatch({ type: actionType, payload: data });
  } catch (error) {
    
    toaster.danger(error.message)
  }
};