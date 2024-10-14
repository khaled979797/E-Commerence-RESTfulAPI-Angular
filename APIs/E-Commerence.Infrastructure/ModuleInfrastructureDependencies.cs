﻿using E_Commerence.Infrastructure.Interfaces;
using E_Commerence.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace E_Commerence.Infrastructure
{
    public static class ModuleInfrastructureDependencies
    {
        public static IServiceCollection AddModuleInfrastructureDependencies(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
