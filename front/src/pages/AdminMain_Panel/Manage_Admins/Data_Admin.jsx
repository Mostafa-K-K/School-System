import { Component } from 'react'
import BT from '../../../components/Button'
import { Link } from 'react-router-dom'

export default class Data_Admin extends Component {

  state = {
    admins: []
  }

  async componentDidMount() {
    await this.getAdmins();
  }

  getAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin');
      const result = await response.json();
      if (result.success) {
        const admins = result.result;
        this.setState({ admins });
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
    let { admins, error } = this.state;
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
              onClick={() => this.nextPath(`/admin/manage`)}
            />
            <BT
              type="button"
              description="Panel"
              onClick={() => this.nextPath(`/panel`)}
              className="logout-button RRRR-Button"
            />
          </div>
          <div className="adminspantitle"></div>
          <span className="title-page">ADMINS DATABASE</span>
          <table className="tableAdmindata">

            <tr className="hader-table-student-data">
              <td>ID</td>
              <td>Username</td>
              <td>Email</td>
              <td>Password</td>
              <td>Update</td>
            </tr>

            {admins.map(admin => (
              <tr key={admin.AdminID}>
                <td>{admin.AdminID}</td>
                <td>{admin.Username}</td>
                <td>{admin.A_Email}</td>
                <td>{admin.Password}</td>
                <td><Link class="fa fa-pencil colortdlink" onClick={() => this.nextPath(`/admin/update-delete/${admin.AdminID}`)} ><span className="editcolor"> Edit</span> </Link></td>

              </tr>
            ))}

          </table>
        </div>
      </div >
    )
  }
}