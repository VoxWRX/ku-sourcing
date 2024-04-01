"use client"
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./sign-up/page";
import SourcingOrders from "./user-sourcing-orders/sourcing-orders";
import Home from "./user-dashboard/page";

  
function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/sign-up' />;
  };


  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <BrowserRouter>
       <Routes>
       <Route path="/">
            <Route path="sign-up" element={<SignUp />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />

        <Route path="user-sourcing-orders">
              <Route
                index
                element={
                  <RequireAuth>
                    <SourcingOrders />
                  </RequireAuth>
                }
              />
        </Route>

        </Route>    
       </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
