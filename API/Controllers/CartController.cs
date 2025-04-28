using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController(DataContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Cart>> GetCart()
    {
        var cart = await context.Carts.Include(i => i.CartItems).ThenInclude(i => i.Product)
            .Where(i => i.CustomerId == Request.Cookies["customerId"]).FirstOrDefaultAsync();

        if (cart is null)
        {
            return NotFound();
        }

        return Ok(cart);
    }
}