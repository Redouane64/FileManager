using System.Collections.Generic;
using FileManager.Controllers;
using FileManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Routing;

namespace FileManager.Filters
{
    public class FileResultFilter : IResultFilter
    {
        private readonly IUrlHelperFactory _urlHelperFactory;

        public FileResultFilter(IUrlHelperFactory urlHelperFactory)
        {
            _urlHelperFactory = urlHelperFactory;
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            if(context.Result is ObjectResult result && result.StatusCode == 200)
            {
                var urlHelper = _urlHelperFactory.GetUrlHelper(context);
                var files = result.Value as List<File>;

                foreach (File file in files)
                {
                    file.Location = urlHelper.Link(nameof(FilesController.GetFile), new { file.FileName });
                }
            }

            
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {

        }
    }
}
