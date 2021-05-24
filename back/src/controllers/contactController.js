const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    // Get CONTACT LINK
    const getContactLink = async () => {
        let statement = `SELECT * FROM contact`;
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`No rows found`);
            return rows;
        } catch (e) {
            throw new Error(e.message);
        }
    }
 
    // UPDATE CONTACT LINK
    const updateContactLink = async (name, props) => {
        if (!props && !props.link) {
            throw new Error(`error`);
        }
        const { link } = props;
        try {
            const result = await db.run(`UPDATE contact SET ContactLink = ? WHERE ContactName = ?`, [link, name]);
            if (result.changes === 0) throw new Error(`No changes detected`);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    // READ SINGLE CONTACT
    const getContact = async (name) => {
        try {
            const result = await db.get(`SELECT * FROM contact WHERE ContactName LIKE '${name}'`);
            if (!result) throw new Error(`contact ${name} not found`);
            return result;
        } catch (e) {
            throw new Error( e.message);
        }
    }

    const controller = {
        getContactLink,
        updateContactLink,
        getContact
    }
    return controller;
}
module.exports = { initializeDatabase };