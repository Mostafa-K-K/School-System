import { Component } from 'react'
import SessionContext from '../../components/session/SessionContext'
import LoginComponent from '../../components/LoginComponent'
import Login_Graphic from '../../images/Login_Graphic.svg'
import { setCookie } from '../../cookie'

export default class Login extends Component {

    state = {
        name: "",
        password: ""
    }

    handleLogin = async (event) => {
        event.preventDefault();

        const { name, password } = this.state;
        const { actions: { updateSession } } = this.context;

        try {
            const url = 'http://localhost:8000/login';
            const body = JSON.stringify({ name, password });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(url, { method: "POST", headers, body });
            const answer = await response.json();

            if (answer.success) {
                setCookie('id', answer.result.id, 30);
                setCookie('token', answer.result.token, 30);
                if (answer.result.RoleID === 0) {
                    setCookie('RoleID', answer.result.RoleID.toString(), 30)
                } else if (answer.result.RoleID === 1) {
                    setCookie('RoleID', answer.result.RoleID.toString(), 30)
                }
                updateSession({ user: answer.result })
            } else {
                this.setState({ error_message: answer.message });
            }
        } catch (err) {
            this.setState({ error_message: err.message });
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { name, password } = this.state;
        return (
            <div className="container">
                <div className="loginHeader">
                    <button
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/`)}
                    >
                        <i class="fa fa-home colordelete"></i> Home
                    </button>
                </div>
                <div className="diccs">
                    <span>Welcome to Al Manara School Registration System</span>
                    <br /><br /><br />
                    <span>LOGIN</span>
                </div>
                <div className="loginRect">
                    <LoginComponent
                        typeButton="submit"
                        onSubmit={this.handleLogin}

                        placeholderUser="Username"
                        typeUser="text"
                        nameUser="name"
                        valueUser={name}
                        placeholderPass="Password"
                        typePass="password"
                        namePass="password"
                        valuePass={password}
                        onChange={this.handleChange}

                        className="input-login"
                        classNameLink="colorLinkForgot"
                        classNameButton="login1-button"
                    />
                </div>
                <img src={Login_Graphic} className="Login_Graphic" alt="" />
            </div>
        )
    }
}

Login.contextType = SessionContext;