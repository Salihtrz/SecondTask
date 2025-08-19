using Microsoft.AspNetCore.Mvc;
using SecondTask.Dto.ProductDtos;
using System.Text.Json;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace SecondTask.WebUI.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<ProductController> _logger;

        public ProductController(IHttpClientFactory httpClientFactory, ILogger<ProductController> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }
        [HttpGet]
        public IActionResult Test()
        {
            throw new Exception("Hata Mesajı");
        }
        [HttpGet]
        public async Task<IActionResult> Index(ResultProductDto resultProductDto)
        {
            _logger.LogInformation("Products Listed:" + DateTime.Now);
            var username = User.FindFirst("Username")?.Value;
            ViewBag.Username = username;
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync("https://localhost:7109/api/Product");
            if (responseMessage.IsSuccessStatusCode)
            {
                var jsonData = await responseMessage.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<List<ResultProductDto>>(jsonData);
                return View(values);
            }
            else
            {
                return View();
            }
        }
        [HttpGet]
        public async Task<IActionResult> ProductDetails(int id)
        {
            _logger.LogInformation("Product Listed:" + DateTime.Now);
            var username = User.FindFirst("Username")?.Value;
            ViewBag.Username = username;
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync("https://localhost:7109/api/Product/" + id);
            if (responseMessage.IsSuccessStatusCode)
            {
                var jsonData = await responseMessage.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<GetProductDto>(jsonData);
                return View(values);
            }
            else
            {
                return View();
            }
        }
        [HttpGet]
        public IActionResult CreateProduct()
        {
            var username = User.FindFirst("Username")?.Value;
            ViewBag.Username = username;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDto createProductDto)
        {
            _logger.LogInformation("Product Created:" + DateTime.Now);
            createProductDto.Status = true;
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createProductDto);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PostAsync("https://localhost:7109/api/Product", content);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "Product");
            }
            else
            {
                return View();
            }
        }
        [HttpGet]
        public async Task<IActionResult> UpdateProduct(int id)
        {
            var username = User.FindFirst("Username")?.Value;
            ViewBag.Username = username;
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync("https://localhost:7109/api/Product/" + id);
            if (responseMessage.IsSuccessStatusCode)
            {
                var jsonData = await responseMessage.Content.ReadAsStringAsync();
                var value = JsonConvert.DeserializeObject<UpdateProductDto>(jsonData);
                return View(value);
            }
            else
            {
                return View();
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateProduct(UpdateProductDto updateProductDto)
        {
            _logger.LogInformation("Product Updated:" + DateTime.Now);
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(updateProductDto);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PutAsync("https://localhost:7109/api/Product", content);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "Product");
            }
            else
            {
                return View();
            }
        }
        public async Task<IActionResult> DeleteProduct(int id)
        {
            _logger.LogInformation("Product Deleted:" + DateTime.Now);
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.DeleteAsync("https://localhost:7109/api/Product/" + id);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "Product");
            }
            else
            {
                return View();
            }
        }
    }
}
