import signup from "../pages/SignupPage";
import signupFactory from "../factories/SignupFactory";

describe("Signup", () => {
  // beforeEach( function() {
  //     cy.fixture('deliver').then( (data) => {
  //         this.deliver = data;
  //     });
  // });

  it("User should be deliver", function () {
    let deliver = signupFactory.deliver();

    signup.go();
    signup.fillForm(deliver);
    signup.submit();

    const expectedRegisterMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signup.modalContentShouldBe(expectedRegisterMessage);
  });

  it("Invalid document", function () {
    let deliver = signupFactory.deliver();

    deliver.cpf = "000000141aa";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();

    const alertErrorMessage = "Oops! CPF inválido";
    signup.alertContentShouldBe(alertErrorMessage);
  });

  it("Invalid email", function () {
    let deliver = signupFactory.deliver();

    deliver.email = "user.com.br";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();

    const alertErrorMessage = "Oops! Email com formato inválido.";
    signup.alertContentShouldBe(alertErrorMessage);
  });

  context("Required fields", function () {

    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "delivery_method", output: "Selecione o método de entrega" },
      { field: "cnh", output: "Adicione uma foto da sua CNH" }
    ];

    before(function(){
        signup.go();
        signup.submit();
    });

    messages.forEach( function(msg) {
        it(`${msg.field} is required`, function(){
            signup.alertContentShouldBe(msg.output);
        });
    });

  });

});
