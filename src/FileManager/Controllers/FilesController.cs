using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FileManager.Helpers;
using FileManager.Models;
using FileManager.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.Controllers
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

                var contentType = SupportedContentTypes.GetContentType(file.Name);

                return File(file.FileStream, contentType);
            }

            return NotFound();
        }

        // POST api/files
        [HttpPost(Name = nameof(PostAsync))]
        public async Task<IActionResult> PostAsync(IFormFile file, CancellationToken cancellationToken = default)
        {
            
            var formFile = Request.Form.Files[0];

            var model = new File()
            {
                Name = formFile.FileName,
                Size = formFile.Length,
                FileStream = formFile.OpenReadStream()
            };

            await _filesService.CreateFileAsync(model, cancellationToken);

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
