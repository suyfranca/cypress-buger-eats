import signup from '../pages/SignupPage';

describe('Signup', () => { 

    beforeEach( function() {
        cy.fixture('deliver').then( (data) => {
            this.deliver = data;
        });
    });

    it('User should be deliver', function() { 
        signup.go();
        signup.fillForm(this.deliver.signup);
        signup.submit();
        
        const expectedRegisterMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
        signup.modalContentShouldBe(expectedRegisterMessage);
    });

    it('Invalid document', function() { 
        signup.go();
        signup.fillForm(this.deliver.cpf_inv);
        signup.submit();
        
        const alertErrorMessage = 'Oops! CPF inválido';
        signup.alertContentShouldBe(alertErrorMessage);
    });

    it('Invalid email', function() { 
        signup.go();
        signup.fillForm(this.deliver.email_inv);
        signup.submit();
        
        const alertErrorMessage = 'Oops! Email com formato inválido.';
        signup.alertContentShouldBe(alertErrorMessage);
    });
})