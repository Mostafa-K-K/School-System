const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    function getAge(b) {
        var birth = new Date(b);
        var today = new Date();

        var nowyear = today.getFullYear();
        var nowmonth = today.getMonth();
        var nowday = today.getDate();

        var birthyear = birth.getFullYear();
        var birthmonth = birth.getMonth();
        var birthday = birth.getDate();

        var age = nowyear - birthyear;
        var agemonth = nowmonth - birthmonth;
        var ageday = nowday - birthday;

        if (agemonth < 0 || (agemonth == 0 && ageday < 0)) age = parseInt(age) - 1;

        return age;
    }

    function getDD(d) {
        return (new Date(new Date(d).getTime())).toLocaleDateString()
    }

    //GET MIN AGE STUDENT
    const ageMinStudent = async () => {
        try {
            const age = await db.get(`SELECT MIN(AgeS) AS amin FROM student`);
            return age.amin;
        } catch (e) {
            throw new Error(`ERROR : ` + e.message);
        }
    }

    //GET MAX AGE STUDENT
    const ageMaxStudent = async () => {
        try {
            const age = await db.get(`SELECT MAX(AgeS) AS amax FROM student`);
            return age.amax;
        } catch (e) {
            throw new Error(`ERROR : ` + e.message);
        }
    }

    // CREATE STUDENT
    const createStudent = async (props) => {
        const { fn, ln, ffn, mfulln, ecnum, BDate, RDate, HPrb, email, gender, adrs, cid } = props;
        let attributes = "FirstName, LastName, FatherName, MotherFullName, Gender";
        let valuesAtt = [fn, ln, ffn, mfulln, gender];
        let inValues = "?,?,?,?,?";
        if (props.ecnum) {
            attributes += `, ECNumber`;
            valuesAtt.push(parseInt(ecnum));
            inValues += `,?`;
        }
        if (props.BDate) {
            attributes += `, BirthDate, AgeS`;
            valuesAtt.push(getDD(BDate), getAge(BDate));
            inValues += `,?,?`;
        }
        if (props.RDate) {
            attributes += `, RegiDate`;
            valuesAtt.push(getDD(RDate));
            inValues += `,?`;
        }
        if (props.HPrb) {
            attributes += `, HealthProblems`;
            valuesAtt.push(HPrb);
            inValues += `,?`;
        }
        if (props.email) {
            attributes += `, Email`;
            valuesAtt.push(email);
            inValues += `,?`;
        }
        if (props.adrs) {
            attributes += `, Address`;
            valuesAtt.push(adrs);
            inValues += `,?`;
        }
        if (props.cid) {
            attributes += `, ClassroomID`;
            valuesAtt.push(parseInt(cid));
            inValues += `,?`;
        }
        try {
            const result = await db.run(`INSERT INTO student(${attributes}) VALUES (${inValues})`, valuesAtt);
            const id = result.lastID;
            return id;
        } catch (e) {
            throw new Error(`couldn't insert this student: ` + e.message);
        }
    }

    // DELETE STUDENT
    const deleteStudent = async (id) => {
        try {
            const result = await db.run(`DELETE FROM student WHERE StudentID = ?`, id);
            if (result.changes === 0) throw new Error(`student ${id} does not exist`);
            return true;
        } catch (e) {
            throw new Error(`couldn't delete the student  ${id} : ` + e.message);
        }
    }

    // UPDATE STUDENT
    const updateStudent = async (id, props) => {
        const { fn, ln, ffn, mfulln, ecnum, BDate, RDate, HPrb, email, gender, adrs, cid } = props;

        let attributes = ``;
        let valuesAtt = [];
        if (props.fn) {
            attributes += ` FirstName = ? ,`;
            valuesAtt.push(fn);
        }
        if (props.ln) {
            attributes += ` LastName = ? ,`;
            valuesAtt.push(ln);
        }
        if (props.ffn) {
            attributes += ` FatherName = ? ,`;
            valuesAtt.push(ffn);
        }
        if (props.mfulln) {
            attributes += ` MotherFullName = ? ,`;
            valuesAtt.push(mfulln);
        }
        if (props.ecnum) {
            attributes += ` ECNumber = ? ,`;
            valuesAtt.push(parseInt(ecnum));
        }
        if (props.BDate) {
            attributes += ` BirthDate = ? , AgeS = ? ,`;
            valuesAtt.push(getDD(BDate), getAge(BDate));
        }
        if (props.RDate) {
            attributes += ` RegiDate = ? ,`;
            valuesAtt.push(getDD(RDate));
        }
        if (props.HPrb) {
            attributes += ` HealthProblems = ? ,`;
            valuesAtt.push(HPrb);
        }
        if (props.email) {
            attributes += ` Email = ? ,`;
            valuesAtt.push(email);
        }
        if (props.gender) {
            attributes += ` Gender = ? ,`;
            valuesAtt.push(gender);
        }
        if (props.adrs) {
            attributes += ` Address = ? ,`;
            valuesAtt.push(adrs);
        }
        if (props.cid) {
            attributes += ` ClassroomID = ? ,`;
            valuesAtt.push(parseInt(cid));
        }
        attributes = attributes.slice(0, -1);
        try {
            attributes += ` WHERE StudentID = ?`
            valuesAtt.push(id);
            const result = await db.run(`UPDATE student SET ${attributes}`, valuesAtt);
            if (result.changes === 0) throw new Error(`no changes`);
            return true;
        } catch (e) {
            throw new Error(`couldn't update the student ${id}: ` + e.message);
        }
    }

    // READ SINGLE STUDENT
    const getStudent = async (id) => {
        try {
            const result = await db.get(`SELECT * FROM student WHERE StudentID = ${id}`);
            if (!result) throw new Error(`Student ${id} not found`);
            return result;
        } catch (e) {
            throw new Error(`couldn't get Student : ` + e.message);
        }
    }

    const controller = {
        createStudent,
        deleteStudent,
        updateStudent,
        getStudent,
        ageMinStudent,
        ageMaxStudent
    }
    return controller;
}
module.exports = { initializeDatabase };