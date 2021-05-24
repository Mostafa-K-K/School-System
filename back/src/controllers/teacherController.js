const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    });

    // GET TEACHER
    const getTeachersList = async () => {
        let statement = `SELECT * FROM teachers ORDER BY T_FN`
        try {
            const rows = await db.all(statement);
            if (!rows.length === 0) throw new Error(`no rows found`)
            return rows
        } catch (e) {
            throw new Error(`couldn't retrieve teachers: ` + e.message)
        }
    }

    // GET TEACHER MAX ID
    const getTeacherMaxId = async () => {
        let statement = `SELECT MAX(TeacherID) as imax FROM teachers`
        try {
            const rows = await db.get(statement);
            return rows.imax;
        } catch (e) {
            throw new Error(`couldn't retrieve teachers: ` + e.message)
        }
    }

    // READ SINGLE TEACHER
    const getTeacher = async (id) => {
        let statement = `SELECT * FROM teachers WHERE TeacherID = ${id}`
        const teacher = await db.get(statement)
        if (!teacher) throw new Error(`teacher ${id} not found`);
        return teacher;
    }

    // CREATE TEACHER
    const createTeacher = async (props) => {
        const { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID } = props;
        let attributes = "T_FN, T_LN, PhoneNB";
        let valuesAtt = [T_FN, T_LN, PhoneNB];
        let inValues = "?,?,?,?,?";

        if (props.Major) {
            attributes += `, Major`;
            valuesAtt.push(parseInt(Major));
            inValues += `,?`;
        }
        if (props.T_Email) {
            attributes += `, T_Email`;
            valuesAtt.push(parseInt(T_Email));
            inValues += `,?`;
        }
        if (props.T_Address) {
            attributes += `, T_Address`;
            valuesAtt.push(parseInt(T_Address));
            inValues += `,?`;
        }
        if (props.T_Address) {
            attributes += `, T_Address`;
            valuesAtt.push(parseInt(T_Address));
            inValues += `,?`;
        }
        try {
            const result = await db.run(`INSERT INTO teachers (T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID) VALUES (?, ?, ?, ?, ?, ?, ?)`, [T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID]);
            return result;
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }
    }

    // DELETE TEACHER
    const deleteTeacher = async (id) => {
        try {
            const result = await db.run(`DELETE FROM teachers WHERE TeacherID = ?`, id);
            if (result.changes === 0) throw new Error(`teacher "${id}" does not exist`)
            return true;
        } catch (e) {
            throw new Error(`couldn't delete the teacher "${id}": ` + e.message)
        }
    }

    // UPDATE TEACHER
    const updateTeacher = async (id, props) => {
        const { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID } = props;

        let attributes = ``;
        let valuesAtt = [];

        if (props.T_FN) {
            attributes += ` T_FN = ? ,`;
            valuesAtt.push(T_FN);
        }
        if (props.T_LN) {
            attributes += ` T_LN = ? ,`;
            valuesAtt.push(T_LN);
        }
        if (props.Major) {
            attributes += ` Major = ? ,`;
            valuesAtt.push(Major);
        }
        if (props.T_Email) {
            attributes += ` T_Email = ? ,`;
            valuesAtt.push(T_Email);
        }
        if (props.PhoneNB) {
            attributes += ` PhoneNB = ? ,`;
            valuesAtt.push(parseInt(PhoneNB));
        }
        if (props.T_Address) {
            attributes += ` T_Address = ? ,`;
            valuesAtt.push(T_Address);
        }
        if (props.ClassroomID) {
            attributes += ` ClassroomID = ? ,`;
            valuesAtt.push(ClassroomID);
        }
        attributes = attributes.slice(0, -1);

        try {
            attributes += ` WHERE TeacherID = ?`
            valuesAtt.push(id);
            const result = await db.run(`UPDATE teachers SET ${attributes}`, valuesAtt);
            if (result.changes === 0) throw new Error(`no changes`);
            return true;
        } catch (e) {
            throw new Error(`couldn't update the teacher ${id}: ` + e.message);
        }
    }

    const controller = {
        getTeachersList,
        getTeacher,
        createTeacher,
        deleteTeacher,
        updateTeacher,
        getTeacherMaxId
    }
    return controller;
}
module.exports = { initializeDatabase }