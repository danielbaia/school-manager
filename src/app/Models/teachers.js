const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback) {
        db.query(`SELECT * FROM teachers ORDER by name ASC`, function(err, results) {
            if (err) throw `Database error ${err}`;
            callback(results.rows);
        })

    },

    create(data, callback) {

        const query = `
            INSERT INTO teachers(
                avatar_url,
                name,
                birth,
                education_level,
                class_type,
                subjects_taught,
                created_at
                )
                VALUES( $1, $2, $3, $4, $5, $6, $7)
                RETURNING id`;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DataBase Error ${err}`;

            callback(results.rows[0]);
        })

    },

    find(id, callback) {

        db.query(`SELECT * FROM teachers  WHERE ID = ($1)`, [id], function(err, results) {
            if (err) throw `Error Database ${err}`;
            callback(results.rows[0]);
        });
    },

    update(data, callback) {
        const query = `
            UPDATE teachers
            SET
            avatar_url = $1,
            name = $2,
            birth = $3,
            education_level = $4,
            class_type = $5,
            subjects_taught = $6
            WHERE id = $7
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ];

        db.query(query, values, function(err, results) {
            if (err) throw `Database error ${err}`;

            callback();
        })

    },

    delete(id, callback) {

        db.query(`DELETE FROM teachers WHERE id = ($1)`, [id], function(err, results) {
            if (err) throw `Database error ${err}`;
            callback();
        })
    }

}