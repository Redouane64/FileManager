using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using File = FileManager.Models.File;

namespace FileManager.Services
{
    public interface IFilesService
    {

        IEnumerable<File> GetFiles();

        Task CreateFileAsync(File file, CancellationToken cancellationToken);

        bool TryGetFile(string filename, out File file);

        bool TryGetFileInfo(string filename, out File file);

        bool TryDeleteFile(string filename);
    }
}
