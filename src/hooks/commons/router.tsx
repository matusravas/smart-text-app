import {
    createBrowserRouter,
    RouteObject
} from "react-router-dom";
import { Error } from "../../view/app/components/Error";
import Translate from '@material-ui/icons/Translate'
import Search from '@material-ui/icons/Search'
import App from "../../view/App";
import SearchDashboard from "../../view/search/SearchDashboard";

export type DrawerItem = {
    label: string,
    icon: any,
    route: RouteObject
}

export const drawerItems: DrawerItem[] = [
    {
        label: 'Search',
        icon: <Search />,
        route: {
            path: "/",
            element: <SearchDashboard />,
            errorElement: Error
        }
    },
    {
        label: 'Dictionary',
        icon: <Translate />,
        route: {
            path: "/dictionary",
            element: <p>dictionary</p>,
            errorElement: Error
        }
    }
]


const routes: RouteObject[] = [
    {
        path: "*",
        element: <App />,
        errorElement: Error,
        children: [

        ]
    },
    {
        path: "/search",
        element: <SearchDashboard />,
        errorElement: Error,
        children: [

        ]
    },
    {
        path: "/dictionary",
        element: <p>dictionary</p>,
        errorElement: Error
    },
]

export const router = createBrowserRouter(routes);