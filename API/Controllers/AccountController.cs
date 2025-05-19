using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(UserManager<AppUser> userManager) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login(LoginDTO model)
    {
        var user = await userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return BadRequest("Invalid username or password");
        }

        var result = await userManager.CheckPasswordAsync(user, model.Password);

        if (result)
        {
            return Ok(new { token = "token" });
        }

        return Unauthorized();
    }
}