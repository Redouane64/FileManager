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
                                 .Select(fileInfo => new File
                                 {
                                     FileName = fileInfo.Name,
                                     Size =  fileInfo.Length,
                                     LastModified = fileInfo.LastWriteTime
                                 })
                                 .ToList();

            return files;
        }

        public async Task CreateFile(File file)
        {
            using (var fileStream = file.Stream)
            using (var outFile = System.IO.File.Create(Path.Combine(_options.Directory, file.FileName)))
            {
                await fileStream.CopyToAsync(outFile);
            }
        }
    }
}
