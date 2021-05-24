import { Component } from 'react'
import BT from '../../../components/Button'
import Panel from '../../../images/panel.svg'

export default class Manage_Teacher extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="spanManage">
                        <span>manage teachers</span>
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
                                description="Add New Teacher"
                                onClick={() => this.nextPath(`/teacher/create`)}
                            />
                            <BT
                                description="Edit Teachers"
                                onClick={() => this.nextPath(`/teacher/data`)}
                            />
                        </div>
                    </div>
                </div>
                <img src={Panel} className="PanelImg" alt="" />
            </div>
        )
    }
}