"use client"

import StepsComponent from "../components/dashboard-steps";
import DataCards from "../components/data-cards";
import Faqs from "../components/faqs";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ProductRecommendations from "../components/recommendation";
import CommentsSection from "../components/user-comments";
import withAuth from "../context/withAuth";


function Dashboard() {

  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <Navbar />
      <DataCards />

      <StepsComponent />
      <ProductRecommendations />
      <div className="flex flex-col my-10 mx-4 w-full lg:flex-row items-center justify-center">
        <div className="grid h-auto mx-6 place-items-center">
          <Faqs />
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="grid h-auto mx-6 place-items-center">
          <CommentsSection />
        </div>
      </div>
      <Footer />
    </main>

  );
}

export default withAuth(Dashboard);

