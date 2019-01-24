using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileManager.BackEnd.Models;

namespace FileManager.BackEnd.Services
{
    public class FilesService
    {
        private readonly FileManagerOptions _options;

        public FilesService(FileManagerOptions options)
        {
            _options = options;
        }
    }
}
