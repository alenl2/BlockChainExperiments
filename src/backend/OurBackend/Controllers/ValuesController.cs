using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OurBackend.Ef;
using OurBackend.Models;

namespace OurBackend.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        DataContext dataContext;

        public ValuesController(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }
        // GET api/values
        [HttpGet]
        public async Task<IEnumerable<Data>> Get()
        {
            return await dataContext.Data.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<Data> Get(int id)
        {
            return await dataContext.Data.SingleOrDefaultAsync((dat) => dat.Id == id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Data value)
        {
            dataContext.Add(value);
            dataContext.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var blog = dataContext.Data.SingleOrDefault((dat) => dat.Id == id);
            dataContext.Data.Remove(blog);
            dataContext.SaveChanges();
        }
    }
}
