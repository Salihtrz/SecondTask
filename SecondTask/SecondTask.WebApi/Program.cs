using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using SecondTask.Application.Features.CQRS.Handlers.ProductHandlers;
using SecondTask.Application.Features.CQRS.Handlers.UserHandlers;
using SecondTask.Application.Interfaces;
using SecondTask.Persistence.Context;
using SecondTask.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<context>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddScoped<GetProductByIdQueryHandler>();
builder.Services.AddScoped<GetProductQueryHandler>();
builder.Services.AddScoped<CreateProductCommandHandler>();
builder.Services.AddScoped<UpdateProductCommandHandler>();
builder.Services.AddScoped<RemoveProductCommandHandler>();

builder.Services.AddScoped<CreateUserCommandHandler>();
builder.Services.AddScoped<GetCheckUserQueryHandler>();
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6380";
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
