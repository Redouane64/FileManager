using FileManager.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FileManager.Filters
{
    public class ApiExceptionFilter : IExceptionFilter
    {
        private readonly IHostingEnvironment env;

        public ApiExceptionFilter(IHostingEnvironment env)
        {
            this.env = env;
        }
        
        public void OnException(ExceptionContext context)
        {
            var error = new ApiError();

            if(env.IsDevelopment()) {
                error.Message = context.Exception.Message;
                error.Details = context.Exception.StackTrace;
            }
            else {
                error.Message = "Something went wrong in the server.";
                error.Details = context.Exception.Message;
            }

            context.Result = new ObjectResult(error) { StatusCode = 500 };
        }
    }
}
