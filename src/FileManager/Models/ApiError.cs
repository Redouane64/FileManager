using Newtonsoft.Json;

namespace FileManager.Models
{
    public class ApiError
    {
        public string Message { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Details { get; set; }
    }
}
