using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OurBackend.Truffle
{
    public class TruffleContract
    {
        public string contractName { get; set; }
        public JArray abi { get; set; }
        public string bytecode { get; set; }
        public Dictionary<int, Network> networks { get; set; }
    }

    public class Network
    {
        public string address { get; set; }
        public string transactionHash { get; set; }
    }

}
