import { Component } from 'react'
import LB from '../../../components/Label'
import BT from '../../../components/Button'
import { Link } from "react-router-dom";

export default class Manage_Contact extends Component {

    state = {
        contacts: []
    }

    async componentDidMount() {
        await this.getContacts();
    }

    getContacts = async () => {
        try {
            const response = await fetch('http://localhost:8000/contact');
            const result = await response.json();
            if (result.success) {
                const contacts = result.result;
                this.setState({ contacts });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err });
        }
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { contacts } = this.state;
        return (
            <div className="containerLongPic">
                <div className="headerPanel">
                    <BT
                        type="button"
                        description="Back"
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/profile/manage`)}
                    />
                </div>
                <div className="spanPanel">
                    <span>Change Your Username</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanelSubmitContact">
                        <div className="enterPanel">
                            <table className="tabChangetable">

                                {contacts.map(contact => (
                                    <tr key={contact.ContactName}>
                                        <td className="tabChange">
                                            <LB
                                                description={contact.ContactName}
                                                className="pastEmail"
                                            />
                                        </td>
                                        <td className="tabChange">
                                            <input
                                                readOnly
                                                className="inputchange"
                                                type="text"
                                                placeholder="url"
                                                value={contact.ContactLink}
                                            />
                                        </td>
                                        <td className="tabChange">
                                            <td><Link class="fa fa-pencil colortdlink" onClick={() => this.nextPath(`/profile/Social/${contact.ContactName}`)}><span className="editcolor"> Edit</span> </Link></td>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}