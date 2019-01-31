using System.Linq;

namespace FileManager.Helpers
{
    public static class SupportedContentTypes
    {
        public const string Text = "text/plain";

        public const string Image = "image/jpeg";

        public const string Unknown = "application/unknown";

        public static string GetContentType(string filename)
        {
            var extension = filename.Split('.').Last().ToLower();
            string contentType;

            switch (extension)
            {
                case "jpg":
                case "jpeg":
                    contentType = Image;
                    break;

                case "txt":
                    contentType = Text;
                    break;
                    
                default:
                    contentType = Unknown;
                    break;

            }

            return contentType;
        }
    }
}
