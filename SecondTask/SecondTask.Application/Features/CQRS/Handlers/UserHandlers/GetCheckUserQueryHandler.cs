using SecondTask.Application.Features.CQRS.Queries.UserQueries;
using SecondTask.Application.Features.CQRS.Results.UserResults;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondTask.Application.Features.CQRS.Handlers.UserHandlers
{
    public class GetCheckUserQueryHandler
    {
        private readonly IRepository<User> _repository;

        public GetCheckUserQueryHandler(IRepository<User> repository)
        {
            _repository = repository;
        }
        public async Task<GetCheckUserQueryResult> Handle(GetCheckUserQuery query)
        {
            var values = new GetCheckUserQueryResult();
            var user = await _repository.GetByFilterAsync(x => x.Username == query.Username && x.Password == query.Password);
            if (user != null)
            {
                values.Id = user.Id;
                values.Surname = user.Surname;
                values.Name = user.Name;
                values.Username = user.Username;
            }
            return values;
        }
    }
}
