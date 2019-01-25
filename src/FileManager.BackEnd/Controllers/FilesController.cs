using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using FileManager.BackEnd.Helpers;
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
        public ActionResult GetFile(string filename)
        {

            if(_filesService.TryGetFile(filename, out var file))
            {
                var ext = file.FileName.Split('.').Last().ToLower();
                var contentType = "application/unknown";

                if (ext == "txt") contentType = SupportedContentTypes.Text;
                else if (ext == "jpg" || ext.ToLower() == "jpeg") contentType = SupportedContentTypes.Image;

                return File(file.FileStream, contentType);
            }

            return NotFound();
        }

        // POST api/files
        [HttpPost(Name = nameof(Post))]
        public IActionResult Post(IFormFile file, CancellationToken cancellationToken = default)
        {
            
            var formFile = Request.Form.Files[0];

            var model = new File()
            {
                FileName = formFile.FileName,
                Size = formFile.Length,
                FileStream = formFile.OpenReadStream()
            };

            _filesService.CreateFile(model, cancellationToken);

            return Ok();
        }

        // DELETE api/files/<filename>
        [HttpDelete("{filename}")]
        public IActionResult Delete(string filename)
        {
            if (_filesService.TryDeleteFile(filename))
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
