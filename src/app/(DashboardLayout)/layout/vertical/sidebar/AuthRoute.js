// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// const AuthRoute = ({ children }) => {
//   const router = useRouter();
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Use useSelector directly

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace('/auth/auth1/login');
//     }
//   }, [isAuthenticated, router]);
  
//   if (!isAuthenticated) {
//     return null; // Prevent rendering children if not authenticated
//   }
//   // if (!isAuthenticated) {
//   //   router.replace('/auth/auth1/login');
//   //   return null;
//   // }

//   return children;
// };

// export default AuthRoute;

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Use useSelector directly
  const isDaysLeft = useSelector((state) => state.user.daysLeft); // Use useSelector directly

  if (!isAuthenticated) {
    router.replace('/login');
    return null; // Prevent rendering children if not authenticated
  }
  if (isAuthenticated && isDaysLeft===0) {
    const subscribed = useSelector((state) => state.user.currentUser.is_subscribed); // Use useSelector directly
    if(subscribed===false){
    router.replace('/login');
    return null; // Prevent rendering children if not authenticated
  }}
  return children;
};

export default AuthRoute;
