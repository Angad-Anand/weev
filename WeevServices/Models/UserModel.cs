using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using MySqlConnector;

namespace WeevServices.Models
{
    public class UserModel
    {
        public AppDb Db { get; }

        public UserModel(AppDb db)
        {
            Db = db;
        }
        
        public async Task<int> AddCustomerenquiries(Customerenquiries customers)
        {
            using var connectionString = Db.Connection;          
            MySqlCommand cmd = new MySqlCommand("InsertCustomerenquiries", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Usernames",
                DbType = DbType.String,
                Value = customers.Username,                
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Emails",
                DbType = DbType.String,
                Value = customers.Email,
               
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Mobiles",
                DbType = DbType.String,
                Value = customers.Mobile,
            });
            
            int result = await Task.Run(() => cmd.ExecuteNonQuery());            
            return result ;
        }

        public async Task<int> AddProductAsync(Customerenquiries product)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("InsertCustomerenquiries", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@Username", product.Username));
            parameter.Add(new SqlParameter("@Email", product.Email));
            parameter.Add(new SqlParameter("@Mobile", product.Mobile));

            var result = await Task.Run(() => cmd.ExecuteNonQuery());
           //.ExecuteSqlRawAsync(@"exec InsertCustomerenquiries @Username, @Email, @Mobile", parameter.ToArray())); ;

            return result;
        }
    }
}
