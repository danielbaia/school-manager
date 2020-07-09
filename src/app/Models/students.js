const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback) {
        db.query(`SELECT * FROM students ORDER by ID`, function(err, results) {
            if (err) throw `Database error ${err}`;
            callback(results.rows);
        })

    },

    create(data, callback) {

        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                email,
                birth,
                education_level,
                class_hours,
                created_at,
                teacher_id,
                )
                VALUES( $1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id`;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.education_level,
            data.class_hours,
            date(Date.now()).iso,
            data.teacher
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DataBase Error ${err}`;

            callback(results.rows[0]);
        })

    },

    find(id, callback) {

        const query = `
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = ($1)
        `;

        db.query(query, [id], function(err, results) {
            if (err) throw `Error Database ${err}`;
            callback(results.rows[0]);
        });
    },

    update(data, callback) {
        const query = `
            UPDATE students
            SET
            avatar_url = $1,
            name = $2,
            email= $3,
            birth = $4,
            education_level = $5,
            class_hours = $6,
            teacher_id = $7
            WHERE id = $8
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.education_level,
            data.class_hours,
            data.teacher,
            data.id
        ];

        db.query(query, values, function(err, results) {
            if (err) throw `Database error ${err}`;

            callback();
        })

    },

    delete(id, callback) {

        db.query(`DELETE FROM students WHERE id = ($1)`, [id], function(err, results) {
            if (err) throw `Database error ${err}`;
            callback();
        })
    },

    optionsSelectTeachers(callback) {

        const query = `
            SELECT name, id 
            FROM teachers
        `;

        db.query(query, function(err, results) {
            if (err) throw `Database error ${err}`;

            callback(results.rows);
        });

    }

}