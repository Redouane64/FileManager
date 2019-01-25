using System;

namespace FileManager.BackEnd.Models
{
    public class File
    {
        public string FileName { get; set; }

        public long Size { get; set; }

        public DateTime LastModified { get; set; }
    }
}
