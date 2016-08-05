using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace angularspaweb
{
    public class JsxBundleTransform : IBundleTransform
    {
        void IBundleTransform.Process(BundleContext context, BundleResponse response)
        {
            foreach (var bundle in context.BundleCollection)
            {
                if(bundle.Path.EndsWith("_jsx") == false)
                {
                    continue;
                }
                StringBuilder strAllJSX = new StringBuilder(10000);
                // Collect content of each included files
                foreach (var obj in bundle.EnumerateFiles(context))
                {
                    strAllJSX.Append(string.Format("//*** {0} Start ***\r\n", obj.VirtualFile.Name));
                    StreamReader srCSSFile = new StreamReader(obj.VirtualFile.Open());
                    strAllJSX.Append(srCSSFile.ReadToEnd());
                    srCSSFile.Close();
                    strAllJSX.Append(string.Format("//*** {0} End ***\r\n", obj.VirtualFile.Name));
                }
                // Process gathered content or
                // process indivisual file in
                // loop and finally assign it back
                response.Content = strAllJSX.ToString();
                response.ContentType = "application/javascript";
                response.Cacheability = HttpCacheability.Public;
            }
        }
    }
}