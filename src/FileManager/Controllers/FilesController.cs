using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FileManager.Helpers;
using FileManager.Models;
using FileManager.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace FileManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFilesService _filesService;
        private readonly IUrlHelperFactory _urlHelperFactory;

        public FilesController(IFilesService filesService, IUrlHelperFactory urlHelperFactory)
        {
            _filesService = filesService;
            _urlHelperFactory = urlHelperFactory;
        }

        // GET api/files
        [HttpGet(Name = nameof(GetFiles))]
        public ActionResult<IEnumerable<File>> GetFiles()
        {
            return Ok(_filesService.GetFiles());
        }

        // GET api/files/<filename>
        [HttpGet("{name}", Name = nameof(GetFile))]
        [HttpHead("{name}", Name = nameof(GetFile))]
        public ActionResult GetFile(string name)
        {

            if(_filesService.TryGetFile(name, out var file))
            {
                Response.Headers.Add("location", file.Location);
                var contentType = SupportedContentTypes.GetContentType(file.Name);

                return File(file.FileStream, contentType);
            }

            return NotFound();
        }

        [HttpGet("peek/{name}", Name = nameof(PeekFile))]
        [HttpHead("peek/{name}", Name = nameof(PeekFile))]
        public ActionResult PeekFile(string name)
        {
            if(_filesService.TryGetFileInfo(name, out var file))
            {
                return Ok(file);
            }

            return NotFound();
        }

        // POST api/files
        [HttpPost(Name = nameof(PostAsync))]
        public async Task<IActionResult> PostAsync(IFormFile file, CancellationToken cancellationToken = default)
        {
            
            var formFile = Request.Form.Files[0];
            var urlHelper = _urlHelperFactory.GetUrlHelper(ControllerContext);

            var model = new File()
            {
                Name = formFile.FileName,
                Size = formFile.Length,
                FileStream = formFile.OpenReadStream(),
                Location = urlHelper.Link(nameof(FilesController.GetFile), new { formFile.FileName })
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
