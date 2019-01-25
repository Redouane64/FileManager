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
        [HttpGet]
        public ActionResult<IEnumerable<File>> Get()
        {
            return Ok(_filesService.GetFiles());
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
