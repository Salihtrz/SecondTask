using Microsoft.Extensions.Caching.Distributed;
using SecondTask.Application.Features.CQRS.Commands.ProductCommands;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class CreateProductCommandHandler
    {
        private readonly IRepository<Product> _repository;
        private readonly IDistributedCache _cache;

        public CreateProductCommandHandler(IRepository<Product> repository, IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
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
            await _cache.RemoveAsync("getProductList");
        }
    }
}
