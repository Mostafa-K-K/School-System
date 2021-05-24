import { Component } from "react"
import YouTubeIcon from '@material-ui/icons/YouTube'
import FacebookIcon from '@material-ui/icons/Facebook'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import InstagramIcon from '@material-ui/icons/Instagram'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmailIcon from '@material-ui/icons/Email';
import PhoneNbIcon from '@material-ui/icons/Phone';

export default class Contact extends Component {
    state = {
        contacts: [],
        socialmedia: {},
        showFacebook: "",
        showInstagram: "",
        showWhatsApp: "",
        showYouTube: "",
        showEmailAddress: "",
        showLocation: "",
        showPhoneNB: ""
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
        await this.getlink()
    }

    getlink = () => {
        let { socialmedia, showFacebook, showInstagram, showWhatsApp, showYouTube, showEmailAddress, showLocation, showPhoneNB } = this.state;
        showFacebook = socialmedia.Facebook;
        showInstagram = socialmedia.Instagram;
        showWhatsApp = socialmedia.WhatsApp;
        showYouTube = socialmedia.YouTube;
        showLocation = socialmedia.Location;
        showEmailAddress = socialmedia.Email;
        showPhoneNB = socialmedia.Phone;

        this.setState({ showFacebook, showInstagram, showWhatsApp, showYouTube, showLocation, showEmailAddress, showPhoneNB })
    }

    render() {
        let { showFacebook, showInstagram, showWhatsApp, showYouTube, showLocation, showEmailAddress, showPhoneNB } = this.state;

        return (
            <>
                {/* <div className="rightIconContact">
                    <div className="locationMap">
                        {showLocation && <a href={showLocation} target="blank"><LocationOnIcon className="contactDesign" /></a>}
                    </div>
                    <div className="emailMap">
                        {showEmailAddress && <a hre={showEmailAddress} target="blank"><EmailIcon className="contactDesign" /></a>}
                    </div>
                    <div className="phoneMap">
                        {showPhoneNB && <a hre={showPhoneNB} target="blank"><PhoneNbIcon className="contactDesign" /></a>}
                    </div>
                </div> */}
                <div>
                    {showFacebook && <a href={showFacebook} target="blank"><FacebookIcon className="contactDesign" /></a>}
                    {showInstagram && <a href={showInstagram} target="blank"><InstagramIcon className="contactDesign" /></a>}
                    {showWhatsApp && <a href={showWhatsApp} target="blank"><WhatsAppIcon className="contactDesign" /></a>}
                    {showYouTube && <a href={showYouTube} target="blank"><YouTubeIcon className="contactDesign" /></a>}
                    {showLocation && <a href={showLocation} target="blank"><LocationOnIcon className="contactDesign" /></a>}
                </div>
            </>
        );
    }
}