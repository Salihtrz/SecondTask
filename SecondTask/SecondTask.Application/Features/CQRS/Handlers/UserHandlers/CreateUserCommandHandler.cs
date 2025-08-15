using SecondTask.Application.Features.CQRS.Commands.UserCommands;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.UserHandlers
{
    public class CreateUserCommandHandler
    {
        private readonly IRepository<User> _repository;

        public CreateUserCommandHandler(IRepository<User> repository)
        {
            _repository = repository;
        }
        public async Task Handle(CreateUserCommand command)
        {
            await _repository.CreateAsync(new User
            {
                Name = command.Name,
                Password = command.Password,
                Surname = command.Surname,
                Username = command.Username
            });
        }
    }
}
