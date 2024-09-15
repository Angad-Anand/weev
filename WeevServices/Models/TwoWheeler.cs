namespace WeevServices.Models
{
    public class TwoWheeler
    {
        internal AppDb Db { get; set; }
        public TwoWheeler()
        {
        }
        internal TwoWheeler(AppDb db)
        {
            Db = db;
        }
        public int TWId { get; set; }

        public string? Manufacturer { get; set; }

        public string? Model { get; set; }

        public string? Variant { get; set; }

        public string? VariantType { get; set; }

        public int? ExShowroomPrice { get; set; }

        public int? MaxSpeed { get; set; }

        public int? ChargingTime { get; set; }

        public string? ConditionOfVehicle { get; set; }

        public decimal? Accelration0To60kmph { get; set; }

        public decimal? Accelration0To40kmph { get; set; }

        public string? Category { get; set; }

        public string? Available { get; set; }

        public string? OfflineOronline { get; set; }

        public string? BookingSite { get; set; }

        public int? BookingPrice { get; set; }

        public decimal? ContinuousPower { get; set; }

        public decimal? MotorPower { get; set; }

        public int? RangeOfVehicle { get; set; }

        public string? BatteryType { get; set; }

        public decimal? BatteryCapacity { get; set; }

        public int? ChargingTime0To80Perc { get; set; }

        public int? ChargingTime0To100Perc { get; set; }

        public string? ChargingAtHome { get; set; }

        public int? NoOfBatteries { get; set; }

        public string? SwappableBattery { get; set; }

        public string? InstrumentConsole { get; set; }

        public string? BluetoothConnectivity { get; set; }

        public string? Navigation { get; set; }

        public string? GeoFencing { get; set; }

        public string? AntiTheftAlarm { get; set; }

        public string? UsbchargingPort { get; set; }

        public int? UnderseatStorage { get; set; }

        public string? DistanceToEmptyIndicator { get; set; }

        public decimal? ChargerOutputMin { get; set; }

        public decimal? ChargerOutputMax { get; set; }

        public string? ChargingPoint { get; set; }

        public string? FastCharging { get; set; }

        public string? FastChargingTimeUpto80Perc { get; set; }

        public string? RidingModes { get; set; }

        public string? AdditionalFeatures { get; set; }

        public string? CallOrsmsalerts { get; set; }

        public string? MusicControl { get; set; }

        public string? CentralLocking { get; set; }

        public string? CruiseControl { get; set; }

        public string? ExternalSpeakers { get; set; }

        public string? Speedometer { get; set; }

        public string? Tripmeter { get; set; }

        public string? Odometer { get; set; }

        public string? CarryHook { get; set; }

        public string? ArtificialExhaustSoundSystem { get; set; }

        public string? InternetConnectivity { get; set; }

        public string? OperatingSystem { get; set; }

        public string? Processor { get; set; }

        public string? MobileApplication { get; set; }

        public string? ChargingStationLocater { get; set; }

        public int? Gradeability { get; set; }

        public string? Clock { get; set; }

        public string? LowBatteryIndicator { get; set; }

        public string? BodyType { get; set; }

        public string? DimensionsAndCapacity { get; set; }

        public string? BootSpace { get; set; }

        public int? Width { get; set; }

        public int? Length { get; set; }

        public int? Height { get; set; }

        public int? SaddleHeight { get; set; }

        public int? GroundClearance { get; set; }

        public int? Wheelbase { get; set; }

        public decimal? KerbWeight { get; set; }

        public int? LoadCarryingCapacity { get; set; }

        public string? TurnSignalLamp { get; set; }

        public string? Drls { get; set; }

        public int? TopSpeed { get; set; }

        public string? MotorType { get; set; }

        public int? MotorWarrantyForMonths { get; set; }

        public int? MotorWarrantyForKm { get; set; }

        public string? DriveType { get; set; }

        public int? BatteryWarrantyForMonths { get; set; }

        public int? BatteryWarrantyForKm { get; set; }

        public string? WaterProofRating { get; set; }

        public string? SuspensionFront { get; set; }

        public string? SuspensionRear { get; set; }

        public string? BrakesFront { get; set; }

        public string? BrakesRear { get; set; }

        public string? TyreSize { get; set; }

        public string? WheelSize { get; set; }

        public string? WheelsType { get; set; }        

        public int? OurRating { get; set; }
        
        public string? Path { get; set; }

    }

    public class Twoimagedata
    {
        internal AppDb Db { get; set; }
        public Twoimagedata()
        {
        }
        internal Twoimagedata(AppDb db)
        {
            Db = db;
        }
        public int Id { get; set; }
        public int TW_Ref_ID { get; set; }

        public string? Path { get; set; }
        public string? Grey { get; set; }
        public string? Gray { get; set; }
        public string? White { get; set; }
        public string? Black { get; set; }
        public string? Blacklight { get; set; }
        public string? Red { get; set; }
        public string? Blue { get; set; }
        public string? Silver { get; set; }
        public string? Yellow { get; set; }
        public string? Pink { get; set; }
        public string? Green { get; set; }
        public string? Saffron { get; set; }
        public string? Orange { get; set; }
        public string? Bronze { get; set; }
    }
    public class TwoMainimagedata
    {
        internal AppDb Db { get; set; }
        public TwoMainimagedata()
        {
        }
        internal TwoMainimagedata(AppDb db)
        {
            Db = db;
        }
        public int TW_Ref_ID { get; set; }
        public string? Path { get; set; }
        public string? Image1 { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }
        public string? Image4 { get; set; }
        public string? Image5 { get; set; }
        public string? Image6 { get; set; }
        public string? Image7 { get; set; }
        public string? Image8 { get; set; }
        public string? Image9 { get; set; }
        public string? Image10 { get; set; }
        public string? Image11 { get; set; }
        public string? Image12 { get; set; }
        public string? Image13 { get; set; }
        public string? Image14 { get; set; }
        public string? Image15 { get; set; }
        public string? Image16 { get; set; }
        public string? Image17 { get; set; }
        public string? Image18 { get; set; }
        public string? Image19 { get; set; }
        public string? Image20 { get; set; }
    }



}
