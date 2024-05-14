using AP.Common;
using AP.Entities.DataModels;
using AP.Entities.ViewModels;
using AP.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace AngularProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Product")]
    public class ProductController : BaseController
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context, IWebHostEnvironment environment) : base(environment)
        {
            _context = context;
        }

        [HttpGet("getProducts")]
        public ApiResponseViewModel<Product> GetAllProducts()
        {
            try
            {
                var products = _context.Products.ToList();
                return GenerateResponse.CreateResponse<Product>((int)HttpStatusCode.OK, null, null, products);
            }
            catch (Exception ex)
            {
                return GenerateResponse.CreateResponse<Product>((int)HttpStatusCode.InternalServerError, ex.Message, null, null);
            }
        }

        [HttpGet("getCartCount")]
        public ApiResponseViewModel<int?> GetCartCount(long nUserId)
        {
            try
            {
                var cartCount = _context.Carts.Where(c => c.CartId == nUserId).Sum(c => c.Quantity);
                return GenerateResponse.CreateResponse<int?>((int)HttpStatusCode.OK, null, cartCount, null);
            }
            catch (Exception ex)
            {
                return GenerateResponse.CreateResponse<int?>((int)HttpStatusCode.InternalServerError, ex.Message, 0, null);
            }
        }

        [HttpGet("addToCart")]
        public ApiResponseViewModel<string> AddToCart(long productId, long userId)
        {
            try
            {
                var userCart = _context.Carts.FirstOrDefault(c => c.CartId == userId && c.ProductId == productId);
                if (userCart != null)
                {
                    userCart.Quantity = userCart.Quantity + 1;
                    _context.SaveChanges();
                }

                //add cart
                _context.Carts.Add(new Cart()
                {
                    CartId = userId,
                    ProductId = productId,
                    Quantity = 1
                });
                _context.SaveChanges();
                return GenerateResponse.CreateResponse<string>((int)HttpStatusCode.OK, "Item added to cart", null, null);
            }
            catch (Exception ex)
            {
                return GenerateResponse.CreateResponse<string>((int)HttpStatusCode.InternalServerError, ex.Message, null, null);
            }
        }

        [HttpPost("Add")]
        public IActionResult AddProduct([FromBody] NewProduct product)
        {
            try
            {
                if (string.IsNullOrEmpty(product.Name)) return StatusCode(5001, "Missing Parameter : ProductName");
                if (product.Price == 0) return StatusCode(5001, "Missing Parameter : Price");
                Product newProduct = new Product()
                {
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    Mfd = product.Mfd,
                    Image = product.Image
                };
                _context.Products.Add(newProduct);
                _context.SaveChanges();
                // Save product to database or perform other actions
                // Example: _productRepository.Add(product);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding product: {ex.Message}");
            }
        }

        [HttpDelete("Delete")]
        public IActionResult DeleteProduct(int ProductId)
        {
            try
            {
                if(ProductId == 0) return StatusCode(500, "Invalid ProductId");
                var product = _context.Products.FirstOrDefault(x => x.ProductId == ProductId);
                if (product != null)
                {
                    _context.Products.Remove(product);
                    _context.SaveChanges();
                }
                else
                {
                    return StatusCode(500, "Invalid ProductId");
                }
                
                // Save product to database or perform other actions
                // Example: _productRepository.Add(product);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding product: {ex.Message}");
            }
        }
    }
}
