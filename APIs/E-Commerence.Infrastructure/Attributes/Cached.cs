using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

namespace E_Commerence.Infrastructure.Attributes
{
    public class Cached : Attribute, IAsyncActionFilter
    {
        private readonly int timeToLiveinSeconds;

        public Cached(int timeToLiveinSeconds)
        {
            this.timeToLiveinSeconds = timeToLiveinSeconds;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cacheRepository = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheRepository>();

            var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
            var cachedResponse = await cacheRepository.GetCachedResponseAsync(cacheKey);

            if (!String.IsNullOrEmpty(cachedResponse))
            {
                var contentResult = new ContentResult
                {
                    Content = cachedResponse,
                    ContentType = "application/json",
                    StatusCode = 200,
                };
                context.Result = contentResult;
                return;
            }

            var executedContext = await next();

            if (executedContext.Result is OkObjectResult okObjectResult)
            {
                await cacheRepository.CacheResponseAsync(cacheKey, okObjectResult.Value, TimeSpan.FromSeconds(timeToLiveinSeconds));
            }
        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            var stringBuilder = new StringBuilder();

            stringBuilder.Append($"{request.Path}");
            foreach (var (key, value) in request.Query.OrderBy(x => x.Key))
            {
                stringBuilder.Append($"|{key}-{value}");
            }
            return stringBuilder.ToString();
        }
    }
}
