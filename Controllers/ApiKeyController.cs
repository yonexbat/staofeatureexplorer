using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace staofeatureexplorer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class ApiKeyController : ControllerBase
    {      

        private readonly ILogger<ApiKeyController> _logger;
        private readonly IConfiguration _configuration;

        public ApiKeyController(ILogger<ApiKeyController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<string> Get()
        {
            string apiKey = _configuration["GoogleMapsApiKey"];
            return apiKey;
        }
    }
}
