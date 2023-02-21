import Search from '@material-ui/icons/Search';
import Translate from '@material-ui/icons/Translate';
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Dashboard from "../view/app/Dashboard";
import DictionaryDashboard from '../view/dictionary/DictionaryDashboard';
import ErrorDashboard  from '../view/errors/ErrorDashboard';
import SearchDashboard from "../view/search/SearchDashboard";


export type DrawerItem = {
    // key: string,
    label: string,
    icon: any,
    path: string
}

export const drawerConfig: DrawerItem[] = [
    {
        // key: 'search',
        label: 'Search',
        icon: <Search />,
        path: '/',
    },
    {
        // key: 'dictionary',
        label: 'Dictionary',
        icon: <Translate />,
        path: "/dictionary"
    }
]

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <SearchDashboard />,
            },
            {
                path: "/dictionary",
                element: <DictionaryDashboard />,
                children: [
                    {
                        index: true,
                        element: <p>Hello world</p>,
                    },
                    {
                        path: '/dictionary/abcd',
                        element: <p>Hello world nested</p>,
                    },
                ],
            }
        ],
        errorElement: <ErrorDashboard />
    }
]

export const browserRouter = createBrowserRouter(routesConfig)