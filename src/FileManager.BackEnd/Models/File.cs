using System;
using System.IO;
using Newtonsoft.Json;

namespace FileManager.BackEnd.Models
{
    public class File
    {
        public string FileName { get; set; }

        public long Size { get; set; }

        public DateTime LastModified { get; set; }

        [JsonIgnore]
        public Stream FileStream { get; set; }
    }
}
