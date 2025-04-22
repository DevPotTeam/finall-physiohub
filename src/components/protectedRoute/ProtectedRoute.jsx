// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children, user }) => {
//   const location = useLocation();

//   const isTeacherRoute = location.pathname.includes("teacher");

//   // Example: only allow access if user is a teacher
//   if (isTeacherRoute && user?.role !== "teacher") {
//     return <Navigate to="/user/dashboard" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
