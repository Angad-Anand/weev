using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WeevServices.Common;
using WeevServices.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeevServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        public AppDb Db { get; }
        public VehiclesController(AppDb db)
        {
            Db = db;
        }

        
        [Route("TwoWheelerData")]
        [HttpGet]
        public async Task<IActionResult> GetLatest()
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.LatestPostsAsync();
            return new OkObjectResult(result);
        }

        // GET api/TwoWheelerData/5
        [Route("TwoWheeler/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetOne(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.FindOneAsync(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [Route("TwoWheelerName/{ModelName}")]
        [HttpGet]
        public async Task<IActionResult> GetModelOne(string ModelName)
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.FindOneModelAsync(ModelName);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        [Route("TwoImagedata/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetOneImgPath(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.FindOneImgAsync(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }
        // mainimage 
        [Route("TwoMainimagedata/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetOneMainImgPath(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.FindOneMainImgAsync(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        //name of the images present
        [Route("TwoMainimagedataAll/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAllMainImgPath(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.FindAllMainImgAsync(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        [Route("TwoImageTabName/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetOneImgTabName(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new VehiclesQuery(Db);
            var result = await query.FindImgTabAsync(id);
            if (result is null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        [HttpPost("Customerenquiries")]
        public async Task<IActionResult> Customerenquiries([FromBody] Customerenquiries request)
        {
            try
            {
               await Db.Connection.OpenAsync();
                var query = new UserModel(Db);
                var result = await query.AddCustomerenquiries(request);
                if (result >= 1)
                    return Ok(new RequestStatus { Status = (int)HttpStatusCode.OK, Message = "Success", Description = null });
                else return BadRequest(new RequestStatus { Status = (int)HttpStatusCode.BadRequest, Message = "Failed", Description = "Something went wrong" });

            }
            catch (Exception ex)
            {
                return BadRequest(new RequestStatus { Status = (int)HttpStatusCode.BadRequest, Message = "Failed", Description = ex.Message });
            }

        }
    }
}
