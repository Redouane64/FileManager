using System;
using System.IO;
using Newtonsoft.Json;

namespace FileManager.Models
{
    public class File
    {
        public string FileName { get; set; }

        public long Size { get; set; }

        public DateTime LastModified { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Location { get; set; }

        [JsonIgnore]
        public Stream FileStream { get; set; }
    }
}
