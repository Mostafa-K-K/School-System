import { Component } from 'react'
import BT from '../../../components/Button'
import Panel from '../../../images/panel.svg'

export default class Manage_Classroom extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="spanManage">
                        <span>manage classrooms</span>
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
                                description="Add New Classroom"
                                onClick={() => this.nextPath(`/classroom/create`)}
                            />
                            <BT
                                description="Edit Classrooms"
                                onClick={() => this.nextPath(`/classroom/data`)}
                            />
                        </div>
                    </div>
                </div>
                <img src={Panel} className="PanelImg4" alt=""/>
            </div>
        )
    }
}