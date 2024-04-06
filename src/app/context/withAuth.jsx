import { useContext, useEffect } from 'react';
import { AuthContext } from './authContext';

const withAuth = (WrappedComponent, adminOnly = false) => {
  return (props) => {
    const { currentUser, isUserInfoFetched } = useContext(AuthContext);

    useEffect(() => {
      // Wait until the user info is fetched before checking the user's role
      if (isUserInfoFetched) {
        if (!currentUser && window.location.pathname !== '/login') {
          window.location.href = '/login';
          return;
        }
        if (adminOnly && currentUser?.role !== 'admin') {
          window.location.href = '/not-authorized';
          console.log("Redirecting non-admin user:", currentUser); // Log for debugging
          return;
        }
      }
    }, [currentUser, isUserInfoFetched]);

    // If the user info is not yet fetched, render null or a loading spinner
    if (!isUserInfoFetched) return null;

    // If currentUser is not null render the wrapped component
    return currentUser ? <WrappedComponent {...props} /> : null;
  };
};


export default withAuth;