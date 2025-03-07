namespace TodoApi.Models;

public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
    public PriorityLevel Priority { get; set; }
    public CategoryType Category { get; set; }
}

public enum PriorityLevel
{
    Low,
    Medium,
    High
}

public enum CategoryType
{
    Personal,
    Work
}