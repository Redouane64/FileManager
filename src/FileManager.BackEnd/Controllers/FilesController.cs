using System;
using System.Collections.Generic;
using FileManager.BackEnd.Models;
using FileManager.BackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFilesService _filesService;

        public FilesController(IFilesService filesService)
        {
            _filesService = filesService;
        }

        // GET api/files
        [HttpGet(Name = nameof(GetFiles))]
        public ActionResult<IEnumerable<File>> GetFiles()
        {
            return Ok(_filesService.GetFiles());
        }

        // GET api/files/<filename>
        [HttpGet("{filename}", Name = nameof(GetFile))]
        public ActionResult<string> GetFile(string filename)
        {
            // TODO:
            throw new NotImplementedException();
        }

        // POST api/files
        [HttpPost(Name = nameof(Post))]
        public IActionResult Post(IFormFile file)
        {
            
            var formFile = Request.Form.Files[0];

            var model = new File()
            {
                FileName = formFile.FileName,
                Size = formFile.Length,
                Stream = formFile.OpenReadStream()
            };

            _filesService.CreateFile(model);

            return Ok();
        }

        // DELETE api/files/<filename>
        [HttpDelete("{filename}")]
        public void Delete(string filename)
        {
            // TODO: 
        }
    }
}
