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
            ViewBag.JsUIFrameworkType = "1";
            return View();
        }

        //
        // GET: /Exruleseditor/Editor2
        public ActionResult Editor2()
        {
            ViewBag.JsUIFrameworkType = "2";
            return View();
        }

        //
        // GET: /Exruleseditor/Editor3
        public ActionResult Editor3()
        {
            ViewBag.JsUIFrameworkType = "3";
            return View();
        }

    }
}
