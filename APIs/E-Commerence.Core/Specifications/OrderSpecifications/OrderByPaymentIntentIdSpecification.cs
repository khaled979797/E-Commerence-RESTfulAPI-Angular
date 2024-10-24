using E_Commerence.Core.Entities.OrderAggregate;
using E_Commerence.Core.Specifications.Base;

namespace E_Commerence.Core.Specifications.OrderSpecifications
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId)
            : base(o => o.PaymentIntentId == paymentIntentId)
        {
        }
    }
}
