import { Navigate, Outlet } from 'react-router-dom'
import { storedTokenRequest } from '../../db_requests/token_requests/storedTokenRequest'
import { useAsync } from "react-async"
import React, { useState, useEffect } from 'react';

function Child({ token }: { token: boolean }) {
    // Problem:
    // This will error if `items` is null/undefined
    console.log("Child", token);
    
    return token ? <Outlet /> : <Navigate to="/login" />
}

function ProtectedRoutes() {
    // Uninitialized state will cause Child to error out
    const [token, setToken] = useState<boolean>(false);

    // Data does't start loading
    // until *after* Parent is mounted
    useEffect(() => {
        storedTokenRequest()
            .then(data => {
                console.log("Promise", data);
                setToken(data)
            });
    }, []);

    // Solution:
    // don't render Child until `items` is ready!
    return (
        <Child token={token} />
    );
}

export default ProtectedRoutes