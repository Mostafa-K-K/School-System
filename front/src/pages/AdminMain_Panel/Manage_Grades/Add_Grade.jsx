import { Component } from 'react'
import IN from '../../../components/Input'
import BT from '../../../components/Button'

export default class Add_Classroom extends Component {

    state = {
        classroom: [],
        ClassroomName: ""
    }

    createClassroom = async (params = {}) => {
        let { ClassroomName } = params;
        let url = `http://localhost:8000/classroom/create?name=${ClassroomName}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.success) {
                const classroom = result.result;
                this.setState({ classroom });
            }
            else this.setState({ error: result.message });
        } catch (err) {
            this.setState({ error_message: err });
        }
        this.nextPath(`/classroom/data`);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { ClassroomName } = this.state;
        this.createClassroom({ ClassroomName });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { error, ClassroomName } = this.state;
        return error ? (
            <p>{error}</p>
        ) : (
            <div className="container">
                <div className="headerPanel">
                    <BT
                        type="button"
                        description="Back"
                        className="home-button L-Button"
                        onClick={() => this.nextPath(`/classroom/manage`)}
                    />
                </div>
                <div className="spanPanel">
                    <span>Add new classroom</span>
                </div>
                <div className="loginRect">
                    <div className="footerPanelinsmall">
                        <div className="footerpaneldivmanage">
                            <div className="footerpaneldivmanage">
                                <form onSubmit={this.handleSubmit}>

                                    <IN
                                        required
                                        type="text"
                                        placeholder="Classroom Name"
                                        name="ClassroomName"
                                        value={ClassroomName}
                                        onChange={this.handleChange}
                                    />
                                    <div className="enterPanel">
                                        <div className="saveCancelDiv">
                                            <BT
                                                type="button"
                                                description="Cancel"
                                                onClick={() => this.nextPath(`/classroom/manage`)}
                                                className="cancel-button"
                                            />
                                            <BT
                                                type="submit"
                                                description="Save"
                                                className="submit-button"
                                            />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}