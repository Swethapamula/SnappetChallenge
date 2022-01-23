const fs = require('fs');



// Returns data by selection
const getBySelection = function () {

    const student_data = JSON.parse(fs.readFileSync('./data.json').toString());
    
    const res = {
        students: Array.from(new Set(student_data.map(value => value.UserId))),
        subjects: Array.from(new Set(student_data.map(value => value.Subject))),
        learnings: Array.from(new Set(student_data.map(value => value.LearningObjective)))
    };
    return res;
}


//Returns Student Progress by subject and Learningobjective before datetime 2015-03-24T11:30:00.000
const getStudentProgress = function (uid) {
    const data = JSON.parse(fs.readFileSync('./data.json').toString());
    const student_data = data.filter(value => value.UserId === parseInt(uid) && value.SubmitDateTime.localeCompare('2015-03-24T11:30:00.000') < 0);
    const subjectData = {}
    for (const answer of student_data) {
        const day = answer.SubmitDateTime.split('T')[0];
        if (!subjectData[day]) {
            subjectData[day] = {};
        }
        if (!subjectData[day][answer.Subject]) {
            subjectData[day][answer.Subject] = [];
        }
        subjectData[day][answer.Subject].push(answer);
    }

    const learningData = {}
    for (const answer of student_data) {
        const day = answer.SubmitDateTime.split('T')[0];
        if (!learningData[day]) {
            learningData[day] = {};
        }
        if (!learningData[day][answer.LearningObjective]) {
            learningData[day][answer.LearningObjective] = [];
        }
        learningData[day][answer.LearningObjective].push(answer);
    }

    const progress = {
        subject: Object.keys(subjectData).map(day => {
            return Object.keys(subjectData[day]).map(subject => {
                return {
                    time: day,
                    subject: subject,
                    progress: subjectData[day][subject].reduce((acc, val) => acc + val.Progress, 0),
                    correct: subjectData[day][subject].reduce((acc, val) => acc + val.Correct, 0),
                    difficulty: subjectData[day][subject].reduce((acc, val) => {
                        if (val.Difficulty !== 'NULL') {
                            return acc + parseFloat(val.Difficulty);
                        }
                    }, 0) / subjectData[day][subject].length
                }
            })
        }),

        learning: Object.keys(learningData).map(day => {
            return Object.keys(learningData[day]).map(objective => {
                return {
                    time: day,
                    objective: objective,
                    progress: learningData[day][objective].reduce((acc, val) => acc + val.Progress, 0),
                    correct: learningData[day][objective].reduce((acc, val) => acc + val.Correct, 0),
                    difficulty: learningData[day][objective].reduce((acc, val) => {
                        if (val.Difficulty !== 'NULL') {
                            return acc + parseFloat(val.Difficulty);
                        }
                    }, 0) / learningData[day][objective].length
                }
            })
        }),

    }
    return progress;
}



// Returns class progress before  datetime 2015-03-24T11:30:00.000
const getProgressReports = function (filter) {
    let data = JSON.parse(fs.readFileSync('./data.json').toString());


    data = data.filter(value => value.SubmitDateTime.localeCompare('2015-03-24T11:30:00.000') < 0)

    if (filter && filter.student && filter.student.length > 0) {
        data = data.filter(value => filter.student.includes(value.UserId))
    }
    if (filter && filter.learning && filter.learning.length > 0) {
        data = data.filter(value => filter.learning.includes(value.LearningObjective))
    }
    if (filter && filter.subject && filter.subject.length > 0) {
        data = data.filter(value => filter.subject.includes(value.Subject))
    }
    if (filter && filter.beginDate && filter.endDate) {
        data = data.filter(value => value.SubmitDateTime.localeCompare(filter.beginDate) > 0 && value.SubmitDateTime.localeCompare(filter.endDate) < 0)
    }

    const subjectData= {}

    for (const answer of data) {
        if (!subjectData[answer.Subject]) {
            subjectData[answer.Subject] = [];
        }
        subjectData[answer.Subject].push(answer);
    }
    const learningData = {}
    for (const answer of data) {
        if (!learningData[answer.LearningObjective]) {
            learningData[answer.LearningObjective] = [];
        }
        learningData[answer.LearningObjective].push(answer);

    }

    const difficulties = [];
    for (const answer of data) {
        if (answer.Difficulty !== 'NULL') {
            difficulties.push(parseFloat(answer.Difficulty));
        }
    }
    const difficultyData = {
        min: Math.min(...difficulties),
        max: Math.max(...difficulties),
        average: difficulties.reduce((prev, curr) => prev + curr, 0) / difficulties.length,
    };

    const reports = {
        subject: {
            answers: Object.keys(subjectData),
            count: Object.values(subjectData).map((x) => x.length)
        },
        learning: {
            answers: Object.keys(learningData),
            count: Object.values(learningData).map((x) => x.length)
        },
        difficulty: difficultyData
    }
    return reports;
}


exports.getBySelection = getBySelection;
exports.getStudentProgress = getStudentProgress;
exports.getProgressReports = getProgressReports;
