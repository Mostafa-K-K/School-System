const app = require('./app');
const dbs = require('./controllers/studentsController');
const dbc = require('./controllers/classroomController');
const dba = require('./controllers/adminController');
const dbt = require('./controllers/teacherController');
const dbu = require('./controllers/contactController');
const dbtc = require('./controllers/teacherClassroomController');
const data = require('./createDataBase');
data.createDataBase();

const start = async () => {

    const controllerClassroom = await dbc.initializeDatabase();
    const controllerStudent = await dbs.initializeDatabase();
    const controllerTeacher = await dbt.initializeDatabase();
    const controllerAdmin = await dba.initializeDatabase();
    const controllerContact = await dbu.initializeDatabase();
    const controllerTeacherClassroom = await dbtc.initializeDatabase();

    require('./auth/routes')(app, controllerAdmin);

    app.get('/', (req, res) => res.send("ok"));

    // GET TEACHCLASS 
    app.get('/teachclass/all', async (req, res, next) => {
        try {
            const result = await controllerTeacherClassroom.getAllTeachClass();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET TEACHCLASS TEACHER
    app.get('/teachclass/single/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerTeacherClassroom.getTeachClass(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET TEACHCLASS CLASSROOM
    app.get('/teachclass/class/single/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerTeacherClassroom.getClassTeach(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // CREATE TEACHCLASS
    app.get('/teachclass/create', async (req, res, next) => {
        const { teach, classr } = req.query;

        try {
            const result = await controllerTeacherClassroom.createTeachClass({ teach, classr });
            res.json({ success: true, result: result });
        } catch (e) {
            next(e);
        }
    });

    // DELETE TEACHCLASS
    app.get('/teachclass/delete', async (req, res, next) => {
        const { teach } = req.query;
        try {
            const result = await controllerTeacherClassroom.deleteTeachClass({ teach });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET CONACT
    app.get('/contact', async (req, res, next) => {
        try {
            const result = await controllerContact.getContactLink();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // UPDATE CONACT
    app.get('/contact/update/:name', async (req, res, next) => {
        const { name } = req.params;
        const { link } = req.query;
        try {
            const result = await controllerContact.updateContactLink(name, { link });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // READ SINGLE CONTACT
    app.get('/contact/:name', async (req, res, next) => {
        const { name } = req.params;
        try {
            const result = await controllerContact.getContact(name);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET CLASSROOM
    app.get('/classroom/student/join', async (req, res, next) => {
        const { name, agemin, agemax, gender, grade } = req.query;
        try {
            const result = await controllerClassroom.getClassNameStudent({ name, agemin, agemax, gender, grade });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET CLASSROOM
    app.get('/classroom', async (req, res, next) => {
        try {
            const result = await controllerClassroom.getClassroomList();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // CREATE CLASSROOM
    app.get('/classroom/create', async (req, res, next) => {
        const { name } = req.query;
        try {
            const result = await controllerClassroom.createClassroom({ name });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // DELETE CLASSROOM
    app.get('/classroom/delete/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerClassroom.deleteClassroom(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // UPDATE CLASSROOM
    app.get('/classroom/update/:id', async (req, res, next) => {
        const { id } = req.params;
        const { name, TeacherNames } = req.query;
        try {
            const result = await controllerClassroom.updateClassroom(id, { name, TeacherNames });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // READ SINGLE CLASSROOM
    app.get('/classroom/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerClassroom.getClassroom(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // CREATE STUDENT
    app.get('/student/create', async (req, res, next) => {
        const { fn, ln, ffn, mfulln, ecnum, BDate, RDate, HPrb, email, gender, adrs, cid } = req.query;
        try {
            const result = await controllerStudent.createStudent({ fn, ln, ffn, mfulln, ecnum, BDate, RDate, HPrb, email, gender, adrs, cid });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // DELETE STUDENT
    app.get('/student/delete/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerStudent.deleteStudent(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    //GET MIN AGE STUDENT
    app.get('/student/min', async (req, res, next) => {
        try {
            const result = await controllerStudent.ageMinStudent();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    //GET MAX AGE STUDENT
    app.get('/student/max', async (req, res, next) => {
        try {
            const result = await controllerStudent.ageMaxStudent();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // UPDATE STUDENT
    app.get('/student/update/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { fn, ln, ffn, mfulln, ecnum, BDate, RDate, HPrb, email, gender, adrs, cid } = req.query;
            const result = await controllerStudent.updateStudent(id, { fn, ln, ffn, mfulln, ecnum, BDate, RDate, HPrb, email, gender, adrs, cid });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // READ SINGLE STUDENT
    app.get('/student/single/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerStudent.getStudent(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // CREATE ADMIN
    app.get('/admin/create', async (req, res, next) => {
        const { Username, Password, A_Email } = req.query;
        try {
            const result = await controllerAdmin.createAdmin({ Username, Password, A_Email });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET LIST ADMIN
    app.get('/admin', async (req, res, next) => {
        try {
            const result = await controllerAdmin.getListAdmin();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // READ SINGLE ADMIN
    app.get('/admin/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerAdmin.getAdmin(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // READ SINGLE ADMIN BY EMAIL
    app.get('/one/admin', async (req, res, next) => {
        const { email } = req.query;
        try {
            const result = await controllerAdmin.getAdminEmail({ email });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });


    // DELETE ADMIN
    app.get('/admin/delete/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerAdmin.deleteAdmin(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // UPDATE ADMIN
    app.get('/admin/update/:id', async (req, res, next) => {
        const { id } = req.params;
        const { Username, Password } = req.query;
        try {
            const result = await controllerAdmin.updateAdmin(id, { Username, Password });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // UPDATE MAIN ADMIN
    app.get('/admin/main/update/:id', async (req, res, next) => {
        const { id } = req.params;
        const { Username, Password, A_Email } = req.query;
        try {
            const result = await controllerAdmin.updateMainAdmin(id, { Username, Password, A_Email });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // CREATE TEACHER
    app.get('/teacher/create', async (req, res, next) => {
        const { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID } = req.query;
        try {
            const result = await controllerTeacher.createTeacher({ T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // LIST TEACHER
    app.get('/teacher', async (req, res, next) => {
        try {
            const result = await controllerTeacher.getTeachersList();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // READ SINGLE TEACHER
    app.get('/teacher/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerTeacher.getTeacher(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // DELETE TEACHER
    app.get('/teacher/delete/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controllerTeacher.deleteTeacher(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // UPDATE TEACHER
    app.get('/teacher/update/:id', async (req, res, next) => {
        const { id } = req.params;
        const { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID } = req.query;
        try {
            const result = await controllerTeacher.updateTeacher(id, { T_FN, T_LN, Major, T_Email, PhoneNB, T_Address, ClassroomID });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    // GET TEACHER MAX ID
    app.get('/teacher/last/maxid', async (req, res, next) => {
        try {
            const result = await controllerTeacher.getTeacherMaxId();
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

}
start();

app.listen(8000, () => console.log('server listening on port 8000'));