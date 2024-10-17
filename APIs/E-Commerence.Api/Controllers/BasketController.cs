using E_Commerence.Core.Entities;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using static E_Commerence.Core.Helpers.Router;

namespace E_Commerence.Api.Controllers
{
    [Route(BasketRouting.Prefix)]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository basketRepository;

        public BasketController(IBasketRepository basketRepository)
        {
            this.basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPut]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            return Ok(await basketRepository.UpdateBasketAsync(basket));
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await basketRepository.DeleteBasketAsync(id);
        }
    }
}
