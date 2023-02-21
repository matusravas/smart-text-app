import { RouterProvider, useRoutes } from 'react-router-dom';
import { browserRouter, routesConfig } from '../../router/router';

export const CustomRouter = () => {
  const routes = useRoutes(routesConfig)
  return routes
}

export const App = () => {
  return (
    <RouterProvider router={browserRouter}/>
  );
}

export default App;
