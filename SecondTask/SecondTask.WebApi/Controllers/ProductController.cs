using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecondTask.Application.Features.CQRS.Commands.ProductCommands;
using SecondTask.Application.Features.CQRS.Handlers.ProductHandlers;
using SecondTask.Application.Features.CQRS.Queries.ProductQueries;

namespace SecondTask.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly CreateProductCommandHandler _createCommandHandler;
        private readonly UpdateProductCommandHandler _updateCommandHandler;
        private readonly RemoveProductCommandHandler _removeCommandHandler;
        private readonly GetProductByIdQueryHandler _getProductByIdQueryHandler;
        private readonly GetProductQueryHandler _getProductQueryHandler;

        public ProductController(GetProductQueryHandler getProductQueryHandler, GetProductByIdQueryHandler getProductByIdQueryHandler, RemoveProductCommandHandler removeCommandHandler, UpdateProductCommandHandler updateCommandHandler, CreateProductCommandHandler createCommandHandler)
        {
            _getProductQueryHandler = getProductQueryHandler;
            _getProductByIdQueryHandler = getProductByIdQueryHandler;
            _removeCommandHandler = removeCommandHandler;
            _updateCommandHandler = updateCommandHandler;
            _createCommandHandler = createCommandHandler;
        }
        [HttpGet]
        public async Task<IActionResult> GetProductList()
        {
            var values = await _getProductQueryHandler.Handle();
            return Ok(values);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductList(int id)
        {
            var values = await _getProductByIdQueryHandler.Handle(new GetProductByIdQuery(id));
            return Ok(values);
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductCommand command)
        {
            await _createCommandHandler.Handle(command);
            return Ok("product added successfully");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct(UpdateProductCommand command)
        {
            await _updateCommandHandler.Handle(command);
            return Ok("product updated successfully");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _removeCommandHandler.Handle(new RemoveProductCommand(id));
            return Ok("product deleted successfully");
        }
    }
}
