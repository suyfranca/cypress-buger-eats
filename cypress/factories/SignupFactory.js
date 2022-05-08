var faker = require('faker');
var cpf = require('gerador-validador-cpf');

export default {
   
    deliver: function() {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();    

        let data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '11999992222',
            address: {
                postalcode: '60841480',
                street: 'Rua 3',
                number: '131',
                details: 'Apt 601',
                district: 'Messejana',
                city_state: 'Fortaleza/CE'
            },
            delivery_method: 'Van/Carro',
            cnh: 'cnh-digital.jpg'
        }

        return data;
    }
}