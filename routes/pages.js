const express = require('express');
//const bcrypt = require('bcryptjs');
const router = express.Router();
var crypto = require('crypto');
const session = require('express-session');
const mysql = require('mysql');

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.use(
    session({
        secret: 'secret',
    })
);

router.get('/', (req,res)=>{
    res.render('index');
});
//pour deconnecter "fermer la session courante"
router.get('/logout',(req,res)=>{
req.session.rid=undefined;
req.session.email=undefined;
res.redirect('/register');
});

router.get('/register', (req,res)=>{
    res.render('register');
});

router.get('/espace_enseig', (req,res)=>{
    
    
    if(req.session.rid != undefined){
        console.log(req.session.rid);
        if(req.session.rid == 2){
        res.render('espace_enseig');
        }else if(req.session.rid == 3){
            res.redirect('/espace_etud');
        }
    }else{
        res.redirect('/register');
    }
    
});

router.get('/espace_etud', (req,res)=>{

    if(req.session.rid != undefined){
        console.log(req.session.rid);
        if(req.session.rid == 3){
            res.render('espace_etud');
        }else if(req.session.rid == 2){
            res.redirect('/espace_enseig');
        }
    }else{
        res.redirect('/register');
    }

});
//pour verifier login & mot de passe
router.post('/auth/register',(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;

    db.query('SELECT password,role_id FROM user WHERE email =? ',[email], async(error , results) => {
        if (error) {
            console.log(error);
        }
        if(results.length > 0){
            //let hashedPassword = await bcrypt.hash(password, 8);
            const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
            console.log(password);
            console.log(hashedPassword);
            console.log(results[0].password);

            if (results[0].password == hashedPassword){
                console.log('login');
              
                req.session.email = email;
                req.session.rid = results[0].role_id;
                if(results[0].role_id==1){
                    res.redirect('/admin/dashboard');
                }
                else if(results[0].role_id==2){
                    res.redirect('/espace_enseig');
                }else if(results[0].role_id==3){
                    res.redirect('/espace_etud');
                }
                

            }else{
                res.redirect('/register');
            }

        }else{
            res.redirect('/register');
        }
        

    });

});

module.exports = router;