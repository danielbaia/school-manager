const fs = require('fs');
const data = require('../data.json');
const { getDegree, age, date } = require("../utils");


//INDEX
exports.index = function(req, res) {
    return res.render('teachers/index', { teachers: data.teachers });
}

//CREATE
exports.create = function(req, res) {
    return res.render('teachers/create');
}

//POST
exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all the fields.");
        }
    }

    let { id, avatar_url, name, birth, degree, classes, area, created_at } = req.body;

    birth = Date.parse(req.body.birth);
    created_at = Date.now();
    id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        classes,
        area,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file errro...");
        }
        return res.redirect('/teachers');
    })

    //return res.send(req.body);

}

//SHOW
exports.show = function(req, res) {

    const id = req.params.id;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) res.send("Teacher not found...");


    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        degree: getDegree(foundTeacher.degree),
        classes: foundTeacher.classes === 'P' ? 'Presencial' : 'A distancia',
        area: foundTeacher.area.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher });


}

//EDIT
exports.edit = function(req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) {
        return res.send("Teacher not found...");
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher });
}

//PUT
exports.put = function(req, res) {

    const { id } = req.body;
    let index = 0;

    console.log('teste');

    const teacherFound = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex;
            return true;
        }
    })

    if (!teacherFound) return ('Teacher not found...');

    const teacher = {
        ...teacherFound,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.render("Write file error....");
        }

        return res.redirect(`/teachers/${id}`);
    })
}

//DELETE
exports.delete = function(req, res) {

    const { id } = req.body;

    const filteredTeacher = data.teachers.filter(function(teacher) {
        return teacher.id != id;
    })

    data.teachers = filteredTeacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error...")

        res.redirect('/teachers');
    })
}