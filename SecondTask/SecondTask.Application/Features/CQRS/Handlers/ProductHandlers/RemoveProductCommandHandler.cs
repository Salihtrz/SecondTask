using SecondTask.Application.Features.CQRS.Commands.ProductCommands;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class RemoveProductCommandHandler
    {
        private readonly IRepository<Product> _repository;

        public RemoveProductCommandHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task Handle(RemoveProductCommand command)
        {
            var value = await _repository.GetByIdAsync(command.Id);
            await _repository.RemoveAsync(value);
        }
    }
}
