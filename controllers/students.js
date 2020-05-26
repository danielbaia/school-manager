const fs = require('fs');
const data = require('../data.json');
const { getDegree, age, date } = require("../utils");


//INDEX
exports.index = function(req, res) {
    return res.render('students/index', { students: data.students });
}

//CREATE
exports.create = function(req, res) {
    return res.render('students/create');
}

//POST
exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all the fields.");
        }
    }


    let id = 1;

    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        ...req.body,
        id,
        birth: Date.parse(req.body.birth)

    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file errro...");
        }
        return res.redirect('/students');
    })

    //return res.send(req.body);

}

//SHOW
exports.show = function(req, res) {

    const id = req.params.id;

    const foundStudent = data.students.find(function(student) {
        return student.id == id;
    })

    if (!foundStudent) res.send("Student not found...");


    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        degree: getDegree(foundStudent.degree),
        classes: foundStudent.classes === 'P' ? 'Presencial' : 'A distancia',
        area: foundStudent.area.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
    }

    return res.render("students/show", { student });


}

//EDIT
exports.edit = function(req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id;
    })

    if (!foundStudent) {
        return res.send("Student not found...");
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth)
    }

    return res.render('students/edit', { student });
}

//PUT
exports.put = function(req, res) {

    const { id } = req.body;
    let index = 0;

    console.log('teste');

    const studentFound = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex;
            return true;
        }
    })

    if (!studentFound) return ('Student not found...');

    const student = {
        ...studentFound,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.render("Write file error....");
        }

        return res.redirect(`/students/${id}`);
    })
}

//DELETE
exports.delete = function(req, res) {

    const { id } = req.body;

    const filteredStudent = data.students.filter(function(student) {
        return student.id != id;
    })

    data.students = filteredStudent;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error...")

        res.redirect('/students');
    })
}