//cette page ne concerne le code juste un teste de départ .
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.get('/add_matter', (req,res)=>{
  console.log(req.body); 

  const {name ,id } = req.body;

 
  db.query('SELECT name FROM matter WHERE name  =? ',[name], async(error , results) => {
        if (error) {
               console.log(error);
        }

      
        else if ( id <1 ){
             return res.render('/admin/add_matter', {
              message:'enter your id_matter '
            });
        }  
        console.log(name);
        console.log(id);
  

      db.query('INSERT INTO matter SET ?' ,{ name:name , id:id }, (error,results) =>{
           if(error ){
             console.log(error);
           }else{
             
              console.log(results);
               
               
               return res.render('/admin/add_matter', {message:'matter registered '});
               
               
               
          
            }
        })

    });
  
 
  res.render('/admin/add_matter');
});

router.post('/add_matter', (req,res)=>{
  console.log(req.body); 

  const { name , id } = req.body;

 
  db.query('SELECT  name  FROM matter WHERE  name  =? ',[ name ], async(error , results) => {
        if (error) {
               console.log(error);
        }

       
        else if ( id  <1){
             return res.render('/admin/add_matter', {
              message:'enter your id_matter '
            });
        }  
        console.log(name);
        console.log(id);
    

      db.query('INSERT INTO matter SET ?' ,{name : name ,id: id}, (error,results) =>{
           if(error ){
             console.log(error);
           }else{
             
              console.log(results);
               
               
               return res.render('/admin/add_matter', {message:'matter registered '});
               
               
               
          
            }
        })

    });
  
 

});
