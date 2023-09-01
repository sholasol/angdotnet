using System;
using Microsoft.EntityFrameworkCore;
using AngularAuthAPI.Models;

namespace AngularAuthAPI.Context
{
	public class AppDbContext: DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
		{

		}

		public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			modelBuilder.Entity<User>().ToTable("users");
        }

    }
}

