namespace API.Entity;

public class Cart
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = null!;
    public List<CartItem> CartItems { get; set; } = new(); //cart oluşturulduğunda cartItem  referansı  bellekte oluşması için nesne örneği oluşturuyoruz.
}

public class CartItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int CartId { get; set; }
    public Cart Cart { get; set; } = null!;
    public int Quantity { get; set; }
}