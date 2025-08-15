using SecondTask.Application.Features.CQRS.Queries.ProductQueries;
using SecondTask.Application.Features.CQRS.Results.ProductResults;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class GetProductByIdQueryHandler
    {
        private readonly IRepository<Product> _repository;

        public GetProductByIdQueryHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task<GetProductByIdQueryResult> Handle(GetProductByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetProductByIdQueryResult
            {
                Brand = values.Brand,
                Description = values.Description,
                Id = values.Id,
                Price = values.Price,
                ProductName = values.ProductName,
                Status = values.Status
            };
        }
    }
}
