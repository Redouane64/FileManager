using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FileManager.Models;
using Microsoft.Extensions.Options;
using File = FileManager.Models.File;

namespace FileManager.Services
{
    public class FilesService : IFilesService
    {
        private readonly FileManagerOptions _options;

        public FilesService(IOptionsSnapshot<FileManagerOptions> options)
        {
            _options = options.Value;
        }

        public IEnumerable<File> GetFiles()
        {
            var files = Directory.EnumerateFiles(this._options.Directory)
                                 .Select(filename => new FileInfo(filename))
                                 .Select(fileInfo => new File
                                 {
                                     Name = fileInfo.Name,
                                     Size = fileInfo.Length,
                                     LastModifiedDate = fileInfo.LastWriteTime.ToString()
                                 })
                                 .ToList();

            return files;
        }

        public async Task CreateFileAsync(File file, CancellationToken cancellationToken)
        {
            try
            {
                using (var fileStream = file.FileStream)
                using (var outFile = System.IO.File.Create(Path.Combine(_options.Directory, file.Name)))
                {
                    await fileStream.CopyToAsync(outFile, cancellationToken);
                }
            }
            catch (IOException) {
                throw;
            }
        }

        public bool TryGetFile(string filename, out File file)
        {
            var path = Path.Combine(_options.Directory, filename);
            var fileInfo = new FileInfo(path);

            if (fileInfo.Exists)
            {
                file = new File()
                {
                    Name = fileInfo.Name,
                    Size = fileInfo.Length,
                    LastModifiedDate = fileInfo.LastWriteTime.ToString(),
                    FileStream = fileInfo.OpenRead()
                };
            }
            else
                file = null;

            return fileInfo.Exists;
        }

        public bool TryDeleteFile(string filename)
        {
            var path = Path.Combine(_options.Directory, filename);
            var fileInfo = new FileInfo(path);

            if (fileInfo.Exists)
            {
                try 
                {
                    fileInfo.Delete();
                }
                catch(Exception) {
                    throw;
                }
            }

            return fileInfo.Exists;
        }

        public bool TryGetFileInfo(string filename, out File file)
        {
            var path = Path.Combine(_options.Directory, filename);
            var fileInfo = new FileInfo(path);

            if (fileInfo.Exists)
            {
                file = new File()
                {
                    Name = fileInfo.Name,
                    Size = fileInfo.Length,
                    LastModifiedDate = fileInfo.LastWriteTime.ToString(),
                    FileStream = null
                };
            }
            else
                file = null;

            return fileInfo.Exists;
        }
    }
}
