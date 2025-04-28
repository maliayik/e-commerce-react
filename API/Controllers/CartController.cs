using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Http.HttpResults;
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
        var cart = await GetOrCreate();
        return Ok(cart);
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreate();


        var product = await context.Products.FirstOrDefaultAsync(i => i.Id == productId);

        if (product is null)
        {
            return NotFound("the product does not exist");
        }

        cart.AddItem(product, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetCart), cart);

        return BadRequest(new ProblemDetails { Title = "The Product can not be added to cart" });
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreate();

        cart.RemoveItem(productId, quantity);

        var result = await context.SaveChangesAsync() > 0;
        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "The Product can not be deleted from cart" });
    }


    private async Task<Cart> GetOrCreate()
    {
        var cart = await context.Carts.Include(i => i.CartItems).ThenInclude(i => i.Product)
            .Where(i => i.CustomerId == Request.Cookies["customerId"]).FirstOrDefaultAsync();
        if (cart is null)
        {
            var customerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddMonths(1),
                IsEssential = true
            };
            Response.Cookies.Append("customerId", customerId, cookieOptions);
            cart = new Cart { CustomerId = customerId };
            context.Carts.Add(cart);
            await context.SaveChangesAsync();
        }

        return cart;
    }
}