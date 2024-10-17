namespace E_Commerence.Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
            Items = new HashSet<BasketItem>();
        }
        public CustomerBasket(string id)
        {
            Id = id;
            Items = new HashSet<BasketItem>();
        }
        public string Id { get; set; }
        public ICollection<BasketItem> Items { get; set; }
    }
}
