//Copyright 2017 (c) SmartIT. All rights reserved.  
//By John Kocer  
// This file is for Swagger test, this application does not use this file  
using OurBackend.Models;  
using Microsoft.EntityFrameworkCore;  
  
namespace OurBackend.Ef  
{  
  public class DataContext : DbContext  
  {  
    public DataContext(DbContextOptions<DataContext> options) : base(options){}  
  
    public DbSet<Data> Data { get; set; }  
  }  
}  