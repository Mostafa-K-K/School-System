import { Component } from 'react'
import { Link } from 'react-router-dom'
import BT from '../../../components/Button'

export default class Data_Classroom extends Component {

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

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    let { classrooms, error } = this.state;
    return error ? (
      <p>{error}</p>
    ) : (
      <div className="container">
        <div className="all-data-student">
          <div className="headerPanel">
            <BT
              type="button"
              description="Back"
              className="home-button L-Button"
              onClick={() => this.nextPath(`/classroom/manage`)}
            />
            <BT
              type="button"
              description="Panel"
              onClick={() => this.nextPath(`/panel`)}
              className="logout-button RRRR-Button"
            />
          </div>
          <div className="adminspantitle"></div>
          <span className="title-page">CLASSROOMS DATABASE</span>
          <table className="tableAdmindata">
            <tr className="hader-table-student-data">
              <td>ID</td>
              <td>Classroom Name</td>
              <td>Update</td>
            </tr>
            {classrooms.map(classroom => (
              <tr key={classroom.ClassroomID}>
                <td>{classroom.ClassroomID}</td>
                <td>{classroom.ClassroomName}</td>
                <td><Link class="fa fa-pencil colortdlink" onClick={() => this.nextPath(`/classroom/update-delete/${classroom.ClassroomID}`)}><span className="editcolor"> Edit</span> </Link></td>
              </tr>
            ))}
          </table>
        </div>
      </div >
    )
  }
}