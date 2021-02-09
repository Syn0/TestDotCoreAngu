using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TOH;

namespace TOH.Data
{
    public class TOHContext : DbContext
    {
        public TOHContext (DbContextOptions<TOHContext> options)
            : base(options)
        {
        }

        public DbSet<TOH.Hero> Hero { get; set; }
    }
}
