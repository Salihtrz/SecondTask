using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecondTask.Application.Features.CQRS.Commands.UserCommands;
using SecondTask.Application.Features.CQRS.Handlers.UserHandlers;

namespace SecondTask.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly CreateUserCommandHandler _userCommandHandler;

        public RegisterController(CreateUserCommandHandler userCommandHandler)
        {
            _userCommandHandler = userCommandHandler;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserCommand command)
        {
            await _userCommandHandler.Handle(command);
            return Ok("user added successfully");
        }
    }
}
