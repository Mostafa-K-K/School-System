import { Component } from 'react'
import { removeCookie } from '../../cookie'
import SessionContext from '../../components/session/SessionContext';

export default class Logout extends Component {

    handleLogout = async () => {
        const {
            state: { user: { id, token } },
            actions: { updateSession }
        } = this.context;

        const url = "http://localhost:8000/logout";
        const headers = { 'Content-Type': 'application/json', id, token }

        try {
            const response = await fetch(url, { method: "POST", headers });
            await response.json();
        } catch (e) { }

        updateSession({ user: { id: null, token: null, RoleID: -1 } })
        removeCookie('id');
        removeCookie('token');
        removeCookie('RoleID');
    }

    render() {
        return (
            <button onClick={this.handleLogout} className="R-Button home-button">
                Logout
            </button>
        )
    }
}

Logout.contextType = SessionContext;