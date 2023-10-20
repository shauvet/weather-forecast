enum WMOWWCode {
  // Clear sky
  CLEAR = 0,

  // Cloud development not observed or not observable
  CLOUD_DEVELOPMENT_NOT_OBSERVED = 1,

  // Clouds generally dissolving or becoming less developed
  CLOUDS_DISSOLVING = 2,

  // Clouds generally forming or developing
  CLOUDS_FORMING = 3,

  // Visibility reduced by smoke
  VISIBILITY_REDUCED_BY_SMOKE = 4,

  // Haze
  HAZE = 5,

  // Widespread dust in suspension in the air, visibility reduced
  WIDESPREAD_DUST = 6,

  // Duststorm or sandstorm within sight, but not at the station
  DUSTSTORM_IN_SIGHT = 7,

  // Duststorm or sandstorm at the station
  DUSTSTORM_AT_STATION = 8,

  // Blowing snow at the station
  BLOWING_SNOW = 9,

  // Fog or ice fog at a distance
  DISTANT_FOG = 10,

  // Precipitation within sight but not hitting ground
  PRECIPITATION_WITHIN_SIGHT = 11,

  // Drizzle
  DRIZZLE = 51,

  // Rain
  RAIN = 61,

  // Snow
  SNOW = 71,

  // Shower(s)
  SHOWERS = 80,

  // Thunderstorm (with or without precipitation)
  THUNDERSTORM = 91,

  // Tornado or waterspout
  TORNADO = 99,
}

export default WMOWWCode;
