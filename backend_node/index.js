const express = require('express');
const app = express();
const cors = require('cors');
const progressReport = require('./progressReport.js');
app.use(cors());
app.use(express.json());
const port = 3000;



app.get('/filter', (req, res) => {
    const answer = progressReport.getBySelection();
    res.send({
        data: answer
    });
})


app.post('/reports', (req, res) => {
    const answer = progressReport.getProgressReports(req.body);
    res.send({
        data: answer
    });
})

app.get('/progress', (req, res) => {
   const answer = progressReport.getStudentProgress(req.query.student_id);
    res.send({
        data: answer
    });
})



app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`)
})