using System.Collections.Generic;

namespace angularspaweb.Models
{
    public interface IDBContext
    {
        List<T> Select<T>(IDBSet<T> filedbset, string dataid)
            where T : class;

        void Update<T>(IDBSet<T> filedbset, string dataid, List<T> data)
            where T : class;
    }
}