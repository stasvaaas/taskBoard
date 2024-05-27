using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;
namespace Server
{
    public static class TaskBoardEndpoints
    {
        public static void MapEndpoints(this WebApplication app)
        {

            //cards endpoint
            app.MapGet("/cards", async (AppDbContext dbContext) =>
                {
                    List<Card> allPosts = await dbContext.Cards.ToListAsync();

                    return Results.Ok(allPosts);
                });
            app.MapGet("/cards/{id}", async (Guid id, AppDbContext dbContext) =>
            {
                Card? card = await dbContext.Cards.FindAsync(id);
                if (card != null)
                {
                    return Results.Ok(card);
                }
                else
                {
                    return Results.NotFound();
                }
            });

            app.MapPost("/cards", async (CardDTO cardCreateDTO, AppDbContext dbContext) =>
            {
                Card card = new()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = cardCreateDTO.Name,
                    Description = cardCreateDTO.Description,
                    DueDate = cardCreateDTO.DueDate.Date,
                    Priority = cardCreateDTO.Priority,
                    ListId = cardCreateDTO.ListId
                };
                dbContext.Add(card);
                bool success = await dbContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return Results.Created($"/cards/{card.Id}", card);
                }
                else
                {
                    return Results.StatusCode(500);
                }
            });
            app.MapPut("/cards{id}", async (Guid id, CardDTO updatedCard, AppDbContext dbContext) =>
            {
                Card? card = await dbContext.Cards.FindAsync(id);
                if (card != null)
                {
                    card.Name = updatedCard.Name;
                    card.Description = updatedCard.Description;
                    card.DueDate = updatedCard.DueDate.Date;
                    card.Priority = updatedCard.Priority;
                }
                bool success = await dbContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return Results.Ok(card);
                }
                else
                {
                    return Results.StatusCode(500);
                }
            });
            app.MapDelete("/cards/{id}", async (Guid id, AppDbContext dbContext) =>
            {
                Card? card = await dbContext.Cards.FindAsync(id);
                if (card != null)
                {
                    dbContext.Cards.Remove(card);
                    bool success = await dbContext.SaveChangesAsync() > 0;
                    if (success)
                    {
                        return Results.NoContent();
                    }
                    else
                    {
                        return Results.StatusCode(500);
                    }
                }
                else
                {
                    return Results.NotFound();
                }
            });


            //lists endpoints

            app.MapGet("/lists", async (AppDbContext dbContext) =>
            {
                List<CardsList> allLists = await dbContext.Lists.ToListAsync();

                return Results.Ok(allLists);
            });
            app.MapGet("/lists/{id}", async (Guid id, AppDbContext dbContext) =>
            {
                CardsList? list = await dbContext.Lists.FindAsync(id);
                if (list != null)
                {
                    return Results.Ok(list);
                }
                else
                {
                    return Results.NotFound();
                }
            });

            app.MapPost("/lists", async (CardsListDTO cardCreateDTO, AppDbContext dbContext) =>
            {
                CardsList list = new()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = cardCreateDTO.Name
                };
                dbContext.Add(list);
                bool success = await dbContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return Results.Created($"/lists/{list.Id}", list);
                }
                else
                {
                    return Results.StatusCode(500);
                }
            });
            app.MapPut("/lists{id}", async (Guid id, CardsListDTO updatedList, AppDbContext dbContext) =>
            {
                CardsList? list = await dbContext.Lists.FindAsync(id);
                if (list != null)
                {
                    list.Name = updatedList.Name;
                }
                bool success = await dbContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return Results.Ok(list);
                }
                else
                {
                    return Results.StatusCode(500);
                }
            });
            app.MapDelete("/lists/{id}", async (Guid id, AppDbContext dbContext) =>
            {
                CardsList? list = await dbContext.Lists.FindAsync(id);
                if (list != null)
                {
                    dbContext.Lists.Remove(list);
                    bool success = await dbContext.SaveChangesAsync() > 0;
                    if (success)
                    {
                        return Results.NoContent();
                    }
                    else
                    {
                        return Results.StatusCode(500);
                    }
                }
                else
                {
                    return Results.NotFound();
                }
            });
        }
    }
}
