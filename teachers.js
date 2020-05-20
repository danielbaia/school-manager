const fs = require('fs');
const data = require('./data.json');
const { getDegree } = require("./utils");




//SHOW
exports.show = function(req, res) {

    const id = req.params.id;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) res.send("Teacher not found...");


    const teacher = {
        ...foundTeacher,
        degree: getDegree(foundTeacher.degree),
        classes: foundTeacher.classes === 'P' ? 'Presencial' : 'A distancia',
        area: foundTeacher.area.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher });


}


//CREATE
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