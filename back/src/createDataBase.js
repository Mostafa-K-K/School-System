const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

const createDataBase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    });

    // db.migrate({ force: 'last' });

    await db.run(`CREATE TABLE IF NOT EXISTS TeachClass (
        tcID INTEGER PRIMARY KEY AUTOINCREMENT,
        TeacherID INTEGER NOT NULL,
        ClassroomID INTEGER NOT NULL );`);

    // await db.run(`DROP TABLE TeachClass`)

    await db.run(`CREATE TABLE IF NOT EXISTS contact (
                  ContactName TEXT UNIQUE  PRIMARY KEY ,
                  ContactLink TEXT );`);

    // await db.run(`DROP TABLE contact`)

    const contactrow = await db.all(`SELECT * FROM contact`);
    if (contactrow.length < 1) {
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['Facebook', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['Instagram', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['Twitter', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['YouTube', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['Email', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['Phone', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['WhatsApp', 'none']);
        await db.run(`INSERT INTO contact (ContactName, ContactLink) VALUES (?,?)`, ['Location', 'none']);
    }

    // await db.run(`DROP TABLE contact`)

    await db.run(`CREATE TABLE IF NOT EXISTS classroom(
            ClassroomID INTEGER PRIMARY KEY AUTOINCREMENT,
            ClassroomName TEXT NOT NULL UNIQUE,
            TeacherNames TEXT ); `);

    // await db.run(`DROP TABLE classroom`)

    await db.run(`CREATE TABLE IF NOT EXISTS student(
            StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL,
            FatherName TEXT NOT NULL,
            MotherFullName TEXT NOT NULL,
            ECNumber INTEGER UNIQUE,
            BirthDate DATE,
            RegiDate DATE,
            HealthProblems TEXT DEFAULT "NULL",
            Email TEXT UNIQUE,
            Gender TEXT NOT NULL,
            Address TEXT,
            AgeS INTEGER,
            ClassroomID INTEGER,
            FOREIGN KEY(ClassroomID) REFERENCES classroom(ClassroomID)
            ); `);

    // await db.run(`DROP TABLE student`)

    await db.run(`CREATE TABLE IF NOT EXISTS teachers(
                TeacherID INTEGER PRIMARY KEY AUTOINCREMENT,
                T_FN TEXT NOT NULL,
                T_LN TEXT NOT NULL,
                Major TEXT,
                T_Email TEXT UNIQUE,
                PhoneNB INTEGER NOT NULL UNIQUE,
                T_Address TEXT,
                ClassroomID TEXT); `);

    // await db.run(`DROP TABLE teachers`)

    await db.run(`CREATE TABLE IF NOT EXISTS admin(
                    AdminID INTEGER PRIMARY KEY AUTOINCREMENT,
                    Username TEXT NOT NULL UNIQUE,
                    Password TEXT NOT NULL,
                    A_Email TEXT NOT NULL UNIQUE,
                    RoleID INTEGER NOT NULL DEFAULT 1,
                    token TEXT); `);

    // await db.run(`DROP TABLE admin`)

    const result = await db.all(`SELECT * FROM admin WHERE AdminID=1`);
    if (!result || result.length == 0) await db.run(`INSERT INTO admin(Username, Password, A_Email, RoleID) VALUES(?,?,?,?)`, ['admin123', 'admin123', 'admin123@gmail.com', 0]);

}
module.exports = { createDataBase };