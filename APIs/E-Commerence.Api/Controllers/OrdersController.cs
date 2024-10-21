using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities.OrderAggregate;
using E_Commerence.Core.Helpers;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerence.Api.Controllers
{
    [Authorize]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository orderRepository;
        private readonly IMapper mapper;

        public OrdersController(IOrderRepository orderRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.mapper = mapper;
        }

        [HttpPost(Router.OrderRouting.CreateOrder)]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = User.RetrieveEamilFromPrincipal();

            var address = mapper.Map<Address>(orderDto.ShipToAddress);

            var order = await orderRepository.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem Creating Order"));

            return Ok(order);
        }

        [HttpGet(Router.OrderRouting.GetOrders)]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = User.RetrieveEamilFromPrincipal();
            var orders = await orderRepository.GetOrdersForUserAsync(email);
            return Ok(mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet(Router.OrderRouting.GetOrderById)]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = User.RetrieveEamilFromPrincipal();
            var orders = await orderRepository.GetOrderByIdAsync(id, email);
            return Ok(mapper.Map<OrderToReturnDto>(orders));
        }

        [HttpGet(Router.OrderRouting.GetDeliveryMethods)]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await orderRepository.GetDeliveryMethodsAsync());
        }
    }
}
