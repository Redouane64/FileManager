using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileManager.BackEnd.Models
{
    public class File
    {
        public string FileName { get; set; }

        public string Extension { get; set; }

        public long Size { get; set; }

        public DateTime LastModified { get; set; }
    }
}
