module.exports = {
    teacherLevel(degree) {
        if (degree === 'E') {
            return 'Ensino Médio Completo'
        } else if (degree === 'S') {
            return 'Ensino Superior Completo'
        } else if (degree === 'M') {
            return 'Mestrado'
        } else if (degree === 'D') {
            return 'Doutorado'
        } else {
            return '';
        }
    },

    age(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);

        let age = today.getUTCFullYear() - birth.getUTCFullYear();
        const month = today.getUTCMonth() - birth.getUTCMonth();

        if (month <= 0 && today.getUTCDate() < birth.getUTCDate()) {
            age -= 1;
        }

        return age;

    },

    date(timestamp) {

        const birthDate = new Date(timestamp);

        const year = birthDate.getUTCFullYear();
        const month = `0${birthDate.getUTCMonth() + 1}`.slice(-2);
        const day = `0${birthDate.getUTCDate()}`.slice(-2);

        return {
            iso: `${year}-${month}-${day}`,
            birthDate: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },

    studentLevel(str) {

        if (str === '1F') {
            return '1&deg Ano Ensino Fundamental';

        } else if (str === '2F') {
            return '2&deg Ano Ensino Fundamental';

        } else if (str === '3F') {
            return '3&deg Ano Ensino Fundamental';

        } else if (str === '4F') {
            return '4&deg Ano Ensino Fundamental';

        } else if (str === '5F') {
            return '5&deg Ano Ensino Fundamental';

        } else if (str === '6F') {
            return '6&deg Ano Ensino Fundamental';

        } else if (str === '7F') {
            return '7&deg Ano Ensino Fundamental';

        } else if (str === '8F') {
            return '8&deg Ano Ensino Fundamental';

        } else if (str === '9F') {
            return '9&deg Ano Ensino Fundamental';

        } else if (str === '1M') {
            return '1&deg Ano Ensino Medio';

        } else if (str === '2M') {
            return '2&deg Ano Ensino Medio';

        } else if (str === '3M') {
            return '3&deg Ano Ensino Medio';

        }
    },

    teacherClassType(str) {
        return str == 'P' ? 'Presencial' : 'Distancia';
    }

}