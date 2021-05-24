import { Component } from 'react'
import IN from '../../../components/Input'
import BT from '../../../components/Button'

export default class Edit_Admin extends Component {

    state = {
        admin: []
    }

    async componentDidMount() {
        await this.getAdmin(this.props.match.params.id);
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
        let { Username, Password, A_Email } = params;
        let url = `//localhost:8000/admin/main/update/${id}?Username=${Username}&Password=${Password}&A_Email=${A_Email}`;
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
        this.nextPath(`/admin/data`);
    }

    deleteAdmin = async id => {
        if (window.confirm("Are you sure to delete this admin")) {
            try {
                const response = await fetch(`http://localhost:8000/admin/delete/${id}`);
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
        else return;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { id, Username, Password, A_Email } = this.state;
        this.updateAdmin(id, { Username, Password, A_Email });
    }

    handleDelete = () => {
        let { id } = this.state;
        this.deleteAdmin(id);
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
                    <button
                        type="button"
                        onClick={this.handleDelete}
                        className="logout-button RRR-Button"
                    ><i class="fa fa-trash colordelete"></i> Delete
                            </button>
                </div>
                <div className="spanPanel">
                    <span>edit existing admin</span>
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
                                        placeholder="New Username"
                                        onChange={this.handleChange}
                                    />
                                    <IN
                                        required
                                        type="password"
                                        name="Password"
                                        value={Password}
                                        placeholder="New Password"
                                        onChange={this.handleChange}
                                    />
                                    <IN
                                        required
                                        type="email"
                                        name="A_Email"
                                        value={A_Email}
                                        placeholder="New Email"
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