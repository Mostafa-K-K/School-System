import { Component } from 'react'
import { Link } from 'react-router-dom'
import BT from '../../../components/Button'

export default class Data_Teacher extends Component {

  state = {
    teachers: []
  }

  async componentDidMount() {
    await this.getTeachers();
  }

  getTeachers = async () => {
    try {
      const response = await fetch('http://localhost:8000/teacher');
      const result = await response.json();
      if (result.success) {
        const teachers = result.result;
        this.setState({ teachers });
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
    let { teachers, error } = this.state;
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
              onClick={() => this.nextPath(`/teacher/manage`)}
            />
            <BT
              type="button"
              description="Panel"
              onClick={() => this.nextPath(`/panel`)}
              className="logout-button RRRR-Button"
            />
          </div>
          <div className="adminspantitle"></div>
          <span className="title-page">TEACHERS DATABASE</span>
          <table className="tableAdmindata">

            <tr className="hader-table-student-data">
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Major</td>
              <td>Email</td>
              <td>Phone Number</td>
              <td>Address</td>
              <td>Classroom</td>
              <td>Update</td>
            </tr>

            {teachers.map(teacher => (
              <tr key={teacher.TeacherID}>
                <td>{teacher.TeacherID}</td>
                <td>{teacher.T_FN}</td>
                <td>{teacher.T_LN}</td>
                <td>{teacher.Major}</td>
                <td>{teacher.T_Email}</td>
                <td>{teacher.PhoneNB}</td>
                <td>{teacher.T_Address}</td>
                <td>{teacher.ClassroomID}</td>
                <td><Link class="fa fa-pencil colortdlink" onClick={() => this.nextPath(`/teacher/update-delete/${teacher.TeacherID}`)} ><span className="editcolor"> Edit</span> </Link></td>

              </tr>
            ))}

          </table>
        </div>
      </div >
    )
  }
}