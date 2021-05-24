import { Component } from 'react'
import IN from '../../../components/Input'
import BT from '../../../components/Button'

export default class Edit_Classroom extends Component {

    state = {
        classroom: []
    }

    async componentDidMount() {
        await this.getClassroom(this.props.match.params.id);
    }

    getClassroom = async id => {
        try {
            const response = await fetch(`http://localhost:8000/classroom/${id}`);
            const result = await response.json();
            if (result.success) {
                const classroom = result.result;
                this.setState({ id, ...classroom });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err })
        }
    }

    updateClassroom = async (id, params) => {
        let { ClassroomName } = params;
        let paramserr = `ERROR NOTHING TO UPDATE`
        if (!params) throw new Error(paramserr);
        let url = `//localhost:8000/classroom/update/${id}?&name=${ClassroomName}`;
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

    deleteClassroom = async id => {
        if (window.confirm("Are you sure to delete this classroom")) {
            try {
                const response = await fetch(`http://localhost:8000/classroom/delete/${id}`);
                const result = await response.json();
                if (result.success) {
                    const classroom = result.result;
                    this.setState({ classroom })
                }
                else this.setState({ error: result.message });

            } catch (err) {
                this.setState({ error_message: err });
            }
            this.nextPath(`/classroom/data`);
        }
        else return;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { id, ClassroomName } = this.state;
        this.updateClassroom(id, { ClassroomName });
    }

    handleDelete = () => {
        let { id } = this.state;
        this.deleteClassroom(id);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        let { error, ClassroomName } = this.state;
        return error ? (<p>{error}</p>)
            : (
                <div className="container">
                    <div className="headerPanel">
                        <BT
                            type="button"
                            description="Back"
                            className="home-button L-Button"
                            onClick={() => this.nextPath(`/classroom/manage`)}
                        />
                        <button
                            type="button"
                            onClick={this.handleDelete}
                            className="logout-button RRR-Button"
                        ><i class="fa fa-trash colordelete"></i> Delete
                            </button>
                    </div>
                    <div className="spanPanel">
                        <span>edit existing classroom</span>
                    </div>
                    <div className="loginRect">
                        <div className="footerPanelinsmall">
                            <div className="footerpaneldivmanage">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="footerpaneldivmanage">
                                        <IN
                                            required
                                            type="text"
                                            placeholder="New Classroom Name"
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
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}