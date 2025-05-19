using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : IdentityDbContext<IdentityUser, AppRole, string>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new()
                {
                    Id = 1, Name = "Apple", Price = 1000, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 47
                },
                new()
                {
                    Id = 2, Name = "Samsung", Price = 900, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 50
                },
                new()
                {
                    Id = 3, Name = "Nokia", Price = 500, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 100
                },
                new()
                {
                    Id = 4, Name = "Huawei", Price = 320, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 120
                }
            }
        );
    }
}