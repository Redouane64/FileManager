using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileManager.BackEnd.Models;

namespace FileManager.BackEnd.Services
{
    public interface IFilesService
    {

        IEnumerable<File> GetFiles();
    }
}
