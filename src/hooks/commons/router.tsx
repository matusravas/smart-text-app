import {
    createBrowserRouter,
    RouteObject
  } from "react-router-dom";
import { Error } from "../../view/app/components/Error";
import { Root } from "../../view/Root";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Root />,
        errorElement: Error,
        children: [
            
        ]
    },
    {
        path: "/search",
        element: <Root />,
        errorElement: Error
    },
]

export const router = createBrowserRouter(routes);