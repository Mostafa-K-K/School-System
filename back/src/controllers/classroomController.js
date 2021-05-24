const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })


    // Get CLASSROOM
    const getClassroomList = async () => {
        let statement = `SELECT * FROM classroom ORDER BY ClassroomName`;
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`No rows found`);
            return rows;
        } catch (e) {
            throw new Error(`Couldn't retrieve Classroom : ` + e.message);
        }
    }

    // CREATE CLASSROOM
    const createClassroom = async (props) => {
        if (!props || !props.name) {
            throw new Error(`Please provide Classroom name`);
        }
        const { name } = props;
        try {
            const result = await db.run(`INSERT INTO classroom (ClassroomName) VALUES (?)`, name);
            return true;
        } catch (e) {
            throw new Error(`Couldn't insert this Classroom: ` + e.message);
        }
    }

    // DELETE CLASSROOM
    const deleteClassroom = async (id) => {
        try {
            const result = await db.run(`DELETE FROM classroom WHERE ClassroomID = ?`, id);
            if (result.changes === 0) throw new Error(`Classroom ${id} does not exist`);
            return true;
        } catch (e) {
            throw new Error(`Couldn't delete this Classroom  ${id} : ` + e.message);
        }
    }

    // UPDATE CLASSROOM
    const updateClassroom = async (id, props) => {
        const { name, TeacherNames } = props;

        let attributes = ``;
        let valuesAtt = [];

        if (props.TeacherNames) {
            attributes += ` TeacherNames = ? ,`;
            valuesAtt.push(TeacherNames);
        }
        if (props.name) {
            attributes += ` ClassroomName = ? ,`;
            valuesAtt.push(name);
        }
        attributes = attributes.slice(0, -1);

        try {
            attributes += ` WHERE ClassroomID = ?`
            valuesAtt.push(id);
            const result = await db.run(`UPDATE classroom SET ${attributes}`, valuesAtt);
            if (result.changes === 0) throw new Error(`No changes detected`);
            return true;
        } catch (e) {
            throw new Error(`Couldn't update this Classroom ${id}: ` + e.message);
        }
    }

    // READ SINGLE CLASSROOM
    const getClassroom = async (id) => {
        try {
            const result = await db.get(`SELECT * FROM classroom WHERE ClassroomID = ${id}`);
            return result;
        } catch (e) {
            throw new Error(`Couldn't get this Classroom : ` + e.message);
        }
    }

    // GET JOIN CLASSROOM AND STUDENT
    const getClassNameStudent = async (props) => {
        const { name, agemin, agemax, gender, grade } = props;
        let statement = `SELECT * FROM student LEFT JOIN classroom ON classroom.ClassroomID = student.ClassroomID`;

        if (props.name || props.agemin || props.gender || props.grade) statement += ` WHERE`;
        if (props.name) statement += ` FirstName LIKE '${name}%' OR LastName LIKE '${name}%'`;// OR FatherName LIKE '${name}%' OR MotherFullName LIKE '${name}%'
        if (props.name && (props.agemin || props.gender || props.grade)) statement += ` AND`;
        if (props.agemin && props.agemax) {
            var ageMin = parseInt(agemin);
            var ageMax = parseInt(agemax);
            statement += ` AgeS BETWEEN ${ageMin} and ${ageMax}`;
        }
        if (props.agemin && (props.gender || props.grade)) statement += ` AND`;
        if (props.gender) statement += ` Gender LIKE '${gender}'`;
        if (props.gender && props.grade) statement += ` AND`;
        if (props.grade) statement += ` student.ClassroomID LIKE '${grade}'`;

        try {
            const rows = await db.all(statement);
            return rows;
        } catch (e) {
            throw new Error(`ERROR : ` + e.message);
        }
    }

    const controller = {
        getClassroomList,
        createClassroom,
        deleteClassroom,
        updateClassroom,
        getClassroom,
        getClassNameStudent
    }
    return controller;
}
module.exports = { initializeDatabase };