using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Reflection;
using System.Threading.Tasks;
using MySqlConnector;

namespace WeevServices.Models
{
    public class VehiclesQuery
    {
        public AppDb Db { get; }

        public VehiclesQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<TwoWheeler> FindOneAsync(int twId)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("GetTwowheelerdataByTWId", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = twId,
            });
            var result = await ReadAllTaskAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }

        public async Task<TwoWheeler> FindOneModelAsync(string ModelName)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("GetTwowheelerdataByModel", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@ModelName",
                DbType = DbType.String,
                Value = ModelName,
            });
            var result = await ReadAllTaskAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }
        public async Task<List<TwoWheeler>> LatestPostsAsync()
        {
            using var connectionString = Db.Connection;
            MySqlCommand command = new MySqlCommand("GetAlltwowheelerdata", connectionString);
            command.CommandType = CommandType.StoredProcedure;
            return await ReadAllTaskAsync(await command.ExecuteReaderAsync());
        }
        private async Task<List<VehiclesModels>> ReadAllAsync(DbDataReader reader)
        {           
            var posts = new List<VehiclesModels>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {

                    var post = new VehiclesModels(Db)
                    {
                        Twid = reader.GetInt32(0),
                        Manufacturer = reader.GetString(1),
                        Model = reader.GetString(2),
                        Variant = reader.GetString(3)
                    };
                    posts.Add(post);
                }
            }
            return posts;
        }
        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }
        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        private async Task<List<TwoWheeler>> ReadAllTaskAsync(DbDataReader reader)
        {
            DataTable dt = new DataTable();
            // var posts = new List<TwoWheeler>();
            dt.Load(reader);
             List<TwoWheeler> posts = new List<TwoWheeler>();
            posts = ConvertDataTable<TwoWheeler>(dt);
            return posts;
        }

        public async Task<Twoimagedata> FindOneImgAsync(int twId)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("GetTwimagedataByTWId", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = twId,
            });
            var result = await ReadAllImgTaskAsync(await cmd.ExecuteReaderAsync());
           
            return result.Count > 0 ? result[0] : null;
        }
        // mainimage 
        public async Task<TwoMainimagedata> FindOneMainImgAsync(int twId)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("GetmainimagebyTWID", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = twId,
            });
            var result = await ReadAllMainImgTaskAsync(await cmd.ExecuteReaderAsync());
           
            return result.Count > 0 ? result[0] : null;
        }

        private async Task<List<Twoimagedata>> ReadAllImgTaskAsync(DbDataReader reader)
        {
            DataTable dt = new DataTable();
            // var posts = new List<TwoWheeler>();
            dt.Load(reader);
            List<Twoimagedata> posts = new List<Twoimagedata>();
            posts = ConvertDataTable<Twoimagedata>(dt);
            return posts;
        }   
        // mainimage     
        private async Task<List<TwoMainimagedata>> ReadAllMainImgTaskAsync(DbDataReader reader)
        {
            DataTable dt = new DataTable();
            // var posts = new List<TwoWheeler>();
            dt.Load(reader);
            List<TwoMainimagedata> posts = new List<TwoMainimagedata>();
            posts = ConvertDataTable<TwoMainimagedata>(dt);
            return posts;
        }       

        public async Task<List<string>> FindImgTabAsync(int twId)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("GetTwoimageTabNameByTWId", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = twId,
            });
            var result = await ReadAllTabNameTaskAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result : null;
        }

        private async Task<List<string>> ReadAllTabNameTaskAsync(DbDataReader reader)
        {
            string tabName = string.Empty;
            while (reader.Read())
            {
                tabName = reader["ColumnNames"].ToString();
               
            }
            List<string> lstoutResult = new List<string>();
            string[] names = tabName.Split(',');
            foreach (string d in names)
            {
                lstoutResult.Add(d);  //add single day to days List
            }
            return lstoutResult;
        }

        public int AddCustomerenquiries(Customerenquiries customers)
        {
            using var connectionString = Db.Connection;
            MySqlCommand cmd = new MySqlCommand("InsertCustomerenquiries", connectionString);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Username",
                DbType = DbType.String,
                Value = customers.Username,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Email",
                DbType = DbType.String,
                Value = customers.Email,

            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Mobile",
                DbType = DbType.String,
                Value = customers.Mobile,
            });
            int result = cmd.ExecuteNonQuery();
            return result;



        }
    }
}
