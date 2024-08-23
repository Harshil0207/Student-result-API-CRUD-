module.exports= (app)=>{
    const tabledbapi = require('./tabledbapi.js');

app.get("/getstudentresult",tabledbapi.getstudentresult);
app.get("/getstudentresult/:stud_id",tabledbapi.getstudentresultbyid)
app.post('/saveStudents',tabledbapi.savestudents)
app.put('/updateStudents/:stud_id',tabledbapi.updatestudents)
app.delete('/deleteStudent/:stud_id',tabledbapi.deletestudents)

}