using System.Collections.Generic;
using FileManager.BackEnd.Models;

namespace FileManager.BackEnd.Services
{
    public interface IFilesService
    {

        IEnumerable<File> GetFiles();
    }
}
