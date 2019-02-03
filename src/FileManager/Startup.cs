using FileManager.Filters;
using FileManager.Models;
using FileManager.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FileManager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add<FileResultFilter>();

            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddResponseCompression(options => {
                options.Providers.Add<GzipCompressionProvider>();
            });
            services.AddResponseCaching();

            services.Configure<GzipCompressionProviderOptions>(options => {
                options.Level = System.IO.Compression.CompressionLevel.Fastest;
            });

            services.Configure<FileManagerOptions>(Configuration.GetSection("FileManager"));
            services.AddScoped<IFilesService, FilesService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseResponseCompression();
            app.UseResponseCaching();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            
            app.UseMvc();
        }
    }
}
