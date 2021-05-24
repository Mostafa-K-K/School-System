import { Component } from 'react'
import BT from '../../../components/Button'

export default class Edit_Profile extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container">
                <div className="headerPanel">
                    <BT
                        type="button"
                        description="Back"
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/panel`)}
                    />
                </div>
                <div className="spanPanel">
                    <span>edit your profile</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanel">
                        <div className="footerpaneldivmanage">
                            <BT
                                description="Change Username"
                                onClick={() => this.nextPath(`/profile/username`)}
                            />
                            <BT
                                description="Change Password"
                                onClick={() => this.nextPath(`/profile/password`)}
                            />
                            <BT
                                description="Change Email"
                                onClick={() => this.nextPath(`/profile/email`)}
                            />
                            <BT
                                description="Edit Your Social Media"
                                onClick={() => this.nextPath(`/profile/Social Media`)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}