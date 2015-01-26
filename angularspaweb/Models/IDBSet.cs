namespace angularspaweb.Models
{
    public interface IDBSet<T> where T : class
    {
        string DataId { get; set; }
        string StoreName { get; }
    }
}