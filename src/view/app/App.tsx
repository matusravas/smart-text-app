import { BrowserRouter, RouterProvider, useRoutes } from 'react-router-dom';
import { routesConfig, browserRouter } from '../../hooks/commons/router';

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
