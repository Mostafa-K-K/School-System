import { Component } from 'react'
import TR from '../../../components/TR'
import BT from '../../../components/Button'
import add_teacher_1 from '../../../images/add_teacher_1.jpg'
import Choices_List_Classroom from '../../../components/Choices_List_Classroom'

export default class Add_Teacher extends Component {

    state = {
        student: [],
        arrClass: [],
        arrCalssname: [],
        T_FN: "",
        T_LN: "",
        Major: "",
        T_Email: "",
        PhoneNB: "",
        T_Address: "",
        TeacherID: "",
        ClassroomID: "",
        arrCalssnames: "",
        isSelected: false
    }

    async componentDidMount() {
        await this.getTeacherMaxId();
    }

    getTeacherMaxId = async () => {
        try {
            const response = await fetch(`//localhost:8000/teacher/last/maxid`);
            const result = await response.json();
            if (result.success) {
                const lastid = result.result;
                this.setState({ lastid });
            }
            else this.setState({ error: result.message });
        } catch (err) {
            this.setState({ error_message: err });
        }
    }

    createTeacher = async (params = {}) => {
        let { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID } = params;
        let url = `//localhost:8000/teacher/create?T_FN=${T_FN}&T_LN=${T_LN}&PhoneNB=${PhoneNB}`;
        if (Major) url += `&Major=${Major}`;
        if (T_Email) url += `&T_Email=${T_Email}`;
        if (T_Address) url += `&T_Address=${T_Address}`;
        if (ClassroomID) url += `&ClassroomID=${ClassroomID}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.success) {
                const teacher = result.result;
                this.setState({ teacher });
            }
            else this.setState({ error: result.message });
        } catch (err) {
            this.setState({ error_message: err });
        }
        this.nextPath(`/teacher/data`);
    }

    createTeachClass = async (params) => {
        let { TeacherID, ClassroomID } = params;
        try {
            const response = await fetch(`http://localhost:8000/teachclass/create?teach=${TeacherID}&classr=${ClassroomID}`);
            const result = await response.json();
            if (result.success) {
                const teachclass = result.result;
                this.setState({ teachclass });
            }
            else this.setState({ error: result.message });

        } catch (err) {
            this.setState({ error_message: err });
        }
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

    handleSubmit = async (e) => {
        e.nativeEvent.preventDefault();
        let { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address } = this.state;
        let { arrCalssname, arrClass, lastid, arrCalssnames } = this.state;
        lastid++;
        const length = arrClass.length;
        let i = 0;

        while (i < length) {
            const val = arrClass[i];
            this.createTeachClass({ TeacherID: lastid, ClassroomID: val });
            try {
                const response = await fetch(`http://localhost:8000/classroom/${arrClass[i]}`);
                const result = await response.json();
                if (result.success) {
                    const classroom = result.result.ClassroomName;
                    this.setState({ classroom });
                    arrCalssname.push(classroom);
                }
                else {
                    const error = result.message;
                    this.setState({ error });
                }
            } catch (err) {
                this.setState({ error_message: err });
            }
            i++;
        }
        arrCalssnames = arrCalssname.join();
        this.setState({ arrCalssnames });
        this.createTeacher({ T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID: arrCalssnames });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    valueCheckbox = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        let { arrClass } = this.state;
        const options = this.state.options;
        (e.target.checked) ? arrClass.push(value) : arrClass = arrClass.filter(nclass => nclass !== value);
        arrClass.sort();
        this.setState({ options: options, arrClass });
    }

    render() {
        let { error, T_FN, T_LN, Major, T_Email, PhoneNB, T_Address } = this.state;
        return error ? (
            <p>{error}</p>
        ) : (
            <div className="containerLongPic">
                <div className="all-add-student">
                    <img src={add_teacher_1} className="imgAddStudent" alt="" />
                    <div className="contentPageAdd">
                        <div className="contentPageAdd">
                            <span className="title-page">add new teacher</span>
                            <form onSubmit={this.handleSubmit}>
                                <table className="addData">
                                    <TR
                                        required
                                        description="First Name"
                                        type="text"
                                        name="T_FN"
                                        value={T_FN}
                                        placeholder="?????????? ???????????? ??????????????"
                                        onChange={this.handleArabic}
                                    />
                                    <TR
                                        required
                                        description="Last Name"
                                        type="text"
                                        name="T_LN"
                                        value={T_LN}
                                        placeholder="?????????? ???????????? ??????????????"
                                        onChange={this.handleArabic}
                                    />
                                    <TR
                                        required
                                        description="Phone Number"
                                        type="text"
                                        placeholder="Phone Number"
                                        name="PhoneNB"
                                        value={PhoneNB}
                                        onChange={this.handleNumber}
                                    />
                                    <TR
                                        description="Email"
                                        type="email"
                                        placeholder="Email"
                                        name="T_Email"
                                        value={T_Email}
                                        onChange={this.handleChange}
                                    />
                                    <Choices_List_Classroom
                                        onChange={this.valueCheckbox}
                                        classNameDiv="classroomcheck"
                                        classNameInput="inCheckbox"
                                        classNameSpan="check"
                                        classNameLabel="gradeLabel"
                                    />
                                    <TR
                                        description="Major"
                                        type="text"
                                        placeholder="Major"
                                        name="Major"
                                        value={Major}
                                        onChange={this.handleChange}
                                    />
                                    <TR
                                        description="Address"
                                        type="text"
                                        placeholder="Address"
                                        name="T_Address"
                                        value={T_Address}
                                        onChange={this.handleChange}
                                    />

                                </table>
                                <div className="enterPanel">
                                    <div className="saveCancelDiv">
                                        <BT
                                            type="button"
                                            description="Cancel"
                                            onClick={() => this.nextPath(`/teacher/manage`)}
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
        )
    }
}