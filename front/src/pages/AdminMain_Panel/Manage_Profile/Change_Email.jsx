import { Component } from "react"
import LB from '../../../components/Label'
import BT from '../../../components/Button'
import SessionContext from '../../../components/session/SessionContext'

export default class Change_Email extends Component {

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
                var email = admin.A_Email;
                this.setState({ value: email });
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
        let { A_Email } = params;
        let url = `//localhost:8000/admin/main/update/${id}?A_Email=${A_Email}`;
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
        let { id, A_Email } = this.state;
        this.updateAdmin(id, { A_Email });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { A_Email, value } = this.state;
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
                        <span>Change Your Email</span>
                    </div>
                    <div className="loginRect">
                        <div className="footerPanelSubmit">
                            <div className="enterPanel">
                                <table className="tabChange">
                                    <tr>
                                        <td className="tabChange">
                                            <LB
                                                description="Your Email :"
                                                className="pastEmail"
                                            />
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                readOnly
                                                className="inputchange"
                                                type="email"
                                                placeholder="New Email"
                                                name="value"
                                                value={value}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tabChange">
                                            <label className="newEmail">New Email :</label>
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                required
                                                className="inputchange"
                                                type="email"
                                                placeholder="New Email"
                                                name="A_Email"
                                                value={A_Email}
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

Change_Email.contextType = SessionContext;