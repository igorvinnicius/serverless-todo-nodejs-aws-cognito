const signUpInputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },      
        },
        required: ['name', 'email', 'password']
      }
    }
   }

module.exports = signUpInputSchema;