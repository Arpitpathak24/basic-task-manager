namespace BackendDotnet.Models
{
    public class TaskItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
    }
}
