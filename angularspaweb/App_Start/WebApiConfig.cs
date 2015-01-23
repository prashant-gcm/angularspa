using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace angularspaweb
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "exrulesdata",
                routeTemplate: "api/{controller}/{configurationid}/{section}/{empty}",
                defaults: new { section = "exam", empty = "data" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
