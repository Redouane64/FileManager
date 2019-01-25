using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using File = FileManager.BackEnd.Models.File;

namespace FileManager.BackEnd.Services
{
    public interface IFilesService
    {

        IEnumerable<File> GetFiles();

        Task CreateFileAsync(File file, CancellationToken cancellationToken);

        bool TryGetFile(string filename, out File data);

        bool TryDeleteFile(string filename);
    }
}
