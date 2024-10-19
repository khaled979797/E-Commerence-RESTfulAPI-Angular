using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities;
using E_Commerence.Core.Helpers;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerence.Api.Controllers
{
    [Route(Router.BasketRouting.Prefix)]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository basketRepository;
        private readonly IMapper mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            this.basketRepository = basketRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basketDto)
        {
            var basket = mapper.Map<CustomerBasket>(basketDto);
            return Ok(await basketRepository.UpdateBasketAsync(basket));
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await basketRepository.DeleteBasketAsync(id);
        }
    }
}
