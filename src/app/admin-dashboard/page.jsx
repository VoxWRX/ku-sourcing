// pages/admin-dashboard.js or any protected page

import ProtectedRoute from "../config/protected-route";

const AdminDashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      {/* Admin dashboard content */}
      <h1>Admin Dashboard</h1>
    </ProtectedRoute >
  );
};

export default AdminDashboard;
