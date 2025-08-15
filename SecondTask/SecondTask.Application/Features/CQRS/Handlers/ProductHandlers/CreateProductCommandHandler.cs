using SecondTask.Application.Features.CQRS.Commands.ProductCommands;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class CreateProductCommandHandler
    {
        private readonly IRepository<Product> _repository;

        public CreateProductCommandHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task Handle(CreateProductCommand command)
        {
            await _repository.CreateAsync(new Product
            {
                Brand = command.Brand,
                Description = command.Description,
                Price = command.Price,
                ProductName = command.ProductName,
                Status = command.Status
            });
        }
    }
}
