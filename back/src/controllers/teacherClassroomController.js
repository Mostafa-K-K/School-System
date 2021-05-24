const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    // Get TEACHCLASS
    const getAllTeachClass = async () => {
        let statement = `SELECT * FROM TeachClass ORDER BY TeacherID`;
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`No rows found`);
            return rows;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // Get TEACHCLASS
    const getTeachClass = async id => {
        let statement = `SELECT ClassroomID FROM TeachClass WHERE TeacherID= ? `;
        try {
            const rows = await db.all(statement, parseInt(id));
            return rows;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // Get CLASSTEACH
    const getClassTeach = async id => {
        let statement = `SELECT TeacherID FROM TeachClass WHERE ClassroomID= ? `;
        try {
            const rows = await db.all(statement, parseInt(id));
            return rows;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // CREATE TEACHCLASS
    const createTeachClass = async (props) => {
        const { teach, classr } = props;
        try {
            const result = await db.run(`INSERT INTO TeachClass (TeacherID, ClassroomID) VALUES (?,?)`, [teach, classr]);
            return result;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // DELETE TEACHCLASS
    const deleteTeachClass = async (props) => {
        const { teach, classr } = props;
        try {
            const result = await db.run(`DELETE FROM TeachClass WHERE TeacherID = ?`, teach);
            if (result.changes === 0) throw new Error(`ERROR`);
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }


    const controller = {
        getTeachClass,
        getClassTeach,
        createTeachClass,
        deleteTeachClass,
        getAllTeachClass
    }
    return controller;
}
module.exports = { initializeDatabase };