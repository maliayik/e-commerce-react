using API.DTOs;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(UserManager<AppUser> userManager, TokenService tokenService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO model)
    {
        var user = await userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "username or password is incorrect" });
        }

        var result = await userManager.CheckPasswordAsync(user, model.Password);

        if (result)
        {
            return Ok(new UserDTO
            {
                Name = user.Name!,
                Token = await tokenService.GenerateToken(user)
            });
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<IActionResult> CreateUser(RegisterDTO model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new AppUser
        {
            Name = model.Name,
            Email = model.Email,
            UserName = model.Username,
        };

        var result = await userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, "Customer");
            return StatusCode(201);
        }

        return BadRequest(result.Errors);
    }

    [Authorize]
    [HttpGet("getuser")]
    public async Task<ActionResult<UserDTO>> GetUser()
    {
        var user = await userManager.FindByNameAsync(User.Identity?.Name!);

        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "username or password is incorrect" });
        }

        return new UserDTO
        {
            Name = user.Name!,
            Token = await tokenService.GenerateToken(user)
        };
    }
}