module.exports = class GetTodosUseCase {

    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }

    async execute(userId) {        
        return await this.todosRepository.getByUser(userId);
    }
}