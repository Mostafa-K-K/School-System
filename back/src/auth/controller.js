const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function controller(db) {

    async function isLoggedIn(req, res, next) {

        const id = req.header("id");
        const token = req.header("token");
        if (!token) next(new Error("Auth Error"));
        try {
            const decoded = jwt.verify(token, "randomString");
            if (id != decoded.userId) next(new Error("Invalid Token"));

            const statement = `SELECT AdminID AS id, Username, A_Email, token, RoleID FROM admin WHERE token = "${token}"`;
            const user = await db.get(statement);
            if (!user || !user.id || user.id != id) next(new Error("Invalid Token"));

            req.userId = decoded.userId;
            req.user = user;
            next();
        } catch (e) {
            next(new Error("Invalid Token"));
        }
    }

    async function signupAction({ name, nickname, password }) {
        if (!name || !password) throw new Error("Email and Password are required");
        try {
            let selectStmt = `SELECT AdminID AS id, Username, A_Email, Password FROM admin WHERE name = "${name}"`;
            let user = await db.get(selectStmt);
            if (user) throw new Error("User already exists");

            // hash the password
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);

            let insertStmt = 'INSERT INTO admin (Username, A_Email, Password) VALUES (?, ?, ?)';
            let result = await db.run(insertStmt, [name, nickname, hashedPassword]);
            let id = result && result.lastID;

            let payload = { userId: id };
            let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });

            await db.run('UPDATE admin SET token = ? WHERE AdminID = ?', token, id);
            return { id, token, name, nickname };
        } catch (e) {
            throw new Error(`couldn't create user ` + e.message);
        }
    }

    async function loginAction({ name, password }) {
        if (!name || !password) throw new Error("Email and Password are required");
        try {
            let statement = `SELECT AdminID AS id, Username, A_Email, Password, RoleID FROM admin WHERE Username = "${name}"`;
            let user = await db.get(statement);
            if (!user) throw new Error("User not found");

            // let isMatch = await bcrypt.compare(password, user.Password);
            let isMatch = password === user.Password;
            if (!isMatch) throw new Error("Incorrect Password !");

            let payload = { userId: user.id };
            let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });

            await db.run('UPDATE admin SET token = ? WHERE AdminID = ?', token, user.id);
            return { ...user, token };
        } catch (e) {
            throw new Error(`couldn't login user ` + e.message);
        }
    }

    async function logoutAction(userId) {
        try {
            await db.run('UPDATE admin SET token = ? WHERE AdminID = ?', null, userId);
            return { message: "logged out successfully" }
        } catch (e) {
            throw new Error(`couldn't logout user ` + e.message);
        }
    }

    return { isLoggedIn, signupAction, loginAction, logoutAction }

}

module.exports = controller;