import { RouterProvider } from "react-router-dom"
import { router } from "../hooks/commons/router"

export const Root = () => {
    return <RouterProvider router={router} />
}