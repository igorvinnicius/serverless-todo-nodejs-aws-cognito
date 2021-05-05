const signInInputSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {          
          email: { type: 'string' },
          password: { type: 'string' },      
        },
        required: ['email', 'password']
      }
    }
   }

module.exports = signInInputSchema;