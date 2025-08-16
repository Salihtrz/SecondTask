﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondTask.Application.Features.CQRS.Commands.ProductCommands
{
    public class CreateProductCommand
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Brand { get; set; }
        public bool Status { get; set; }
    }
}
