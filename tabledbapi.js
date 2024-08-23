// Table - tbl_studentResult - stud_id,f_name,l_name,gender,contact,standard,html,css,react,node,javascript,total,percentage,grade

// Insert - Api - f_name,l_name,gender,contact,standard,html,css,react,node,javascript
// save - f_name,l_name,gender,contact,standard,html,css,react,node,javascript,total,percentage,grade


const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hr_database",
});
con.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// var sql = "Create database db_result";
// con.query(sql, function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Database is created");
//   }getstudentresult
// });

exports.getstudentresult = (req, res) => {
  console.log("Api Is call");
  const sql = "SELECT * FROM TBL_STUDENTRESULT";
  con.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(rows));
    }
  });
};

exports.getstudentresultbyid = (req, res) => {
  console.log("Api call");
  var stud_id = req.params.stud_id;
  console.log(stud_id);
  const sql = "SELECT * FROM tbl_studentresult WHERE stud_id = ?";
  con.query(sql, [stud_id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(rows));
    }
  });
};




// var sql = "CREATE TABLE tbl_studentresult (Stud_id int not null AUTO_INCREMENT,F_name varchar(255),L_name varchar(255),Gender varchar(25),Contact varchar(12),Standard int,HTML INT,CSS INT,JS INT,REACT INT,NODE INT,TOTAL INT ,percentage int,grade varchar(10),primary key(Stud_id));"
// con.query(sql,function(err,result){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Table created')
//     }
// })

exports.savestudents = (req, res) => {
    const { f_name, l_name, gender, contact, standard, html, css, react, node, js } = req.body;
    const total = html + css + react + node + js;
    const percentage = (total / 500) * 100;
    let grade;

    if (percentage >= 90) grade = 'A+'
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else grade = 'D'
    
    var sql = 'INSERT INTO tbl_studentResult (f_name, l_name, gender, contact, standard, html, css, react, node, js, total, percentage, grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var values = [f_name, l_name, gender, contact, standard, html, css, react, node, js, total, percentage, grade];

    con.query(sql, values, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Error inserting student result');
      } else {
          res.send('Student result added');
      }
  });
};


exports.updatestudents = (req, res) => {
    const { id } = req.params;
    const {stud_id, f_name, l_name, gender, contact, standard, html, css, react, node, js } = req.body;
    var total = html + css + react + node + js;
    var percentage = (total / 500) * 100;
    let grade;

    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else grade = 'D';

    var sql = 'UPDATE tbl_studentResult SET  f_name = ?, l_name = ?, gender = ?, contact = ?, standard = ?, html = ?, css = ?, react = ?, node = ?, js = ?, total = ?, percentage = ?, grade = ? WHERE stud_id = ?';
    var values = [f_name, l_name, gender, contact, standard, html, css, react, node, js, total, percentage, grade, stud_id];

    con.query(sql, values, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Error updating student result');
      } else {
          res.send('Student result updated');
      }
  });
};

exports.deletestudents= (req, res) => {
    const { stud_id } = req.params;
    const sql = 'DELETE FROM tbl_studentResult WHERE stud_id = ?';

   con.query(sql, [stud_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting student result');
        } else {
            res.send('Student result deleted');
        }
    });
};

