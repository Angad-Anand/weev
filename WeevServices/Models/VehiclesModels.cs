using MySqlConnector;
using System.Data;

namespace WeevServices.Models
{
    public class VehiclesModels
    {
        
        public int Twid { get; set; }

        public string? Manufacturer { get; set; }

        public string? Model { get; set; }

        public string? Variant { get; set; }

        internal AppDb Db { get; set; }
        public VehiclesModels()
        {
        }

        internal VehiclesModels(AppDb db)
        {
            Db = db;
        }


        private void BindId(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Twid",
                DbType = DbType.Int32,
                Value = Twid,
            });
        }

        private void BindParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Manufacturer",
                DbType = DbType.String,
                Value = Manufacturer,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Model",
                DbType = DbType.String,
                Value = Model,
            });
        }
    }
}
