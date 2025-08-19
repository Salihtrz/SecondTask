using Microsoft.EntityFrameworkCore;
using SecondTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondTask.Persistence.Context
{
    public class context : DbContext
    {
        public context(DbContextOptions<context> options):base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
