using SecondTask.Application.Features.CQRS.Results.ProductResults;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class GetProductQueryHandler
    {
        private readonly IRepository<Product> _repository;

        public GetProductQueryHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task<List<GetProductQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new GetProductQueryResult
            {
                Brand = x.Brand,
                Description = x.Description,
                ProductName = x.ProductName,
                Id = x.Id,
                Price = x.Price,
                Status = x.Status
            }).ToList();
        }
    }
}
