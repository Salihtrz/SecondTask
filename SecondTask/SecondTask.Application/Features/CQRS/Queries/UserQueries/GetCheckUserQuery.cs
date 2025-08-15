using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondTask.Application.Features.CQRS.Queries.UserQueries
{
    public class GetCheckUserQuery
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
