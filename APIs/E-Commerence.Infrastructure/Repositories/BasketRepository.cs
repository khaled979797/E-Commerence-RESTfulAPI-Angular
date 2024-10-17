using E_Commerence.Core.Entities;
using E_Commerence.Infrastructure.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace E_Commerence.Infrastructure.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }
        public async Task<bool> DeleteBasketAsync(string id)
        {
            return await database.KeyDeleteAsync(id);
        }

        public async Task<CustomerBasket> GetBasketAsync(string id)
        {
            var data = await database.StringGetAsync(id);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var updated = await database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket),
                TimeSpan.FromDays(30));
            return updated ? await GetBasketAsync(basket.Id) : null;
        }
    }
}
