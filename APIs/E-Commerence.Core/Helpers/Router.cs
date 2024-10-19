namespace E_Commerence.Core.Helpers
{
    public static class Router
    {
        public const string SingleRoute = "/{id}";
        public const string root = "Api";
        public const string version = "V1";
        public const string Rule = root + "/" + version + "/";

        public static class ProductRouting
        {
            public const string Prefix = Rule + "Product";
            public const string List = Prefix + "/List";
            public const string GetById = Prefix + SingleRoute;
            public const string Brands = Prefix + "/Brands";
            public const string Types = Prefix + "/Types";
        }
        public static class BuggyRouting
        {
            public const string Prefix = Rule + "Buggy";
            public const string TestAuth = Prefix + "/TestAuth";
            public const string NotFound = Prefix + "/NotFound";
            public const string ServerError = Prefix + "/ServerError";
            public const string BadRequest = Prefix + "/BadRequest";
        }
        public static class BasketRouting
        {
            public const string Prefix = Rule + "Basket";
        }

        public static class UserRouting
        {
            public const string Prefix = Rule + "User";
            public const string User = Prefix + "/User";
            public const string Login = Prefix + "/Login";
            public const string Register = Prefix + "/Register";
            public const string EmailExists = Prefix + "/EmailExists";
            public const string Address = Prefix + "/Address";
            public const string EditAddress = Prefix + "/EditAddress";
        }
    }
}
