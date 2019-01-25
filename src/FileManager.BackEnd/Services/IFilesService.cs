using System.Collections.Generic;
using System.Threading.Tasks;
using FileManager.BackEnd.Models;

namespace FileManager.BackEnd.Services
{
    public interface IFilesService
    {

        IEnumerable<File> GetFiles();

        Task CreateFile(File file);
    }
}
