import WMOWWCode from '../constants/WMOWWCode';
import * as WeatherIcons from '../components/WeatherIcons';

type WeatherIconComponent = React.ReactElement | null;

export const WeatherIcon = (
  weatherCode: WMOWWCode,
  isDay = true
): WeatherIconComponent => {
  switch (weatherCode) {
    case isDay && WMOWWCode.CLEAR:
    case isDay && WMOWWCode.CLOUD_DEVELOPMENT_NOT_OBSERVED:
      return <WeatherIcons.ClearSkyIcon />;
    case !isDay && WMOWWCode.CLEAR:
    case !isDay && WMOWWCode.CLOUD_DEVELOPMENT_NOT_OBSERVED:
      return <WeatherIcons.MoonIcon />;
    // return <WeatherIcons.CloudSunIcon />;
    case WMOWWCode.RAIN:
      return <WeatherIcons.RainIcon />;
    case WMOWWCode.CLOUDS_DISSOLVING:
    case WMOWWCode.CLOUDS_FORMING:
      return <WeatherIcons.CloudIcon />;
    default:
      return null;
  }
};
