using System.Collections.Generic;
using System.Threading.Tasks;
using FileManager.Controllers;
using FileManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Routing;

namespace FileManager.Filters
{
    public class FileResultFilter : IAsyncResultFilter
    {
        private readonly IUrlHelperFactory _urlHelperFactory;

        public FileResultFilter(IUrlHelperFactory urlHelperFactory)
        {
            _urlHelperFactory = urlHelperFactory;
        }

        public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
        {
            if (context.Result is ObjectResult result && result.StatusCode == 200)
            {
                var urlHelper = _urlHelperFactory.GetUrlHelper(context);

                if (result.Value is List<File> files)
                {
                    foreach (File file in files)
                    {
                        file.Location = urlHelper.Link(nameof(FilesController.GetFile), new { file.Name });
                    }
                }
                else if (result.Value is File file)
                {
                    file.Location = urlHelper.Link(nameof(FilesController.GetFile), new { file.Name });
                    if(context.HttpContext.Request.Method == "HEAD")
                    {
                        context.HttpContext.Response.Headers.Add(nameof(File.Location), file.Location);
                        context.HttpContext.Response.Headers.Add(nameof(File.LastModifiedDate), file.LastModifiedDate.ToString());
                    }
                }

            }

            await next();
        }
    }
}
