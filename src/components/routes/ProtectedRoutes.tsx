import { Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { storedTokenRequest } from '../../db_requests/token_requests/storedTokenRequest';

function ProtectedRoutes() {
    const [token, setToken] = useState<boolean | undefined>(); // <-- initially undefined

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const data = await storedTokenRequest()
                setToken(data);
            } catch (error) {
                setToken(false);
            }
        };

        authenticateUser();
    }, []);

    if (token === undefined) {
        return null; // or loading indicator/spinner/etc...
    }

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutes