using E_Commerence.Core.Helpers;
using E_Commerence.Infrastructure.Context;
using Microsoft.AspNetCore.Mvc;
using static E_Commerence.Core.Helpers.Router;

namespace E_Commerence.Api.Controllers
{
    [ApiController]
    public class BuggyController : BaseApiController
    {
        private readonly AppDbContext context;
        public BuggyController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet(BuggyRouting.TestAuth)]
        //[Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuff";
        }

        [HttpGet(BuggyRouting.NotFound)]
        public ActionResult GetNotFoundRequest()
        {
            var thing = context.Products.Find(42);

            if (thing == null) return NotFound(new ApiResponse(404));

            return Ok();
        }

        [HttpGet(BuggyRouting.ServerError)]
        public ActionResult GetServerError()
        {
            var thing = context.Products.Find(42);

            var thingToReturn = thing.ToString();

            return Ok();
        }

        [HttpGet(BuggyRouting.BadRequest)]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}
