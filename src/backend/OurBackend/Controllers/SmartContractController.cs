using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Util;
using Nethereum.Web3;
using Newtonsoft.Json;
using OurBackend.Truffle;

namespace OurBackend.Controllers
{
    [Route("api/[controller]")]
    public class SmartContractController : Controller
    {
        [HttpGet("ourTokenTotalSupply")]
        public async Task<string> GetOurTokenTotalSupply()
        {
            var web3 = new Web3("https://sublime-rpc.zapto.org/");
            var text = System.IO.File.ReadAllText("./contracts/OurToken.json");
            var truffleContract = JsonConvert.DeserializeObject<TruffleContract>(text);
            var contract = web3.Eth.GetContract(truffleContract.abi.ToString(Formatting.None), truffleContract.networks[3].address);

            var supply = contract.GetFunction("totalSupply");
            var val = await supply.CallAsync<BigInteger>();
            var converted = Web3.Convert.FromWei(val);
            return converted.ToString();
        }
    }
}