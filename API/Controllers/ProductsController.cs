using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(DataContext dataContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await dataContext.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int? id)
    {
        if(id == null) return NotFound();
        var products = await dataContext.Products.ToListAsync();

        if (!products.Any(x => x.Id == id))
        {
            return NotFound();
        }
        
        var product = await dataContext.Products.FindAsync(id);
        return Ok(product);
    }
}