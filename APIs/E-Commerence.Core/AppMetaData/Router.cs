﻿namespace E_Commerence.Core.AppMetaData
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
    }
}
