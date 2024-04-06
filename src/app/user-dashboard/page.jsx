"use client"

import StepsComponent from "../components/dashboard-steps";
import DataCards from "../components/data-cards";
import Faqs from "../components/faqs";
import Footer from "../components/footer";
import SupportComponent from "../components/get-support";
import Navbar from "../components/navbar";
import ProductRecommendations from "../components/recommendation";
import withAuth from "../context/withAuth";


function Dashboard() {

  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <Navbar />
      <DataCards />

      <StepsComponent />
      <ProductRecommendations />
      <Faqs />
      <SupportComponent />
      <Footer />
    </main>

  );
}

export default withAuth(Dashboard);

