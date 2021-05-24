import { Component } from 'react'
import TR from '../../../components/TR'
import BT from '../../../components/Button'
import Gender_Radio from '../../../components/Gender_Radio'
import edit_student_1 from '../../../images/edit_student_1.jpg'
import SessionContext from '../../../components/session/SessionContext'
import Choice_List_Classroom from '../../../components/Choice_List_Classroom'

export default class Edit_Student extends Component {

    state = {
        student: [],
        selected: false
    }

    async componentDidMount() {
        await this.getStudent(this.props.match.params.id);
    }

    getStudent = async id => {
        try {
            const response = await fetch(`http://localhost:8000/student/single/${id}`);
            const result = await response.json();
            if (result.success) {
                const student = result.result;
                this.setState({ id, ...student });
                this.setState({ ClassroomID: student.ClassroomID });
            }
            else {
                const error = result.message;
                this.setState({ error });
            }
        } catch (err) {
            this.setState({ error_message: err });
        }
    }

    updateStudent = async (id, params) => {
        let { FirstName, LastName, FatherName, MotherFullName, ECNumber, BirthDate, RegiDate, HealthProblems, Email, Gender, Address, ClassroomID } = params;
        let url = `//localhost:8000/student/update/${id}?`;
        if (FirstName) url += `fn=${FirstName}`;
        if (LastName) url += `&ln=${LastName}`;
        if (FatherName) url += `&ffn=${FatherName}`;
        if (MotherFullName) url += `&mfulln=${MotherFullName};`
        if (ECNumber) url += `&ecnum=${ECNumber}`;
        if (BirthDate) url += `&BDate=${BirthDate}`;
        if (RegiDate) url += `&RDate=${RegiDate}`;
        if (HealthProblems) url += `&HPrb=${HealthProblems}`;
        if (Email) url += `&email=${Email}`;
        if (Gender) url += `&gender=${Gender}`;
        if (Address) url += `&adrs=${Address}`;
        if (ClassroomID) url += `&cid=${ClassroomID}`;
        let paramserr = `ERROR NOTHING TO UPDATE`;
        if (!params) throw new Error(paramserr);
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.success) {
                const student = result.result;
                this.setState({ student });
            }
            else this.setState({ error: result.message });
        } catch (err) {
            this.setState({ error_message: err });
        }
        this.nextPath(`/student/data`);
    }

    deleteStudent = async id => {
        if (window.confirm("Are you sure to delete this student")) {
            try {
                const response = await fetch(`http://localhost:8000/student/delete/${id}`);
                const result = await response.json();
                if (result.success) {
                    const student = result.result;
                    this.setState({ student })
                }
                else this.setState({ error: result.message });
            } catch (err) {
                this.setState({ error_message: err });
            }
            this.nextPath(`/student/data`);
        }
        else return;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleArabic = (e) => {
        let { name, value: oldText } = e.target;
        let newText = "";
        for (var i = 0; i < oldText.length; i++) {
            var char = oldText.charAt(i);
            var c = char.charCodeAt(0);
            if ((c > 1536 && c < 1791) || c === 32) newText += char;
        }
        this.setState({ [name]: newText });
    }

    handleNumber = (e) => {
        let { name, value: oldText } = e.target;
        let newText = "";
        for (var i = 0; i < oldText.length; i++) {
            var c = oldText.charAt(i);
            if (c === "+" || c == 0 || c == 1 || c == 2 || c == 3 || c == 4 || c == 5 || c == 6 || c == 7 || c == 8 || c == 9) newText += c;
        }
        this.setState({ [name]: newText });
    }

    handleSubmit = (e) => {
        e.nativeEvent.preventDefault();
        let { id, FirstName, LastName, FatherName, MotherFullName, ECNumber, BirthDate, RegiDate, HealthProblems, Email, Gender, Address, ClassroomID } = this.state;
        this.updateStudent(id, { FirstName, LastName, FatherName, MotherFullName, ECNumber, BirthDate, RegiDate, HealthProblems, Email, Gender, Address, ClassroomID });
    }

    handleDelete = () => {
        let { id } = this.state;
        this.deleteStudent(id);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    onChangeValueGender = (e) => {
        let { value } = e.target;
        this.setState({ Gender: value });
    }

    onChangeValueGrade = (e) => {
        let { value } = e.target;
        this.setState({ ClassroomID: value });
    }

    render() {
        let { state: { user } } = this.context;
        let { error, FirstName, LastName, FatherName, MotherFullName, ECNumber, BirthDate, RegiDate, HealthProblems, Email, Address, ClassroomID } = this.state;
        return error ? (
            <p>{error}</p>
        ) : (
            <div className="containerLongPic">
                <div className="all-add-student">
                    <img src={edit_student_1} className="imgAddStudent" alt="" />
                    <div className="contentPageAdd">
                        <button
                            type="button"
                            onClick={this.handleDelete}
                            className="logout-button RRR-Button"
                        ><i class="fa fa-trash colordelete"></i> Delete
                        </button>
                        <div className="contentPageAdd">
                            <span className="title-page">REGISTER NEW STUDENT</span>

                            <form onSubmit={this.handleSubmit}>
                                <table className="addData">
                                    <TR
                                        required
                                        description="First Name"
                                        type="text"
                                        name="FirstName"
                                        value={FirstName}
                                        placeholder="الاسم باللغة العربية"
                                        onChange={this.handleArabic}
                                    />
                                    <TR
                                        required
                                        description="Father's Name"
                                        type="text"
                                        name="FatherName"
                                        value={FatherName}
                                        placeholder="الاسم باللغة العربية"
                                        onChange={this.handleArabic}
                                    />
                                    <TR
                                        required
                                        description="Last Name"
                                        type="text"
                                        name="LastName"
                                        value={LastName}
                                        placeholder="الاسم باللغة العربية"
                                        onChange={this.handleArabic}
                                    />
                                    <TR
                                        required
                                        description="Mother's Name"
                                        type="text"
                                        name="MotherFullName"
                                        value={MotherFullName}
                                        placeholder="الاسم باللغة العربية"
                                        onChange={this.handleArabic}
                                    />
                                    <tr>
                                        <td> <label>Classroom</label></td>
                                        <td>
                                            <Choice_List_Classroom
                                                onChange={this.onChangeValueGrade}
                                                classroomID={ClassroomID}
                                            />
                                        </td>
                                    </tr>
                                    <TR
                                        description="Date of Birth"
                                        type="date"
                                        placeholder="Date of Birth"
                                        name="BirthDate"
                                        value={BirthDate}
                                        onChange={this.handleChange}
                                    />
                                    <tr>
                                        <td><label>Gender</label></td>
                                        <td>
                                            <div className="radioAddTable">
                                                <Gender_Radio
                                                    onChange={this.onChangeValueGender}
                                                    check={this.state.Gender}
                                                    classFlexRadio="classFlexRadio"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <TR
                                        description="Email"
                                        type="email"
                                        placeholder="Email"
                                        name="Email"
                                        value={Email}
                                        onChange={this.handleChange}
                                    />
                                    <TR
                                        description="Address"
                                        type="text"
                                        placeholder="Address"
                                        name="Address"
                                        value={Address}
                                        onChange={this.handleChange}
                                    />
                                    <TR
                                        description="First Time Registered"
                                        type="date"
                                        placeholder="Date First time registered at School"
                                        name="RegiDate"
                                        value={RegiDate}
                                        onChange={this.handleChange}
                                    />
                                    <TR
                                        description="Contact Number"
                                        type="text"
                                        placeholder="Contact Number"
                                        name="ECNumber"
                                        value={ECNumber}
                                        onChange={this.handleNumber}
                                    />
                                    <TR
                                        description="Health Problems"
                                        type="text"
                                        placeholder="Health Problems"
                                        name="HealthProblems"
                                        value={HealthProblems}
                                        onChange={this.handleChange}
                                    />
                                </table>
                                <div className="enterPanel">
                                    <div className="saveCancelDiv">
                                        {user.RoleID === 0 ? (
                                            <BT
                                                type="button"
                                                description="Cancel"
                                                className="cancel-button"
                                                onClick={() => this.nextPath(`/student/manage`)}
                                            />
                                        ) : (
                                            <BT
                                                type="button"
                                                description="Cancel"
                                                className="cancel-button"
                                                onClick={() => this.nextPath(`/subpanel`)}
                                            />
                                        )}
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
        )
    }
}

Edit_Student.contextType = SessionContext;