using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace angularspaweb.Controllers
{
    public class ExrulesEditorController : Controller
    {
        //
        // GET: /Exruleseditor/
        public ActionResult Editor()
        {
            ViewBag.AngularVersion = "1";
            return View();
        }

        //
        // GET: /Exruleseditor/Editor2
        public ActionResult Editor2()
        {
            ViewBag.AngularVersion = "2";
            return View();
        }

    }
}
