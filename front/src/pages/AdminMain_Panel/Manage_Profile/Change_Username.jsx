import { Component } from "react"
import LB from '../../../components/Label'
import BT from '../../../components/Button'
import SessionContext from '../../../components/session/SessionContext'

export default class Change_Username extends Component {

    state = {
        admin: [],
        value: ""
    }

    async componentDidMount() {
        let { state: { user } } = this.context;
        await this.getAdmin(user.id);
    }

    getAdmin = async id => {
        try {
            const response = await fetch(`http://localhost:8000/admin/${id}`);
            const result = await response.json();
            if (result.success) {
                const admin = result.result;
                this.setState({ id, ...admin });
                var username = admin.Username;
                this.setState({ value: username });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err });
        }
    }

    updateAdmin = async (id, params) => {
        let { Username } = params;
        let url = `//localhost:8000/admin/main/update/${id}?Username=${Username}`;
        let paramserr = `ERROR NOTHING TO UPDATE`;
        if (!params) throw new Error(paramserr);

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
        this.nextPath(`/profile/manage`);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { id, Username } = this.state;
        this.updateAdmin(id, { Username });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { Username, value } = this.state;
        return (
            <div className="container">
                <div className="headerPanel">
                    <BT
                        type="button"
                        description="Back"
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/profile/manage`)}
                    />
                </div>
                <form onSubmit={this.handleSubmit} className="formSub">
                    <div className="spanPanel">
                        <span>Change Your Username</span>
                    </div>
                    <div className="loginRect">
                        <div className="footerPanelSubmit">
                            <div className="enterPanel">
                                <table className="tabChangetable">
                                    <tr>
                                        <td className="tabChange">
                                            <LB
                                                description="Your Username :"
                                                className="pastEmail"
                                            />
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                readOnly
                                                className="inputchange"
                                                type="text"
                                                placeholder="New Username"
                                                name="value"
                                                value={value}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tabChange">
                                            <label className="newEmail">New Username :</label>
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                required
                                                className="inputchange"
                                                type="text"
                                                placeholder="New Username"
                                                name="Username"
                                                value={Username}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="enterPanel">
                                <div className="saveCancelDiv">
                                    <BT
                                        type="button"
                                        description="Cancel"
                                        onClick={() => this.nextPath(`/profile/manage`)}
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
                    </div>
                </form>
            </div >
        )
    }
}

Change_Username.contextType = SessionContext;