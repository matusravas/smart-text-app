import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import {Error, ErrorCode} from "./Error";



export const ErrorDashboard = () => {
    const error: any = useRouteError();
    console.log(error)
    
    if (isRouteErrorResponse(error)) return <Error status={error.status as ErrorCode}/>

    return <div>Something went wrong</div>;
}