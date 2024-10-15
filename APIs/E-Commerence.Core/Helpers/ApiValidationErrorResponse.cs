namespace E_Commerence.Core.Helpers
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public ApiValidationErrorResponse(IEnumerable<string> errors) : base(400)
        {
            Errors = errors;
        }

        public IEnumerable<string> Errors { get; set; }
    }
}
