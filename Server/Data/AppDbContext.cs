using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Data.Models;


namespace Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) :base(options)
        {

        }
        
        public DbSet<Card> Cards { get; set; }
        public DbSet<CardsList> Lists { get; set; }
    }
}
