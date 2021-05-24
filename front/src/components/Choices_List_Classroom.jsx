import { Component } from 'react'

export default class Choices_List_Classroom extends Component {

    state = {
        classrooms: []
    }

    async componentDidMount() {
        await this.getClassrooms();
    }

    getClassrooms = async () => {
        try {
            const response = await fetch('http://localhost:8000/classroom');
            const result = await response.json();
            if (result.success) {
                const classrooms = result.result;
                this.setState({ classrooms });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err });
        }
    }

    render() {
        let { classrooms, error } = this.state;
        return error ? (<p>{error}</p>)
            : (
                <tr>
                    <td> <label>Classroom</label></td>
                    <td>
                        {classrooms.map(classroom => (
                            <div
                                key={classroom.ClassroomID}
                                className={this.props.classNameDiv}
                            >
                                <input
                                    type="checkbox"
                                    name={classroom.ClassroomID}
                                    value={classroom.ClassroomID}
                                    id={classroom.ClassroomID}
                                    onChange={this.props.onChange}
                                    className={this.props.classNameInput}
                                />
                                <span className={this.props.classNameSpan} />
                                <label
                                    className={this.props.classNameLabel}
                                    htmlFor={classroom.ClassroomID}
                                >
                                    {classroom.ClassroomName}
                                </label>
                            </div>
                        ))}
                    </td>
                </tr>
            )
    }
}