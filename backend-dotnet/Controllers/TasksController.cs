using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly ConcurrentDictionary<Guid, TaskItem> _tasks = new();

        [HttpGet]
        public IActionResult GetAll() => Ok(_tasks.Values);

        [HttpPost]
        public IActionResult Create([FromBody] TaskCreateRequest request)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = request.Description,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };
            _tasks[task.Id] = task;
            return Ok(task);
        }

        [HttpPatch("{id}/toggle")]
        public IActionResult Toggle(Guid id)
        {
            if (!_tasks.TryGetValue(id, out var task))
                return NotFound();

            task.IsCompleted = !task.IsCompleted;
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _tasks.TryRemove(id, out _);
            return NoContent();
        }
    }

    public class TaskItem
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class TaskCreateRequest
    {
        public string Description { get; set; } = string.Empty;
    }
}
