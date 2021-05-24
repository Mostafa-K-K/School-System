import { Component } from 'react'
import BT from '../../../components/Button'
import Panel from '../../../images/panel.svg'

export default class Manage_Admin extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="spanManage">
                        <span>manage admins</span>
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
                                description="Add New Admin"
                                onClick={() => this.nextPath(`/admin/create`)}
                            />
                            <BT
                                type="button"
                                description="Edit Admins"
                                onClick={() => this.nextPath(`/admin/data`)}
                            />
                        </div>
                    </div>
                </div>
                <img src={Panel} className="PanelImg3" alt="" />
            </div>
        )
    }
}