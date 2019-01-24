using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        // GET api/files
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            throw new NotImplementedException();
        }

        // GET api/files/<filename>
        [HttpGet("{id}")]
        public ActionResult<string> Get(string filename)
        {
            throw new NotImplementedException();
        }

        // POST api/files
        [HttpPost]
        public void Post(IFormFile file)
        {
        }

        // DELETE api/files/<filename>
        [HttpDelete("{filename}")]
        public void Delete(string filename)
        {
        }
    }
}
