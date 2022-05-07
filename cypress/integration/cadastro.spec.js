
describe('Cadastro', () => { //cenario do teste
    it('Usuario deve se tornar um entregador', () => { //primeiro caso de teste
        cy.viewport(1440,900);
        cy.visit('https://buger-eats.vercel.app');

        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
        
        let entregador = { //massa de teste
            nome: 'Suyanne França',
            cpf: '03722252391',
            email: 'suy@pa.com',
            whatsapp: '85981812020',
            endereco: {
                cep: '60800400',
                rua: 'Rua do Bairro',
                numero: '555',
                complemento: 'Apt 601',
                bairro: 'Messejana',
                cidade_uf: 'Fortaleza/CE'
            },
            metodo_entrega: 'Van/Carro',
            cnh: 'cnh-digital.jpg'
        }

        cy.get('.field-group .field input[name=name]').type(entregador.nome);
        cy.get('.field-group .field input[name=cpf]').type(entregador.cpf);
        cy.get('.field-group .field input[name=email]').type(entregador.email);
        cy.get('.field-group .field input[name=whatsapp]').type(entregador.whatsapp);

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep);
        cy.get('input[type=button][value="Buscar CEP"]').click();
        cy.get('input[name="address-number"]').type(entregador.endereco.numero);
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento);

        cy.contains(`.delivery-method li`, entregador.metodo_entrega).click();

        cy.get('.dropzone input[accept^="image"]').attachFile('/images/' + entregador.cnh);

        cy.get('form button[type="submit"]').click();

        const expectedRegisterMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';

        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedRegisterMessage);



        




    
    })
})