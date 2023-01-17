// import './App.css';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router, drawerItems } from '../hooks/commons/router';
import { Loader } from './app/components/Loader';
import AppBar from './app/components/TopBar';
// import { withHOC } from './Root';
import SearchDashboard from './search/SearchDashboard';
// const withHOC = (WrappedComponent: any) => {
//   return (props: any) => {
//       const [loading, setAppLoading] = useState(false);

//       if (loading) {
//           return <Loader />;
//       }

//       return <WrappedComponent {...props} setAppLoading={setAppLoading} />;
//   };
// };

// const App = withHOC(_App); 

// function _App() {
//   return (
//     <RouterProvider router={router} />
//   );
// }

export const App = () => {
  return (
    <>
      <AppBar drawerItems={drawerItems} />
      // Todo here render current route element
      <div style={{'margin': '8px'}}>
        {/* <RouterProvider router={router} /> */}
      </div>
    </>
  );
}

export default App;
