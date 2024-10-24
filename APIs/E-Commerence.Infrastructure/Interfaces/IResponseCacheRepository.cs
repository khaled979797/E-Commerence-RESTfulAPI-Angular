namespace E_Commerence.Infrastructure.Interfaces
{
    public interface IResponseCacheRepository
    {
        Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);
        Task<string> GetCachedResponseAsync(string cacheKey);
    }
}
