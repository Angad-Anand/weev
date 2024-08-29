using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using WeevServices.Common;
using WeevServices.Models;

namespace WeevServices.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public UserRegisteration userRegisteration = new UserRegisteration();
        public static User user = new User();
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public AppDb Db { get; }
        
        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }
        [HttpGet, Authorize]
        public ActionResult<string> GetUser()
        {
            var username = _userService.GetMyName();
            return Ok(username);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegister request)
        {
            try
            {
                CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
                userRegisteration.Fullname = request.Fullname;
                userRegisteration.Username = request.Username;
                userRegisteration.Email = request.Email;
                userRegisteration.Mobile = request.Mobile;
                userRegisteration.Password = request.Password;
                userRegisteration.IsActive = request.IsActive;
                userRegisteration.RoleName = request.RoleName;
                userRegisteration.PasswordHash = passwordHash;
                userRegisteration.PasswordSalt = passwordSalt;

                return Ok(new RequestStatus { Status = (int)HttpStatusCode.OK, Message = "Success", Description = null });
            }
            catch (Exception ex)
            {
                return BadRequest(new RequestStatus { Status = (int)HttpStatusCode.BadRequest, Message = "Failed", Description = ex.Message });
            }

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserAutToken>> Login([FromBody] UserDto request)
        {
            UserAutToken userAut = new UserAutToken();
            // when we implement User registration we will use the below code.
            //if (user.UserName!=request.Username)
            //{
            //    return BadRequest("User not Found.");
            //}
            //if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            //{
            //    return BadRequest("wrong password.");
            //}
            // string token = CreateToken(user);
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.UserName = request.Username;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            string token = CreateToken(user);
            //string refreshToken = GenerateRefreshToken();
            //SetRefreshToken(refreshToken);
            userAut.Token = token;
            return Ok(userAut);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token erpired.");
            }
            string token = CreateToken(user);
            var newrefreshToken = GenerateRefreshToken();
            SetRefreshToken(newrefreshToken);
            return Ok(token);

        }
        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Creadted = DateTime.Now
            };
            return refreshToken;
        }
        private void SetRefreshToken(RefreshToken refreshToken)
        {
            var cookieoption = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieoption);

            //user.RefreshToken = refreshToken.Token;
            //user.TokenCreadted= refreshToken.Creadted;
            //user.TokenExpires= refreshToken.Expires;
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);


            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        
    }
}
