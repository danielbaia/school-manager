const Teachers = require('../Models/teachers');
const { date, age, teacherLevel, teacherClassType } = require('../../lib/utils');
const teachers = require('../Models/teachers');



module.exports = {

    index(req, res) {

        Teachers.all(function(teachers) {
            return res.render('teachers/index', { teachers });
        });

    },

    create(req, res) {
        return res.render('teachers/create');
    },
    post(req, res) {

        const Keys = Object.keys(req.body);

        for (const key of Keys) {
            if (req.body[key] == "")
                res.send('Please, fill all the fields...');

        }

        Teachers.create(req.body, function(teacher) {
            return res.redirect(`teachers/${teacher.id}`);
        })


    },

    show(req, res) {

        Teachers.find(req.params.id, function(teacher) {

            if (!teacher) res.render("Teacher not found...");

            teacher.age = age(teacher.birth);
            teacher.education_level = teacherLevel(teacher.education_level);
            teacher.class_type = teacherClassType(teacher.class_type);
            teacher.subjects_taught = teacher.subjects_taught.split(",");
            teacher.created_at = date(teacher.created_at).format;

            return res.render('teachers/show', { teacher });


        });
    },
    edit(req, res) {

        Teachers.find(req.params.id, function(teacher) {

            teacher.birth = date(teacher.birth).iso;
            return res.render(`teachers/edit`, { teacher });

        });

    },

    put(req, res) {

        Teachers.update(req.body, function() {
            return res.redirect(`teachers/${req.body.id}`);
        });

    },

    delete(req, res) {

        Teachers.delete(req.body.id, function() {
            return res.redirect(`/teachers`);
        })
    },
}