using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace angularspaweb
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.js").Include(
                        "~/Scripts/angular-route.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/exruleseditor").Include(
                        "~/Scripts/exruleseditor.js"));
        }
    }
}