import { useContext, useEffect } from 'react';
import { AuthContext } from './authContext';
import Link from 'next/link';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { currentUser } = useContext(AuthContext);
  
    useEffect(() => {
      // Here to check if currentUser is null and current page is not the login page
      if (!currentUser && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }, [currentUser]);

    // If currentUser is not null render the wrapped component
    return currentUser ? <WrappedComponent {...props} /> : null;
  };
};


export default withAuth;
