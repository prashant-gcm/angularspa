using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace angularspaweb.Models
{
    public class FileDBContext : IDBContext
    {
        private string __app_data_folder_path = "";

        private string App_data_folder_path
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    __app_data_folder_path = HttpContext.Current.Server.MapPath("~/App_Data");
                }
                else
                {
                    __app_data_folder_path = @"D:\Prashant\net4\ASP.net4\angular\angularspa\angularspaweb\App_Data";
                }
                return __app_data_folder_path;
            }
        }

        public List<T> Select<T>(IDBSet<T> filedbset, string dataid)
            where T : class
        {
            filedbset.DataId = dataid;
            string filename = Path.Combine(App_data_folder_path, filedbset.StoreName);

            XmlSerializer serializer = new XmlSerializer(typeof(List<T>));

            List<T> data = null;
            using (FileStream filestream = new FileStream(filename, FileMode.Open))
            {
                data = (List<T>)serializer.Deserialize(filestream);
            }

            return data;
        }

        public void Update<T>(IDBSet<T> filedbset, string dataid, List<T> data)
            where T : class
        {
            filedbset.DataId = dataid;
            string filename = Path.Combine(App_data_folder_path, filedbset.StoreName);

            XmlSerializer serializer = new XmlSerializer(typeof(List<T>));

            using (FileStream filestream = new FileStream(filename, FileMode.Create))
            {
                serializer.Serialize(filestream, data);
            }
        }
    }

    public class FileDBSet<T> : IDBSet<T> where T : class
    {
        private string __DBFileName = "";

        public FileDBSet()
        {
            __DBFileName = typeof(T).Name;
        }

        public string DataId { get; set; }

        public string StoreName
        {
            get
            {
                return DataId + "_" + __DBFileName + ".xml";
            }
        }
    }
}