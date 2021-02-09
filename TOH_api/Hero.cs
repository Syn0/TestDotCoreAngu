using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TOH
{
    [Table("Hero")]
    public class Hero
    {
        public int Id { get; set; }

        [Required]
        public string name { get; set; }

        public int XP { get; set; }
        public int XP2 { get; set; }
    }
}
