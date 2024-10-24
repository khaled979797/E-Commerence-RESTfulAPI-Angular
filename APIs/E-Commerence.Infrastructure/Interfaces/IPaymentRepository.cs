using E_Commerence.Core.Entities;
using E_Commerence.Core.Entities.OrderAggregate;

namespace E_Commerence.Infrastructure.Interfaces
{
    public interface IPaymentRepository
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}
