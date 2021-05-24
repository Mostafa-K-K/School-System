import { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { getCookie } from '../../cookie';

export default function SessionProvider({ children }) {

    const [state, setValue] = useState({
        user: {
            id: getCookie('id'),
            token: getCookie('token'),
            RoleID: parseInt(getCookie('RoleID') || -1)
        }
    });

    useEffect(() => {
        initializeUser()
    }, [])

    function updateSession(nextState) {
        setValue(prevState => ({
            ...prevState, ...nextState
        }));
    }

    async function initializeUser() {
        let id = getCookie('id');
        let token = getCookie('token');
        if (id && token) {
            let headers = { 'Content-Type': 'application/json', id, token };
            let response = await fetch('//localhost:8000/getUserData', { headers });
            let data = await response.json();
            if (data.success) {
                updateSession({ user: data.result });
            }
        }
    }

    const context = {
        state,
        actions: {
            updateSession
        }
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}