const DynamoDBError = require('./dynamoDbError');
const DynamoDBRepository = require('./dynamoDBRepository');

module.exports = class UsersRepository extends DynamoDBRepository {

    constructor(AWS, uuid) {
        super(AWS, uuid);
        this.tableName = 'users';
    }    

    async getByEmail(email) {

        var params = {
            TableName: this.tableName,
            IndexName: 'users_email_gsi',
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: { "#email": "email" },
            ExpressionAttributeValues: { ':email': email }
        };
        
        return  await this.dynamoDb.query(params)
        .promise()
        .then((data) => {            
            return data.Count == 0 ? null : data.Items[0];                
        })
        .catch((err) => {
            throw new DynamoDBError(err);
        });    
    }      
}