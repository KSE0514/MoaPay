import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute({children,}:{children:React.ReactNode}){
    const navigate = useNavigate();

    useEffect(() => {
        }, [navigate]);

    return children;
}