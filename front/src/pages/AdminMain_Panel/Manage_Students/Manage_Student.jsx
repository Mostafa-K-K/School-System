import { Component } from 'react'
import BT from '../../../components/Button'
import Panel from '../../../images/panel.svg'

export default class Manage_Student extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="spanManage">
                        <span>manage students</span>
                    </div>
                    <div className="headerPanel">
                        <BT
                            type="button"
                            description="Back"
                            className="home-button L-Button"
                            onClick={() => this.nextPath(`/panel`)}
                        />
                    </div>
                    <div className="loginRect">
                        <div className="manage">
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
                        </div>
                    </div>
                </div>
                <img src={Panel} className="PanelImg2" alt=""/>
            </div>
        )
    }
}