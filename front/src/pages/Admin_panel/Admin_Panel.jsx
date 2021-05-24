import { Component } from 'react';
import Logout from '../Login/Logout';
import BT from '../../components/Button'
import Admin_Panel_Graphic from '../../images/Admin_Panel_Graphic.svg'

export default class Admin_Panel extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container">
                <div className="headerPanel">
                    <button
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/`)}
                    >
                        <i class="fa fa-home colordelete"></i> Home
                    </button>
                    <Logout />
                </div>
                <div className="spanPanel">
                    <span>Welcome to the admin panel!</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanel">
                        <div className="footerpaneldivmanage">
                            <BT
                                type="button"
                                description="Add New Student"
                                onClick={() => this.nextPath(`/student/create`)}
                            />
                            <BT
                                type="button"
                                description="Edit Students"
                                onClick={() => this.nextPath(`/student/data`)}
                            />
                            <BT
                                type="button"
                                description="Manage Profile"
                                onClick={() => this.nextPath(`/adminprofile/manage`)}
                            />
                        </div>
                    </div>
                </div>
                <img src={Admin_Panel_Graphic} className="Admin_Panel_Graphic" alt="" />
            </div>
        )
    }
}