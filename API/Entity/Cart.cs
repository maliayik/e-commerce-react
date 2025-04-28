namespace API.Entity;

public class Cart
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = null!;

    public List<CartItem> CartItems { get; set; } =
        new(); //cart oluşturulduğunda cartItem  referansı  bellekte oluşması için nesne örneği oluşturuyoruz.

    public void AddItem(Product product, int quantity)
    {
        var item = CartItems.Where(c => c.ProductId == product.Id).FirstOrDefault();

        if (item is null)
        {
            CartItems.Add(new CartItem { Product = product, Quantity = quantity });
        }
        else
        {
            item.Quantity += quantity;
        }
    }

    public void RemoveItem(int productId, int quantity)
    {
        var item = CartItems.Where(c => c.ProductId == productId).FirstOrDefault();

        if (item is null) return;

        item.Quantity -= quantity;

        if (item.Quantity == 0)
        {
            CartItems.Remove(item);
        }
    }
}

public class CartItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int CartId { get; set; }
    public int Quantity { get; set; }
}