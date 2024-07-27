import { signOut } from 'firebase/auth';
import React from 'react'
import { useSelector } from 'react-redux';
import { auth } from '../../server/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toaster } from 'evergreen-ui';

function Dashboard() {
    const navigate = useNavigate()
    const { customerList, orderList, productList } = useSelector((state) => state.admin);
    async function handleSignOut(){
        try {
          await signOut(auth);
          navigate("/");
          toaster.success("Signed Out Successfully");
        } catch (error) {
      toaster.danger(error.message);
    }
    }
  return (
    <div className="bg-background text-primary-foreground min-h-screen p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 md:mr-8">
          Admin Dashboard
        </h1>
        <button onClick={handleSignOut} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/80">
          Sign Out
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
          <p className="text-3xl font-bold">
            {customerList?.length.toLocaleString()}
          </p>
        </div>
        <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">
            {orderList?.length.toLocaleString()}
          </p>
        </div>
        <div className="bg-destructive text-destructive-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">
            {productList?.length.toLocaleString()}
          </p>
        </div>
        <div className="bg-muted text-muted-foreground p-6 rounded-lg col-span-1 md:col-span-2 lg:col-span-3 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Other Highlights</h2>
          <ul className="list-disc pl-6">
            <li>Total Revenue: $50,000</li>
            <li>Top Selling Product: Product Name</li>
            <li>Busiest Day: Monday</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
