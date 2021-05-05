const expect = require('chai');
const sinon = require('sinon');

const User = require('../../../src/entities/user');
const SignInUseCase = require('../../../src/application/use_cases/auth/signIn/signInUseCase');
const SignInInput = require('../../../src/application/use_cases/auth/signIn/signInInput');



describe('SignIn Use Case', () => {

    it('should return the sign in data correctly', async () => {        
        
        const authService = { signIn:() => {}};
        const usersRepository = {getByEmail:() =>{}}

        const signInInput = new SignInInput("jon@starks.com", "123456");           

        sinon.stub(authService, 'signIn').returns({ success: true });
        sinon.stub(authService, 'signIn').returns({ success: true });

        const signInUseCase = new SignInUseCase(authService, usersRepository);       

        const signInResponse = await signInUseCase.execute(signInInput);
        
        expect.expect(authService.signIn.called).to.be.true;
        expect.expect(signInResponse.data).to.not.be.null;
        expect.expect(usersRepository.getByEmail.called).to.be.true;
    });    

    it('should throw an error when signIn fails', async () => {
        
        try {                       

            const authService = { signIn:() => {} };            
            const usersRepository = {getByEmail:() =>{} };
            
            const signInInput = new SignInInput("jon@starks.com", "123456");                        

            sinon.stub(authService, 'signIn').returns({ success: false });

            const signInUseCase = new SignInUseCase(authService, usersRepository);       

            await signInUseCase.execute(signInInput);            

            expect.expect.fail();

        }
        catch (err) {            
            expect.expect(err.name).to.be.equal('SignInError');
            expect.expect(err.message).to.be.equal('Sign in has been failed.');
        }        
       
    });

});