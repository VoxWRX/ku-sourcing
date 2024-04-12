"use client"

import React, { useEffect, useState } from 'react';
import LineChart from "./admin-dashboard-components/LineChart";
import ClientsComments from "./admin-dashboard-components/ClientsComments";
import Header from "./admin-dashboard-components/Header";
import Sidebar from "./admin-dashboard-components/Sidebar";
import TopCards from "./admin-dashboard-components/TopCards";
import withAuth from '../context/withAuth';
import AdminCommentsSection from '../components/admin-comment';
import LoadingIndicator from '../components/alerts/loading-indicator';
import Footer from '../components/footer';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
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
              <AdminCommentsSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(AdminDashboard, true);
