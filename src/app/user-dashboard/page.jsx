"use client"

import DataCards from "../components/data-cards";
import Footer from "../components/footer";
import SupportComponent from "../components/get-support";
import Navbar from "../components/navbar";
import Steps from "../components/steps";
import withAuth from "../context/withAuth";


function Dashboard() {

  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <Navbar />
      <DataCards />

      <Steps />
      <SupportComponent />
      <Footer />
    </main>

  );
}

export default withAuth(Dashboard);

