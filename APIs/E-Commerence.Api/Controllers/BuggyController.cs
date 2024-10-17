using E_Commerence.Core.Helpers;
using E_Commerence.Infrastructure.Context;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet(Router.BuggyRouting.TestAuth)]
        //[Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuff";
        }

        [HttpGet(Router.BuggyRouting.NotFound)]
        public ActionResult GetNotFoundRequest()
        {
            var thing = context.Products.Find(42);

            if (thing == null) return NotFound(new ApiResponse(404));

            return Ok();
        }

        [HttpGet(Router.BuggyRouting.ServerError)]
        public ActionResult GetServerError()
        {
            var thing = context.Products.Find(42);

            var thingToReturn = thing.ToString();

            return Ok();
        }

        [HttpGet(Router.BuggyRouting.BadRequest)]
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
