using API.Data;
using API.DTOs;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController(DataContext context,CartService cartService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        return CartToDto(await cartService.GetOrCreate(GetCustomerId()));
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await cartService.GetOrCreate(GetCustomerId());


        var product = await context.Products.FirstOrDefaultAsync(i => i.Id == productId);

        if (product is null)
        {
            return NotFound("the product does not exist");
        }

        cart.AddItem(product, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));

        return BadRequest(new ProblemDetails { Title = "The Product can not be added to cart" });
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await cartService.GetOrCreate(GetCustomerId());

        cart.RemoveItem(productId, quantity);

        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));

        return BadRequest(new ProblemDetails { Title = "The Product can not be deleted from cart" });
    }

    /// <summary>
    /// Kart bilgilerini almak için Token içerisindeki username kullan yoksada cookie üzerindeki customerId kullan
    /// </summary>
    private string GetCustomerId()
    {
        return User.Identity?.Name ?? Request.Cookies["customerId"]!;
    }

   

    private CartDto CartToDto(Cart cart)
    {
        return new CartDto
        {
            Id = cart.Id,
            CustomerId = cart.CustomerId,
            CartItems = cart.CartItems.Select(item => new CartItemDto
            {
                ProductId = item.Product.Id,
                Name = item.Product.Name,
                Quantity = item.Quantity,
                Price = item.Product.Price,
                ImageUrl = item.Product.ImageUrl
            }).ToList()
        };
    }
}