const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    const authActions = require('../auth/controller')(db);
 
    //GET LIST ADMIN
    const getListAdmin = async () => {
        let statement = `SELECT * FROM admin WHERE RoleID = 1 ORDER BY Username`
        try {
            const rows = await db.all(statement);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve users: ` + e.message);
        }
    }

    //GET SINGLE ADMIN
    const getAdmin = async (id) => {
        let statement = `SELECT * FROM admin WHERE AdminID = ${id}`
        try {
            const user = await db.get(statement);
            return user;
        } catch (e) {
            throw new Error(`couldn't retrieve users: ` + e.message);
        }
    }

    //GET SINGLE ADMIN BY EMAIL
    const getAdminEmail = async (props) => {
        const { email } = props;
        let statement = `SELECT * FROM admin WHERE A_Email LIKE '${email}'`
        try {
            const user = await db.get(statement);
            return user;
        } catch (e) {
            throw new Error(`couldn't retrieve users: ` + e.message);
        }
    }

    // CREATE ADMIN
    const createAdmin = async (props) => {
        const { Username, Password, A_Email } = props;
        let attributes = "Username, Password, A_Email";
        let valuesAtt = [Username, Password, A_Email];
        let inValues = "?,?,?";

        try {
            const result = await db.run(`INSERT INTO admin(${attributes}) VALUES (${inValues})`, valuesAtt);
            return result;
        } catch (e) {
            throw new Error(`couldn't insert this User: ` + e.message);
        }
    }

    //DELETE ADMIN
    const deleteAdmin = async (id) => {
        if (id != 1) {
            try {
                const result = await db.run(`DELETE FROM admin WHERE AdminID = ?`, id);
                if (result.changes === 0) throw new Error(`User "${id}" does not exist`);
                return true;
            } catch (e) {
                throw new Error(`couldn't delete the User "${id}": ` + e.message);
            }
        } else {
            throw new Error('you can not delete this admin');
        }
    }

    // Update MAIN Admin
    const updateMainAdmin = async (id, props) => {
        if (!props && !(props.Username && props.Password && props.A_Email)) {
            throw new Error(`you must provide a name or an email`);
        }
        const { Username, Password, A_Email } = props;

        let attributes = ``;
        let valuesAtt = [];

        if (props.Username) {
            attributes += ` Username = ? ,`;
            valuesAtt.push(Username);
        }
        if (props.Password) {
            attributes += ` Password = ? ,`;
            valuesAtt.push(Password);
        }
        if (props.A_Email) {
            attributes += ` A_Email = ? ,`;
            valuesAtt.push(A_Email);
        }
        attributes = attributes.slice(0, -1);

        try {
            attributes += ` WHERE AdminID = ?`
            valuesAtt.push(id);
            const result = await db.run(`UPDATE admin SET ${attributes}`, valuesAtt);
            if (result.changes === 0) throw new Error(`no changes were made`);
            return true;

        } catch (e) {
            throw new Error(`couldn't update the User ${id}: ` + e.message);
        }
    }

    //UPDATE ADMIN
    const updateAdmin = async (id, props) => {
        if (!props && !(props.Username && props.Password)) {
            throw new Error(`you must fill all the field`);
        }
        const { Username, Password } = props;

        let attributes = ``;
        let valuesAtt = [];

        if (props.Username) {
            attributes += ` Username = ? ,`;
            valuesAtt.push(Username);
        }
        if (props.Password) {
            attributes += ` Password = ? ,`;
            valuesAtt.push(Password);
        }
        attributes = attributes.slice(0, -1);

        try {
            attributes += ` WHERE AdminID = ?`
            valuesAtt.push(id);
            const result = await db.run(`UPDATE admin SET ${attributes}`, valuesAtt);
            if (result.changes === 0) throw new Error(`no changes were made`);
            return true;
        } catch (e) {
            throw new Error(`couldn't update the User ${id}: ` + e.message);
        }
    }

    const controller = {
        getListAdmin,
        getAdmin,
        createAdmin,
        deleteAdmin,
        updateMainAdmin,
        updateAdmin,
        getAdminEmail,
        ...authActions
    }

    return controller;
}

module.exports = { initializeDatabase };