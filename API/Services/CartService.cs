using API.Data;
using API.Entity;
using Microsoft.EntityFrameworkCore;


namespace API.Services;

public class CartService(DataContext context,IHttpContextAccessor httpContextAccessor)
{
    public async Task<Cart> GetOrCreate(string custId)
    {
        var cart = await context.Carts.Include(i => i.CartItems).ThenInclude(i => i.Product)
            .Where(i => i.CustomerId == custId).FirstOrDefaultAsync();
        if (cart is null)
        {
            var customerId = custId;
            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };
                httpContextAccessor.HttpContext?.Response.Cookies.Append("customerId", customerId, cookieOptions);
            }

            cart = new Cart { CustomerId = customerId };
            
            context.Carts.Add(cart);
            await context.SaveChangesAsync();
        }

        return cart;
    }
}