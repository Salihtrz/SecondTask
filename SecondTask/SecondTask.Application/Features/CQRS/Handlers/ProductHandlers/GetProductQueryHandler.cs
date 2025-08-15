﻿using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using SecondTask.Application.Features.CQRS.Results.ProductResults;
using SecondTask.Application.Interfaces;
using SecondTask.Domain.Entities;

namespace SecondTask.Application.Features.CQRS.Handlers.ProductHandlers
{
    public class GetProductQueryHandler
    {
        private readonly IRepository<Product> _repository;
        private readonly IDistributedCache _cache;

        public GetProductQueryHandler(IRepository<Product> repository, IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }
        public async Task<List<GetProductQueryResult>> Handle()
        {
            string cacheKey = "getProductList";
            List<GetProductQueryResult> result;

            var cachedData = await _cache.GetStringAsync(cacheKey);
            if(!string.IsNullOrEmpty(cachedData))
            {
                //Console.WriteLine("CACHE HIT: Ürün listesi Redis'ten geldi.");
                result = JsonConvert.DeserializeObject<List<GetProductQueryResult>>(cachedData);
                return result;
            }

            //Console.WriteLine("CACHE MISS: Ürün listesi veritabanından çekildi.");
            var values = await _repository.GetAllAsync();
            result = values.Select(x => new GetProductQueryResult
            {
                Brand = x.Brand,
                Description = x.Description,
                ProductName = x.ProductName,
                Id = x.Id,
                Price = x.Price,
                Status = x.Status
            }).ToList();

            var serializeData = JsonConvert.SerializeObject(result);
            await _cache.SetStringAsync(cacheKey, serializeData, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(3)
            });
            return result;
        }
    }
}
