using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using Server.Data;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CORSPolicy",
                    builder =>
                    {
                        builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost:4200", "https://calm-water-04859b403.azurestaticapps.net");
                    });
            });



            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(swaggerGenOptions =>
            {
                swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Angular ASP.NET Core Tutorial Web API", Version = "v1" });
            });

            var app = builder.Build();
            
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(swaggerUIOptions =>
                {
                    swaggerUIOptions.DocumentTitle = "Angular ASP.NET Core Tutorial Web API";
                    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a simple Post model.");
                    swaggerUIOptions.RoutePrefix = string.Empty;
                });
            }


            
            app.UseHttpsRedirection();
            app.UseCors("CORSPolicy");
            app.MapEndpoints();
            app.UseAuthorization();

            app.Run();
        }
    }
}
