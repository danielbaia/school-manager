const Students = require('../Models/students');
const { date, age, studentLevel } = require('../../lib/utils');
const { optionTeachers } = require('../Models/students');



module.exports = {

    index(req, res) {

        Students.all(function(students) {
            return res.render('students/index', { students });
        });

    },

    create(req, res) {

        Students.optionsSelectTeachers(function(optionsTeacher) {

            return res.render('students/create', { optionsTeacher });

        });

    },
    post(req, res) {

        const Keys = Object.keys(req.body);

        for (const key of Keys) {
            if (req.body[key] == "")
                res.send('Please, fill all the fields...');

        }

        Students.create(req.body, function(student) {
            return res.redirect(`students/${student.id}`);
        })


    },

    show(req, res) {

        Students.find(req.params.id, function(student) {

            if (!student) res.render("Student not found...");

            student.birthDate = date(student.birth).birthDate;
            student.education_level = studentLevel(student.education_level);
            student.created_at = date(student.created_at).format;

            return res.render('students/show', { student });


        });
    },
    edit(req, res) {

        Students.find(req.params.id, function(student) {

            if (!student) res.send("Student not found...");

            student.birth = date(student.birth).iso;

            Students.optionsSelectTeachers(function(optionsTeacher) {

                return res.render(`students/edit`, { student, optionsTeacher });

            })


        });

    },

    put(req, res) {

        Students.update(req.body, function() {
            return res.redirect(`students/${req.body.id}`);
        });

    },

    delete(req, res) {

        Students.delete(req.body.id, function() {
            return res.redirect(`/students`);
        })
    },
}