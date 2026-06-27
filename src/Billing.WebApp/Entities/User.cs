using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Billing.WebApp.Entities
{
    public class User : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public ICollection<UserRole> UserRoles { get; set; }
    }
}