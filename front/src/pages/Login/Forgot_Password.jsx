import { Component } from "react"
import LB from '../../components/Label'
import IN from '../../components/Input'
import BT from '../../components/Button'
var nodemailer = require('nodemailer');

export default class Forgot_Password extends Component {
    state = {
        admin: [],
        subject: 'Welcome to Al_Manara School',
        email: '',
        msg: ''
    }

    async componentDidMount() {
        await this.getUser(1);
        await this.getPass(1);
    }

    getUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/contact/Email`);
            const result = await response.json();
            if (result.success) {
                const contact = result.result;
                const user = contact.ContactLink;
                this.setState({ user });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err })
        }
    }

    getPass = async name => {
        try {
            const response = await fetch(`http://localhost:8000/contact/Password%20Email`);
            const result = await response.json();
            if (result.success) {
                const contact = result.result;
                const pass = contact.ContactLink;
                this.setState({ pass });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err })
        }
    }

    getAdmin = async ({ A_Email }) => {
        try {
            const response = await fetch(`http://localhost:8000/one/admin?email=${A_Email}`);
            const result = await response.json();
            if (result.success) {
                const admin = result.result;
                this.setState({ admin });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err })
        }
    }

    forgotPassword = (e) => {
        e.nativeEvent.preventDefault();
        let { subject, user, pass, email, admin, msg } = this.state;
        // if (admin) {
        const txt = `Hello ${admin.Username} \n Your Password is : ${admin.Password}`

        let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
        transporter.sendMail({ from: user, to: email, subject, text: txt });

        msg = 'Check Your Email'
        this.setState({ msg });
        // }
        // else {
        //     msg = 'Undefined Email'
        //     this.setState({ msg });
        // }
    }

    // handleEmail = () => {
    //     const to = 'moustafakassem12@gmail.com'
    //     email(to, {
    //         bcc: 'mee@mee.com',
    //         subject: 'Show how to use',
    //         body: 'Some body right here'
    //     }).catch(console.error)
    // }

    nextPath(path) {
        this.props.history.push(path);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        this.getAdmin({ A_Email: value });
    }

    render() {
        let { email, msg } = this.setState;
        return (
            <div className="container">
                <div className="headerPanel">
                <div className="loginHeader">
                <button
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/`)}
                    >
                    <i class="fa fa-home colordelete"></i> Home
                    </button>
                </div>
                </div>
                <div className="spanPanel">
                    <span>forgot your password</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanelinsmall">
                        <div className="footerpaneldivmanage">
                            <form onSubmit={this.forgotPassword}>
                                <div className="footerpaneldivmanage">
                                    <IN
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="Your Email"
                                        onChange={this.handleChange}
                                    />
                                    <LB
                                        description={msg}
                                    />
                                    <div className="enterPanel">
                                        <div className="saveCancelDiv">
                                            <BT
                                                type="button"
                                                description="Cancel"
                                                onClick={() => this.nextPath(`/login`)}
                                                className="cancel-button"
                                            />
                                            <BT
                                                // type="submit"
                                                description="Forgot"
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