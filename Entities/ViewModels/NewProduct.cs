using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Entities.ViewModels
{
    public class NewProduct
    {
        public string Name { get; set; } = null!;

        public int Price { get; set; }

        public string? Description { get; set; }

        public int Quantity { get; set; }

        public DateTime Mfd { get; set; }

        public string? Image { get; set; }
    }
}
