import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect } from "react";
import NotFound from "./components/reuseable/notFound/NotFound";
import Spinner from "./components/reuseable/spinner/Spinner";
import LoginPage from "./layout/AdminDashboard/LoginPage";
import { useDispatch } from "react-redux";
import { getCustomerList } from "./store/actions/adminActions";

// Lazy load all components
const AdminDashboard = lazy(() =>
  import("./layout/AdminDashboard/AdminDashboard")
);

function App() {
  const dispatch = useDispatch()

  const fet = useCallback(
    () => {
      dispatch(getCustomerList())
      dispatch(getCustomerList())

    },
    [dispatch],
  )
  
 useEffect(() => {
   return fet
  
 }, [fet])

 

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        {" "}
        {/* Provide a fallback while components are loading */}
        <Routes>
            <Route path="/" element={<LoginPage/>} />
          <Route path="/admin" element={<AdminDashboard />} />
         
          {/* Corrected the path for WishList */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
