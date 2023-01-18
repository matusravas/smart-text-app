import { Outlet } from "react-router-dom"

const Dictionary = () => {
    return (
        <div>
            <p>Dicitonary</p>
            <Outlet />
        </div>
    )
}

export default Dictionary