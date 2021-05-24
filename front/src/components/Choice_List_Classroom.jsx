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
                <div id={this.props.id} >
                    <select id={this.props.id} onChange={this.props.onChange} className={this.props.className}>
                        <option value={null}>Classroom</option>
                        {classrooms.map(classroom => (
                            <option selected={this.props.classroomID == classroom.ClassroomID} name={classroom.ClassroomID} value={classroom.ClassroomID}>{classroom.ClassroomName}</option>
                        ))}
                    </select >
                </div>
            )
    }
}