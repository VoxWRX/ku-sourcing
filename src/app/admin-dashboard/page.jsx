"use client"

import React from 'react';
import LineChart from "./admin-dashboard-components/LineChart";
import ClientsComments from "./admin-dashboard-components/ClientsComments";
import Header from "./admin-dashboard-components/Header";
import Sidebar from "./admin-dashboard-components/Sidebar";
import TopCards from "./admin-dashboard-components/TopCards";
import withAuth from '../context/withAuth';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-0 p-4">
        <Header />
        <TopCards />
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <LineChart />
          </div>
          <div className="w-full md:w-1/3">
            <ClientsComments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard, true);
