import { Component } from 'react'
import Logout from '../Login/Logout'
import BT from '../../components/Button'
import Admin_Panel_Graphic from '../../images/Admin_Panel_Graphic.svg'

export default class AdminMain_Panel extends Component {

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
                    <span>Welcome to the main admin panel!</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanel">
                        <div className="footerpaneldivmanage">
                            <BT
                                type="button"
                                description="Manage Students"
                                onClick={() => this.nextPath(`/student/manage`)}
                            />
                            <BT
                                type="button"
                                description="Manage Admins"
                                onClick={() => this.nextPath(`/admin/manage`)}
                            />
                            <BT
                                type="button"
                                description="Manage Teachers"
                                onClick={() => this.nextPath(`/teacher/manage`)}
                            />
                            <BT
                                type="button"
                                description="Manage Classrooms"
                                onClick={() => this.nextPath(`/classroom/manage`)}
                            />
                            <BT
                                type="button"
                                description="Manage Profile"
                                onClick={() => this.nextPath(`/profile/manage`)}
                            />
                        </div>
                    </div>
                </div>
                <img src={Admin_Panel_Graphic} className="Admin_Panel_Graphic" alt="" />
            </div>
        )
    }
}