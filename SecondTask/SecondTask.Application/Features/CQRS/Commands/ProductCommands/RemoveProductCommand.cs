using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondTask.Application.Features.CQRS.Commands.ProductCommands
{
    public class RemoveProductCommand
    {
        public RemoveProductCommand(int id) 
        {
            Id = id;
        }
        public int Id { get; set; }
    }
}
