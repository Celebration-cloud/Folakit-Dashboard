import React from 'react'
import { useSelector } from 'react-redux';

function Dashboard() {
    const { customerList, orderList, productList } = useSelector((state) => state.admin);
  return (
    <div className="bg-background text-primary-foreground min-h-screen p-8">
      <h1 className="text-3xl text-black font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
          <p className="text-3xl font-bold">{customerList.length}</p>
        </div>
        <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">5,678</p>
        </div>
        <div className="bg-destructive text-destructive-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">987</p>
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
