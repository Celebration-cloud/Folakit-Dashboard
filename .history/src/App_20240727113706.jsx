import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect } from "react";
import NotFound from "./components/reuseable/notFound/NotFound";
import Spinner from "./components/reuseable/spinner/Spinner";
import LoginPage from "./layout/AdminDashboard/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList, getCustomerOrders, getProductItems } from "./store/actions/adminActions";
import { ActionTypes } from "./store/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./server/firebase/firebaseConfig";
import { toaster } from "evergreen-ui";

// Lazy load all components
const AdminDashboard = lazy(() =>
  import("./layout/AdminDashboard/AdminDashboard")
);

function App() {
  const dispatch = useDispatch()
  const { session } = useSelector((state) => state.admin);
  useEffect(() => {
    const handleAuthStateChange = (user) => {
      const fet = useCallback(
        () => {
          dispatch(getCustomerList())
          dispatch(getCustomerOrders())
          dispatch(getProductItems())
        },
        [dispatch],
      )
      if (user) {
        // User is signed in
        dispatch({ type: ActionTypes.GET_SESSION, payload: user });
        toaster.success("Logged in Successfully");
      } else {
        // User is signed out
        dispatch({ type: ActionTypes.GET_SESSION, payload: null });
      }
    };

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      // Cleanup: Unsubscribe from authentication state changes
      unsubscribe();
    };
  }, [dispatch]);

  
 useEffect(() => {
  return fet
  
 }, [fet])

 

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        {" "}
        {/* Provide a fallback while components are loading */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {session && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}

          {/* Corrected the path for WishList */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
