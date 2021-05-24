import { Component } from 'react'
import Button from '../../components/Button'
import Contact from '../../components/Contact'
import logo from '../../images/manara_logo.png'
import ImageSlider from '../../components/ImageSlider'
import SessionContext from '../../components/session/SessionContext'

class Home extends Component {
    state = {
        contacts: [],
        socialmedia: {}
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    componentDidMount() { this.getContacts() }

    getContacts = async () => {
        let { socialmedia } = this.state
        try {
            const response = await fetch('http://localhost:8000/contact');
            const result = await response.json();
            if (result.success) {
                const contacts = result.result;
                this.setState({ contacts })
                let length = contacts.length;
                console.log(length);
                let i = 0;
                while (i < length) {
                    socialmedia[contacts[i].ContactName] = contacts[i].ContactLink;
                    i++;
                }
                console.log(socialmedia)

                this.setState({ socialmedia })
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err })
        }
    }

    render() {
        let { state: { user } } = this.context;
        let { socialmedia } = this.state;
        const hrefMail = `mailto:${socialmedia.Email}`
        return (
            <div className="container">
                <div className="header">
                    <img src={logo} className="logo" alt="Al-Manara Logo" alt="" />
                    {user.token ? (
                        <Button
                            className="login-button"
                            description="Panel"
                            onClick={() => this.nextPath(`/panel`)}
                        />
                    ) : (
                        <Button
                            className="login-button"
                            description="Login"
                            onClick={() => this.nextPath(`/login`)}
                        />
                    )}
                </div>
                <div className="divider">
                </div>
                <div>
                    <ImageSlider className="mySlides fade" />
                </div>

                <div className="divider_2">
                </div>
                <div className="h1-contact-us">
                    CONTACT US </div>
                <div className="footer">
                    <div className="About-us">
                        <b>ABOUT US</b> <br />
                        <p className="About-us">
                            Al-Manara School is commited to providing a challenging
                            and supportive learning environment where all students
                            can succeed and reach their full potential, and be prepared
                            for university, career, and community success.
                            </p>
                    </div>
                    <div className="contactUsIcon"><b className="location">Bekaa Area, Lebanon</b>
                        <br /> <span className="location">{socialmedia.Location}</span>
                        <br /><br /><b className="location">{socialmedia.Phone}</b><br />
                        <a className="email" href={hrefMail} itemprop="email"> {socialmedia.Email}</a>
                    </div>
                    <div className="h2-connect-us"> Connect with us!
                            <Contact className="socialmedia" />
                    </div>
                </div>

            </div>
        )
    }
};

Home.contextType = SessionContext;

export default Home;