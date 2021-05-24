import { Component } from "react"
import LB from '../../../components/Label'
import BT from '../../../components/Button'
import SessionContext from '../../../components/session/SessionContext'

export default class Change_Password extends Component {

    state = {
        admin: [],
        oldPass: "",
        newPass: "",
        newPassC: "",
        msg: ""
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
        let { newPass } = params;
        let url = `//localhost:8000/admin/main/update/${id}?Password=${newPass}`;
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
    }


    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { id, Password, oldPass, newPass, newPassC, msg } = this.state;
        if (Password == oldPass && newPass == newPassC) {
            this.updateAdmin(id, { newPass });
            oldPass = "";
            newPass = "";
            newPassC = "";
            msg = "Password changed successfully";
            this.setState({ msg, oldPass, newPass, newPassC });
        }
        else {
            oldPass = "";
            newPass = "";
            newPassC = "";
            msg = "Password in incorrect";
            this.setState({ msg, oldPass, newPass, newPassC });
        }
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { oldPass, newPass, newPassC, msg } = this.state;
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
                        <span>Change Your password</span>
                    </div>
                    <div className="loginRect">
                        <div className="footerPanelSubmit">
                            <div className="enterPanel">
                                <table className="tabChange">
                                    <tr>
                                        <td className="tabChange">
                                            <label className="newEmail">Old Password :</label>
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                required
                                                className="inputchange"
                                                type="password"
                                                placeholder="Old Password"
                                                name="oldPass"
                                                value={oldPass}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tabChange">
                                            <label className="newEmail">New Password :</label>
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                required
                                                className="inputchange"
                                                type="password"
                                                placeholder="New Password"
                                                name="newPass"
                                                value={newPass}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tabChange">
                                            <label className="newEmail">Confirm New Password :</label>
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                required
                                                className="inputchange"
                                                type="password"
                                                placeholder="Confirm New Password"
                                                name="newPassC"
                                                value={newPassC}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <LB
                                description={msg}
                            />
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

Change_Password.contextType = SessionContext;