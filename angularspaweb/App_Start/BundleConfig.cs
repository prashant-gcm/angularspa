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

            bundles.Add(new ScriptBundle("~/bundles/flux").Include(
                        "~/Scripts3/facebook/flux/dist/flux.js").Include(
                        "~/Scripts3/facebook/flux/dist/fluxutils.js").Include(
                        "~/Scripts3/eventemitter/eventemitter.js"));

            bundles.Add(new Bundle("~/bundles/exruleseditor_jsx", new JsxBundleTransform()).Include(
                        "~/Scripts3/ruleseditorconstants.js").Include(
                        "~/Scripts3/exruleseditorcontext.js").Include(
                        "~/Scripts3/ruleseditordispatcher.js").Include(
                        "~/Scripts3/ruleseditoractions.js").Include(
                        "~/Scripts3/exruleseditorstore.js").Include(
                        "~/Scripts3/exruleseditorview.jsx").Include(
                        "~/Scripts3/exruleseditorform.jsx").Include(
                        "~/Scripts3/exruleseditor.jsx")
                        );

#if DEBUG
            BundleTable.EnableOptimizations = false;
#endif
        }
    }
}