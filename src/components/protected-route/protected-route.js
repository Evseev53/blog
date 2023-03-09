import { Navigate } from 'react-router-dom';

export default function ProtectedRoute ({ logged, redirectPath = '/articles', children }) {
  if (!logged) {
    return <Navigate to={ redirectPath } replace />;
  }
  return children;
}