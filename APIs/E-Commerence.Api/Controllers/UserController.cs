using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities.Identity;
using E_Commerence.Core.Helpers;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static E_Commerence.Core.Helpers.Router;

namespace E_Commerence.Api.Controllers
{
    [ApiController]
    public class UserController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenRepository tokenRepository;
        private readonly IMapper mapper;

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenRepository tokenRepository, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenRepository = tokenRepository;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpGet(UserRouting.User)]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindUserByClaimsPrincipalAsync(HttpContext.User);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenRepository.CreateToken(user)
            };
        }

        [HttpGet(UserRouting.EmailExists)]
        public async Task<ActionResult<bool>> EmailExists([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet(UserRouting.Address)]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {
            var user = await userManager.FindUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
            return mapper.Map<AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut(UserRouting.EditAddress)]
        public async Task<ActionResult<AddressDto>> EditAddress(AddressDto addressDto)
        {
            var user = await userManager.FindUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
            user.Address = mapper.Map<Address>(addressDto);
            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem While Updating The User Address");
            return mapper.Map<AddressDto>(user.Address);
        }

        [HttpPost(UserRouting.Login)]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiResponse(401));
            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenRepository.CreateToken(user)
            };
        }

        [HttpPost(UserRouting.Register)]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (EmailExists(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse(new[] { "Email Address is is Use" }));
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenRepository.CreateToken(user)
            };
        }
    }
}
