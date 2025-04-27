using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middlewares;

/// <summary>
/// Uygulama develepment modda exception hatalarını yakaladığımız middleware
/// </summary>

public class ExceptionHandling(RequestDelegate next, ILogger<ExceptionHandling> logger, IHostEnvironment environment)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;
            var response = new ProblemDetails
            {
                Status = 500,
                Detail = environment.IsDevelopment() ? e.StackTrace?.ToString() : null,
                Title = e.Message
            };
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}