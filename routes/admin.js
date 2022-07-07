const express = require('express');

const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const router = express.Router();
var crypto = require('crypto');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// pour rediriger le client selon leur id à la page convenable

router.get('/login_admin', (req, res) => {
    res.render('admin/login_admin');
});

router.get('/dashboard', (req, res) => {

    if (req.session.rid != undefined) {
        console.log(req.session.rid);
        if (req.session.rid == 1) {
            res.render('admin/dashboard');
        } else if (req.session.rid == 3) {
            res.redirect('/espace_etud');
        } else if (req.session.rid == 2) {
            res.redirect('/espace_enseig');
        }
    } else {
        res.redirect('/register');
    }

});

// router.get('/manage_matter', (req, res) => {
//     if (req.session.rid != undefined) {
//         console.log(req.session.rid);
//         if (req.session.rid == 1) {
//             res.render('admin/manage_matter');
//         } else if (req.session.rid == 3) {
//             res.redirect('/espace_etud');
//         } else if (req.session.rid == 2) {
//             res.redirect('/espace_enseig');
//         }
//     } else {
//         res.redirect('/register');
//     }


// });

        //pour afficher la liste des users de la bd

router.get('/manage_user', (req, res) => {
    db.query('SELECT * FROM user', function (error, results_user, fields) {
        if (results_user.length >= 0) {
        
            console.log(results_user);
            res.render('admin/manage_user', {
                users: results_user,
            });
        }
    });

});

router.get('/manage_matter', (req, res) => {
    db.query('SELECT * FROM matter', function (error, results_matter, fields) {
        if (results_matter.length >= 0) {
        
            console.log(results_matter);
            res.render('admin/manage_matter', {
                matters: results_matter,
            });
        }
    });

});


router.get('/add', (req, res) => {
    if (req.session.rid != undefined) {

        console.log(req.session.rid);
        if (req.session.rid == 1) {
            res.render('admin/add');
        } else if (req.session.rid == 3) {
            res.redirect('/espace_etud');
        } else if (req.session.rid == 2) {
            res.redirect('/espace_enseig');
        }
    } else {
        res.redirect('/register');
    }


});


router.get('/add_matter', (req, res) => {
    if (req.session.rid != undefined) {
        console.log(req.session.rid);
        if (req.session.rid == 1) {
            res.render('admin/add_matter');
        } else if (req.session.rid == 3) {
            res.redirect('/espace_etud');
        } else if (req.session.rid == 2) {
            res.redirect('/espace_enseig');
        }
    } else {
        res.redirect('/register');
    }


});



router.get('/add_course', (req, res) => {
    if (req.session.rid != undefined) {
        console.log(req.session.rid);
        if (req.session.rid == 1) {
            res.render('admin/add_course');
        } else if (req.session.rid == 3) {
            res.redirect('/espace_etud');
        } else if (req.session.rid == 2) {
            res.redirect('/espace_enseig');
        }
    } else {
        res.redirect('/register');
    }

});

router.get('/manage_course', (req, res) => {
    if (req.session.rid != undefined) {
        console.log(req.session.rid);
        if (req.session.rid == 1) {
            res.render('admin/manage_course');
        } else if (req.session.rid == 3) {
            res.redirect('/espace_etud');
        } else if (req.session.rid == 2) {
            res.redirect('/espace_enseig');
        }
    } else {
        res.redirect('/register');
    }


});

exports.add = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordconfirm, role_id } = req.body;


    db.query('SELECT email FROM user WHERE email =? ', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('add', {
                message: 'that email is already in use'
            })
        }
        else if (password !== passwordconfirm) {
            return res.render('add', {
                message: 'passwords do not match '
            });
        }
        console.log(password);
        console.log(passwordconfirm);
        const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
        //let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?', { name: name, email: email, password: hashedPassword, role_id: role_id }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log(results);


                return res.render('add', { message: 'user registered ' });




            }
        })

    });




}

router.post('/add', this.add);


router.get('/add_matter', (req, res) => {
    console.log(req.body);

    const { name, id } = req.body;


    db.query('SELECT name FROM matter WHERE name  =? ', [name], async (error, results) => {
        if (error) {
            console.log(error);
        }


        else if (id < 1) {
            return res.render('/admin/add_matter', {
                message: 'enter your id_matter '
            });
        }
        console.log(name);
        console.log(id);


        db.query('INSERT INTO matter SET ?', { name: name, id: id }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log(results);


                return res.render('/admin/add_matter', { message: 'matter registered ' });




            }
        })

    });


    res.render('/admin/add_matter');

});




router.post('/add_matter', (req, res) => {
    console.log(req.body);

    const { name, id } = req.body;


    db.query('SELECT  name  FROM matter WHERE  name  =? ', [name], async (error, results) => {
        if (error) {
            console.log(error);
        }


        else if (id < 1) {
            return res.render('/admin/add_matter', {
                message: 'enter your id_matter '
            });
        }
        console.log(name);
        console.log(id);


        db.query('INSERT INTO matter SET ?', { name: name, id: id }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log(results);


                res.redirect('/admin/manage_matter');





            }
        })

    });



});


router.get('/add_course', (req, res) => {
    console.log(req.body);

    const { course_name, id_matter, file_url , id_teacher} = req.body;


    db.query('SELECT course_name FROM course WHERE course_name  =? ', [course_name], async (error, results) => {
        if (error) {
            console.log(error);
        }


        else if (id < 1) {
            return res.render('/admin/add_course', {
                message: 'enter the course_name please '
            });
        }
        console.log(course_name);
        console.log(id_matter);
        console.log(file_url);
        console.log(id_teacher);


        db.query('INSERT INTO course SET ?', { course_name: course_name, id_matter: id_matter, file_url: file_url, id_teacher: id_teacher }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log(results);


                return res.render('/admin/add_course', { message: 'course registered ' });




            }
        })

    });


    res.render('/admin/add_course');
});

router.post('/add_course', (req, res) => {
    console.log(req.body);

    const { course_name, id_matter, file_url , id_teacher } = req.body;


    db.query('SELECT course_name FROM course WHERE course_name  =? ', [course_name], async (error, results) => {
        if (error) {
            console.log(error);
        }


        else if (id_matter < 1) {
            return res.render('/admin/add_course', {
                message: 'enter the course_name please '
            });
        }
        console.log(course_name);
        console.log(id_matter);
        console.log(file_url);
        console.log(id_teacher );

        db.query('INSERT INTO course SET ?', { course_name: course_name,id_matter : id_matter, file_url: file_url ,id_teacher:id_teacher}, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log(results);


                res.redirect('/admin/manage_course');





            }
        })

    });



});



module.exports = router;



