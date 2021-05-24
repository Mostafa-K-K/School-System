import { Component } from 'react'
import { Link } from 'react-router-dom'
import BT from '../../../components/Button'
import RGA from '../../../components/Range_Age'
import Gender_Radio from '../../../components/Gender_Radio'
import SessionContext from '../../../components/session/SessionContext'
import Choice_List_Classroom from '../../../components/Choice_List_Classroom'

export default class Data_Student extends Component {

  state = {
    students: [],
    classrooms: [],
    newText: "",
    gender: "",
    grade: "",
    maxage: 0,
    minage: 0,
    Classroom: "",
    obj: {},
    idclasss: [],
    teachersIDs: [],
    teachersNames: []
  }

  async componentDidMount() {
    await this.getStudents();
    await this.ageMinStudent();
    await this.ageMaxStudent();
    await this.getClassrooms();
  }

  getClassrooms = async () => {
    try {
      const response = await fetch('http://localhost:8000/classroom');
      const result = await response.json();
      if (result.success) {
        const classrooms = result.result;
        this.setState({ classrooms })
        let { idclasss } = this.state;
        var length = classrooms.length;
        var i = 0;
        while (i < length) {
          let b = (Object.values(classrooms[i]));
          idclasss.push(b[0]);
          i++;
        }
        this.setState({ idclasss });
      }
      else {
        const error = result.message;
        this.setState({ error });
      }
    } catch (err) {
      this.setState({ error_message: err });
    }
    this.getIDTeach();
  }

  getIDTeach = async () => {
    let { idclasss, teachersIDs } = this.state;
    var length = idclasss.length;
    var i = 0;
    while (i < length) {
      let teachids = [];
      const response = await fetch(`http://localhost:8000/teachclass/class/single/${idclasss[i]}`);
      const result = await response.json();
      const teachclass = result.result;
      this.setState(teachclass);
      var length1 = teachclass.length;
      var y = 0;
      while (y < length1) {
        let b = (Object.values(teachclass[y]));
        teachids.push(b[0]);
        y++;
      }
      i++;
      teachersIDs.push(teachids);
      this.setState({ teachersIDs });
    }
    this.getNameTeach();
  }

  getNameTeach = async () => {
    let { teachersIDs, teachersNames } = this.state;
    let i = 0;
    const length = teachersIDs.length;
    while (i < length) {
      let arr = [];
      let y = 0;
      const length1 = teachersIDs[i].length;
      while (y < length1) {
        const response = await fetch(`http://localhost:8000/teacher/${teachersIDs[i][y]}`);
        const result = await response.json();
        const Fteach = result.result.T_FN;
        const Lteach = result.result.T_LN;
        var teachn = Fteach + " " + Lteach + " ";
        arr.push(teachn);
        y++;
      }
      arr = arr.join();
      teachersNames.push(arr);
      i++;
      this.setState({ teachersNames });
    }
    this.updateClassroom();
  }

  updateClassroom = async () => {
    let { teachersNames, idclasss } = this.state;
    let i = 0;
    const length = idclasss.length;
    while (i < length) {
      let url = `//localhost:8000/classroom/update/${idclasss[i]}?&TeacherNames=${teachersNames[i]}`;
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
      i++;
    }
  }

  getStudents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/classroom/student/join`);
      const result = await response.json();
      if (result.success) {
        const students = result.result;
        this.setState({ students });
      }
      else {
        const error = result.message;
        this.setState({ error });
      }
    } catch (err) {
      this.setState({ error_message: err });
    }
  }

  ageMinStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8000/student/min`);
      const result = await response.json();
      if (result.success) {
        const minage = result.result;
        this.setState({ value1: minage, minage });
      }
      else {
        const error = result.message;
        this.setState({ error });
      }
    } catch (err) {
      this.setState({ error_message: err });
    }
  }

  ageMaxStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8000/student/max`);
      const result = await response.json();
      if (result.success) {
        const maxage = result.result;
        this.setState({ value2: maxage, maxage });
      }
      else {
        const error = result.message;
        this.setState({ error });
      }
    } catch (err) {
      this.setState({ error_message: err });
    }
  }

  getStudentsFiltred = async ({ newText, agemin, agemax, gender, grade }) => {
    let url = `http://localhost:8000/classroom/student/join?`;
    if (newText) url += `&name=${newText}`;
    if (gender) url += `&gender=${gender}`;
    if (grade) url += `&grade=${grade}`;
    if (agemin && agemax) url += `&agemin=${agemin}&agemax=${agemax}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        const students = result.result;
        this.setState({ students });
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

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  getMinMaxAge = (e) => {
    let { obj } = this.state;
    let { name, value } = e.target;
    let { value1, value2 } = this.state;
    var min = value1;
    var max = value2;
    if (min > max) {
      value2 = min;
      value1 = max;
      obj["agemin"] = value2;
      obj["agemax"] = value1;
    } else if (value1 < value2) {
      value1 = min;
      value2 = max;
      obj["agemin"] = value1;
      obj["agemax"] = value2;
    }
    this.setState({ value1, value2 });
    this.setState({ [name]: value });
    this.setState({ obj });
    this.onFiltred();
  }

  handleArabic = (e) => {
    let { obj } = this.state;
    let { name, value: oldText } = e.target;
    let newText = "";
    for (var i = 0; i < oldText.length; i++) {
      var char = oldText.charAt(i);
      var c = char.charCodeAt(0);
      if ((c > 1536 && c < 1791) || c === 32) newText += char;
    }
    this.setState({ [name]: newText });
    obj["newText"] = newText;
    this.setState({ obj });
    this.onFiltred();
  }

  onChangeValueGender = (e) => {
    let { obj } = this.state;
    let { value } = e.target;
    this.setState({ gender: value });
    obj["gender"] = value;
    this.setState({ obj });
    this.onFiltred();
  }

  onChangeValueGrade = (e) => {
    let { obj } = this.state;
    let { value } = e.target;
    this.setState({ grade: value });
    obj["grade"] = value;
    this.setState({ obj });
    this.onFiltred();
  }

  onFiltred = () => {
    let { obj } = this.state;
    this.getStudentsFiltred(obj);
  }

  searchAgain = () => {
    this.setState({ obj: {} });
    this.onFiltred();
  }

  render() {
    let { minage, maxage, value1, value2, newText, students, error } = this.state;
    let { state: { user } } = this.context;
    return error ? (
      <p>{error}</p>
    ) : (
      <div className="container">
        <div className="all-data-student">
          <div className="filter-student spacediv">
            <div className="headerPanel">
              {user.RoleID === 0 ? (
                <BT
                  type="button"
                  description="Back"
                  className="home-button L-Button"
                  onClick={() => this.nextPath(`/student/manage`)}
                />
              ) : (
                <BT
                  type="button"
                  description="Back"
                  className="home-button L-Button"
                  onClick={() => this.nextPath(`/subpanel`)}
                />
              )}
              <BT
                type="button"
                description="+ Student"
                onClick={() => this.nextPath(`/student/create`)}
                className="submit-button addStudent-Button"
              />
            </div>
          </div>
          <div className="filter-student spacediv firstMarginTop">
            <input
              type="text"
              placeholder="بحث"
              name="newText"
              value={newText}
              onChange={this.handleArabic}
              className="inputSearch"
            />
            <span id="filtersubmit" class="fa fa-search" />
            <span className="title-page">STUDENTS DATABASE</span>
            <BT
              type="button"
              description="Panel"
              onClick={() => this.nextPath(`/panel`)}
              className="logout-button"
            />
          </div>
          <div className="filter-student spacediv color-div-filter">
            <div className="mini-filter">
              <span className="name-filter">Grade</span>
              <div className="divSelect">
                <div>
                  <Choice_List_Classroom
                    onChange={this.onChangeValueGrade}
                    className="inputGrade"
                  />
                  <i class="fa fa-angle-down inputgragecolor" />
                </div>
              </div>
            </div>
            <div className="mini-filter inputRange" >
              <span className="name-filter">Age</span>
              <div className="divRangeAge">
                <RGA
                  classNameSmallSpaceRange="smallSpaceRange"
                  classNameColorFontAge="colorFontAge"
                  description={value1 + " - " + value2}
                  type="range"
                  step="1"
                  min={minage - 2}
                  max={maxage + 2}
                  name1="value1"
                  value1={value1}
                  name2="value2"
                  value2={value2}
                  onChange={this.getMinMaxAge}
                />
              </div>
            </div>
            <div className="mini-filter">
              <span className="name-filter">Gender</span>
              <div className="divSelect">
                <div>
                  <Gender_Radio
                    onChange={this.onChangeValueGender}
                    check={this.state.gender}
                    className="malefemalename"
                    classFlexRadio="classFlexRadio"
                  />
                </div>
              </div>
            </div>
          </div>
          <table className="tableStudentdata ">

            <tr className="hader-table-student-data">
              <td>ID</td>
              <td>First Name</td>
              <td>Father's Name</td>
              <td>Last Name</td>
              <td>Mother's Name</td>
              <td>Teachers Name</td>
              <td>Grade Level</td>
              <td>Gender</td>
              <td>Address</td>
              <td>Age</td>
              <td>Phone Number</td>
              <td>Email</td>
              <td>Date of Birth</td>
              <td>First Time Registered</td>
              <td>Health Problems</td>
              <td>Update</td>
            </tr>

            {students.map(student => (
              <tr key={student.StudentID}>
                <td>{student.StudentID}</td>
                <td>{student.FirstName}</td>
                <td>{student.FatherName}</td>
                <td>{student.LastName}</td>
                <td>{student.MotherFullName}</td>
                <td>{student.TeacherNames}</td>
                <td>{student.ClassroomName}</td>
                <td>{student.Gender}</td>
                <td>{student.Address}</td>
                <td>{student.AgeS}</td>
                <td>{student.ECNumber}</td>
                <td>{student.Email}</td>
                <td>{student.BirthDate}</td>
                <td>{student.RegiDate}</td>
                <td>{student.HealthProblems}</td>
                <td><Link class="fa fa-pencil colortdlink" onClick={() => this.nextPath(`/student/update-delete/${student.StudentID}`)}><span className="editcolor"> Edit</span> </Link></td>
              </tr>
            ))}

          </table>
        </div>
      </div>
    )
  }
}

Data_Student.contextType = SessionContext;