using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using SecondTask.Application.Features.CQRS.Commands.ProductCommands;
using SecondTask.Application.Features.CQRS.Results.ProductResults;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class UpdateProductCommandHandler
    {
        private readonly IRepository<Product> _repository;
        private readonly IDistributedCache _cache;

        public UpdateProductCommandHandler(IRepository<Product> repository, IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }
        public async Task Handle(UpdateProductCommand command)
        {
            var values = await _repository.GetByIdAsync(command.Id);
            values.Description = command.Description;
            values.Price = command.Price;
            values.ProductName = command.ProductName;
            values.Status = command.Status;
            values.Brand = command.Brand;
            await _repository.UpdateAsync(values);
            await _cache.RemoveAsync("getProductList");
            await _cache.RemoveAsync($"getProductById:{command.Id}");
        }
    }
}
