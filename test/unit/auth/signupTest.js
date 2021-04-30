const expect = require('chai');
const sinon = require('sinon');

const User = require('../../../src/entities/user');
const SignUpUseCase = require('../../../src/application/use_cases/auth/signUp/signUpUseCase');
const SignUpInput = require('../../../src/application/use_cases/auth/signUp/signUpInput');


describe('SignUp Use Case', () => {

    it('should return a registered user correctly', async () => {        
        
        const authService = { signUp:() => {}};
        const usersRepository = { add:() => {}, getByEmail:() =>{}}

        const signUpInput = new SignUpInput("Jon Snow", "jon@starks.com", "123456");

        const expectedUser = [ new User("Jon Snow", "jon@starks.com") ];

        sinon.stub(usersRepository, 'getByEmail').returns(null);        
        sinon.stub(usersRepository, 'add').returns(expectedUser);        

        sinon.stub(authService, 'signUp').returns({ success: true });

        const signUpUseCase = new SignUpUseCase(authService, usersRepository);       

        const registeredUser = await signUpUseCase.execute(signUpInput);

        expect.expect(usersRepository.add.called).to.be.true;
        expect.expect(authService.signUp.called).to.be.true;
        expect.expect(expectedUser).to.be.equal(registeredUser);
    });

    it('should throw an error when user already exists', async () => {
        
        try {                       

            const authService = { signUp:() => {}};            
            const usersRepository = {getByEmail:() =>{}}

            const signUpInput = new SignUpInput("Jon Snow", "jon@starks.com", "123456");
            sinon.stub(usersRepository, 'getByEmail').returns(new User("Jon Snow", "jon@starks.com"));                       

            sinon.stub(authService, 'signUp').returns({ success: false });

            const signUpUseCase = new SignUpUseCase(authService, usersRepository);       

            await signUpUseCase.execute(signUpInput);            

            expect.expect.fail();

        }
        catch (err) {            
            expect.expect(err.name).to.be.equal('DuplicateError');
            expect.expect(err.message).to.be.equal('User already exists.');
        }        
       
    });

    it('should throw an error when signUp fails', async () => {
        
        try {                       

            const authService = { signUp:() => {}};            
            const usersRepository = {getByEmail:() =>{}}            

            sinon.stub(usersRepository, 'getByEmail').returns(null);
            const signUpInput = new SignUpInput("Jon Snow", "jon@starks.com", "123456");                        

            sinon.stub(authService, 'signUp').returns({ success: false });

            const signUpUseCase = new SignUpUseCase(authService, usersRepository);       

            await signUpUseCase.execute(signUpInput);            

            expect.expect.fail();

        }
        catch (err) {            
            expect.expect(err.name).to.be.equal('SignUpError');
            expect.expect(err.message).to.be.equal('Sign up has been failed.');
        }        
       
    });

});