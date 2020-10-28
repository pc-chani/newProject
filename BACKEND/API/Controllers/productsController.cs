﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace API.Controllers
{

    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/products")]
    public class productsController : ApiController
    {
        [Route("getProducts")]
        public IHttpActionResult getProducts()
        {
            return Ok(BL.productsBL.getProducts());
        }

        [Route("getProductsAccordingToGmhCategory"), HttpPost]
        public IHttpActionResult getProductsAccordingToGmhCategory(DTO.GMH gMH)
        {
            return Ok(BL.productsBL.getProductsAccordingToGmhCategory(gMH));
        }
        

        [Route("getProductsForGMH"), HttpPost]
        public IHttpActionResult getProductsForGMH(DTO.GMH gMH)
        {
                return Ok(BL.productsBL.getProductsForGMH(gMH));
        }
        [Route("getProduct"), HttpPost]
        public IHttpActionResult getProduct(DTO.ProductToGMH p)
        {
            return Ok(BL.productsBL.getProduct(p));
        }
        [Route("saveChange"), HttpPost]
        public IHttpActionResult saveChange(DTO.ProductToGMH p)
        {
            return Ok(BL.productsBL.saveChange(p));
        }
        [Route("add"), HttpPost]
        public IHttpActionResult add(DTO.ProductToGMH p)
        {
            //   System.Diagnostics.Debug.WriteLine(httpRequest.Params["product"]);
            return Ok(BL.productsBL.add(p));
        }
        [Route("delete"), HttpPost]
        public IHttpActionResult delete(DTO.ProductToGMH p)
        {
            return Ok(BL.productsBL.delete(p));
        }
        //trying func
        [Route("postImg"), HttpPost]

        public IHttpActionResult postImg()
        {
            var httpRequest = HttpContext.Current.Request;
            // System.Diagnostics.Debug.WriteLine(httpRequest.Params["product"]);
            var product = new JavaScriptSerializer().DeserializeObject(httpRequest.Params["product"]);
            var dictionary = (Dictionary<string, object>)product;
            DTO.ProductToGMH p=new DTO.ProductToGMH();
            p.Amount = (int?)dictionary.ElementAt(0).Value;
            p.GmhCode= (int)dictionary.ElementAt(1).Value;
            p.ProductCode= (int)dictionary.ElementAt(2).Value;
            p.FreeDescription = (string)dictionary.ElementAt(3).Value;
            p.IsDisposable= (bool)dictionary.ElementAt(4).Value;
            p.SecurityDepositAmount = (int?)dictionary.ElementAt(5).Value;
            p.Status = (string)dictionary.ElementAt(6).Value;
            string imageName = null;
            //Upload Image
            int c = httpRequest.Files.Count;
            for (int i = 0; i <c; i++)
            {
                var postedFile = httpRequest.Files["Image"+i];
                //Create custom filename
                if (postedFile != null)
                {
                    imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
                    postedFile.SaveAs(filePath);
                      p.Picture = filePath;
                }
            }
            return Ok(BL.productsBL.add(p));
        
        }
       
    }
}
