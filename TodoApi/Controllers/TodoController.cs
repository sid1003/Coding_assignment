using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoController(TodoContext context)
    {
        _context = context;
    }

[HttpGet]
public async Task<ActionResult<IEnumerable<Todo>>> GetTodos(
    [FromQuery] string? searchTerm = null,
    [FromQuery] string? priority = null,
    [FromQuery] string? category = null)
{
    var query = _context.Todos.AsQueryable();

    if (!string.IsNullOrEmpty(searchTerm))
    {
        query = query.Where(t => 
        (t.Title != null && t.Title.Contains(searchTerm)) || 
        (t.Description != null && t.Description.Contains(searchTerm)));
    }


    
    if (!string.IsNullOrEmpty(priority))
    {
        if (Enum.TryParse(priority, out PriorityLevel priorityEnum))
        {
            query = query.Where(t => t.Priority == priorityEnum);
        }
    }

    
    if (!string.IsNullOrEmpty(category))
    {
        if (Enum.TryParse(category, out CategoryType categoryEnum))
        {
            query = query.Where(t => t.Category == categoryEnum);
        }
    }

    return await query.ToListAsync();
}
    
    [HttpPost]
public async Task<ActionResult<Todo>> PostTodo([FromBody] Todo todo)
{
    if (todo == null)
    {
        return BadRequest(new { error = "Invalid request body." });
    }

    
    Console.WriteLine($"Received Todo: {System.Text.Json.JsonSerializer.Serialize(todo)}");

    _context.Todos.Add(todo);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
}


    


[HttpGet("{id}")]
public async Task<ActionResult<Todo>> GetTodo(int id)
{
    var todo = await _context.Todos.FindAsync(id);

    if (todo == null)
    {
        return NotFound();
    }

    return todo;
}


[HttpPut("{id}")]
public async Task<IActionResult> PutTodo(int id, Todo todo)
{
    if (id != todo.Id)
    {
        return BadRequest("ID mismatch");
    }

    _context.Entry(todo).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!TodoExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return Ok(new { message = "Updated successfully", todo });

}


[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTodo(int id)
{
    var todo = await _context.Todos.FindAsync(id);
    if (todo == null)
    {
        return NotFound();
    }

    _context.Todos.Remove(todo);
    await _context.SaveChangesAsync();

    return NoContent();
}

private bool TodoExists(int id)
{
    return _context.Todos.Any(e => e.Id == e.Id);
}
}