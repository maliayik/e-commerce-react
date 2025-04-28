namespace API.DTOs;

public class CartDto
{
    public int Id { get; set; }
    public string? CustomerId { get; set; }

    public List<CartItemDto> CartItems { get; set; } = new();
}

public class CartItemDto
{
    public int ProductId { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? ImageUrl { get; set; }
}