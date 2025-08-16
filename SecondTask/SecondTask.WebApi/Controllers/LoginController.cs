using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecondTask.Application.Features.CQRS.Handlers.UserHandlers;
using SecondTask.Application.Features.CQRS.Queries.UserQueries;
using SecondTask.Application.Tools;

namespace SecondTask.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly GetCheckUserQueryHandler _getCheckUserQueryHandler;

        public LoginController(GetCheckUserQueryHandler getCheckUserQueryHandler)
        {
            _getCheckUserQueryHandler = getCheckUserQueryHandler;
        }
        [HttpPost]
        public async Task<IActionResult> Index(GetCheckUserQuery query)
        {
            var values = await _getCheckUserQueryHandler.Handle(query);
            if(values.IsExists)
            {
                return Created("", JwtTokenGenerator.GenerateToken(values));
            }
            else
            {
                return BadRequest("username or password is incorrect");
            }
        }
    }
}
