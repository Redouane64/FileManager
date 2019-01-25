using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FileManager.BackEnd.Models;
using Microsoft.Extensions.Options;
using File = FileManager.BackEnd.Models.File;

namespace FileManager.BackEnd.Services
{
    public class FilesService : IFilesService
    {
        private readonly FileManagerOptions _options;

        public FilesService(IOptions<FileManagerOptions> options)
        {
            _options = options.Value;
        }

        public IEnumerable<File> GetFiles()
        {
            var files = Directory.EnumerateFiles(this._options.Directory)
                                 .Select(filename => new FileInfo(filename))
                                 .Select(file => new File
                                 {
                                     FileName = file.Name,
                                     Extension = file.Extension,
                                     Size =  file.Length,
                                     LastModified = file.LastWriteTime
                                 })
                                 .ToList();

            return files;
        }
    }
}
