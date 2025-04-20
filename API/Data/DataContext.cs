using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product
                {
                    Id = 1, Name = "Apple", Price = 1000, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 47
                },
                new Product
                {
                    Id = 2, Name = "Samsung", Price = 900, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 50
                },
                new Product
                {
                    Id = 3, Name = "Nokia", Price = 500, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 100
                },
                new Product
                {
                    Id = 4, Name = "Huawei", Price = 320, Description = "Telefon Açıklaması", ImageUrl = "1.jps",
                    IsActive = true, Stock = 120
                }
            }
        );
    }
}