import { Component } from 'react'
import IN from '../../../components/Input'
import BT from '../../../components/Button'

export default class Add_Admin extends Component {

    state = {
        admin: [],
        Username: "",
        Password: "",
        A_Email: ""
    }

    createAdmin = async (params = {}) => {
        let { Username, Password, A_Email } = params;
        let url = `//localhost:8000/admin/create?Username=${Username}&Password=${Password}&A_Email=${A_Email}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.success) {
                const admin = result.result;
                this.setState({ admin });
            }
            else this.setState({ error: result.message });
        } catch (err) {
            this.setState({ error_message: err });
        }
        this.nextPath(`/admin/data`);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { Username, Password, A_Email } = this.state;
        this.createAdmin({ Username, Password, A_Email });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { error, Username, Password, A_Email } = this.state;
        return error ? (
            <p>{error}</p>
        ) : (
            <div className="container">
                <div className="headerPanel">
                    <BT
                        type="button"
                        description="Back"
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/admin/manage`)}
                    />
                </div>
                <div className="spanPanel">
                    <span>Add new admin</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanelin">
                        <div className="footerpaneldivmanage">
                            <form onSubmit={this.handleSubmit}>
                                <div className="footerpaneldivmanage">
                                    <IN
                                        required
                                        type="text"
                                        name="Username"
                                        value={Username}
                                        placeholder="Username"
                                        onChange={this.handleChange}
                                    />
                                    <IN
                                        required
                                        type="password"
                                        name="Password"
                                        value={Password}
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                    <IN
                                        required
                                        type="email"
                                        name="A_Email"
                                        value={A_Email}
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                    />
                                    <div className="enterPanel">
                                        <div className="saveCancelDiv">
                                            <BT
                                                type="button"
                                                description="Cancel"
                                                onClick={() => this.nextPath(`/admin/manage`)}
                                                className="cancel-button"
                                            />
                                            <BT
                                                type="submit"
                                                description="Save"
                                                className="submit-button"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}