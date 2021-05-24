import { Component } from 'react'
import IN from '../../../components/Input'
import BT from '../../../components/Button'

export default class Edit_Contact extends Component {

    state = {
        contact: []
    }

    async componentDidMount() {
        await this.getContact(this.props.match.params.name);
    }

    getContact = async name => {
        try {
            const response = await fetch(`http://localhost:8000/contact/${name}`);
            const result = await response.json();
            if (result.success) {
                const contact = result.result;
                this.setState({ name, ...contact });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err });
        }
    }

    updateContact = async (name, params) => {
        let { ContactLink } = params;
        let paramserr = `ERROR NOTHING TO UPDATE`;
        if (!params) throw new Error(paramserr);
        let url = `//localhost:8000/contact/update/${name}?link=${ContactLink}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.success) {
                const contact = result.result;
                this.setState({ contact });
            }
            else this.setState({ error: result.message });

        } catch (err) {
            this.setState({ error_message: err });
        }
        this.nextPath(`/profile/Social Media`);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { name, ContactLink } = this.state;
        this.updateContact(name, { ContactLink });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { ContactLink } = this.state;
        return (
            <div className="container">
                <div className="headerPanel">
                    <BT
                        type="button"
                        description="Back"
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/profile/Social Media`)}
                    />
                </div>
                <div className="spanPanel">
                    <span>edit contact url</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanelinsmall">
                        <div className="footerpaneldivmanage">
                            <form onSubmit={this.handleSubmit}>
                                <div className="footerpaneldivmanage">
                                    <IN
                                        required
                                        type="text"
                                        name="ContactLink"
                                        value={ContactLink}
                                        placeholder="New Link"
                                        onChange={this.handleChange}
                                    />
                                    <div className="enterPanel">
                                        <div className="saveCancelDiv">
                                            <BT
                                                type="button"
                                                description="Cancel"
                                                onClick={() => this.nextPath(`/profile/Social Media`)}
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