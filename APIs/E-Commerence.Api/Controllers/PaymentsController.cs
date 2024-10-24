using E_Commerence.Core.Entities;
using E_Commerence.Core.Entities.OrderAggregate;
using E_Commerence.Core.Helpers;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace E_Commerence.Api.Controllers
{

    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly string whSecret;
        private readonly IPaymentRepository paymentRepository;
        private readonly ILogger<PaymentsController> logger;
        public PaymentsController(IPaymentRepository paymentRepository, ILogger<PaymentsController> logger, IConfiguration config)
        {
            this.logger = logger;
            this.paymentRepository = paymentRepository;
            whSecret = config.GetSection("StripeSettings:WhSecret").Value;
        }

        [Authorize]
        [HttpPost(Router.PaymentRouting.CreateOrUpdate)]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await paymentRepository.CreateOrUpdatePaymentIntent(basketId);
            if (basket == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));
            return basket;
        }

        [HttpPost(Router.PaymentRouting.Webhook)]
        public async Task<ActionResult> StripeWebhook(string basketId)
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], whSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    logger.LogInformation("Payment succeeded: ", intent.Id);
                    order = await paymentRepository.UpdateOrderPaymentSucceeded(intent.Id);
                    logger.LogInformation("Order updated to payment received: ", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    logger.LogInformation("Payment failed: ", intent.Id);
                    order = await paymentRepository.UpdateOrderPaymentFailed(intent.Id);
                    logger.LogInformation("Order updated to payment failed: ", order.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}
