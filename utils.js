module.exports = {
    getDegree: function(degree) {
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

    age: function(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);

        let age = today.getUTCFullYear() - birth.getUTCFullYear();
        const month = today.getUTCMonth() - birth.getUTCMonth();

        if (month <= 0 && today.getUTCDate() < birth.getUTCDate()) {
            age -= 1;
        }

        return age;

    },

    date: function(timestamp) {

        const birthDate = new Date(timestamp);

        const year = birthDate.getUTCFullYear();
        const month = `0${birthDate.getUTCMonth()}`.slice(-2);
        const day = `0${birthDate.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
    }

}