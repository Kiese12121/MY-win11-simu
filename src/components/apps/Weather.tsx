import { Cloud, CloudRain, CloudSun, Sun, Wind, Droplets, Thermometer } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';

export default function Weather() {
  const { language } = useWindows();

  const t = ({
    pt: {
      location: 'Londres, Reino Unido',
      day: 'Segunda-feira, 7 de Abril de 2026',
      condition: 'Parcialmente Nublado',
      wind: 'Velocidade do Vento',
      humidity: 'Umidade',
      feelsLike: 'Sensação Térmica',
      forecast: 'Previsão de 7 Dias',
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    },
    en: {
      location: 'London, UK',
      day: 'Monday, 7 April 2026',
      condition: 'Partly Cloudy',
      wind: 'Wind Speed',
      humidity: 'Humidity',
      feelsLike: 'Feels Like',
      forecast: '7-Day Forecast',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    es: {
      location: 'Londres, Reino Unido',
      day: 'Lunes, 7 de abril de 2026',
      condition: 'Parcialmente nublado',
      wind: 'Velocidad del viento',
      humidity: 'Humedad',
      feelsLike: 'Sensación térmica',
      forecast: 'Pronóstico de 7 días',
      days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    },
    fr: {
      location: 'Londres, Royaume-Uni',
      day: 'Lundi 7 avril 2026',
      condition: 'Partiellement nuageux',
      wind: 'Vitesse du vent',
      humidity: 'Humidité',
      feelsLike: 'Ressenti',
      forecast: 'Prévisions sur 7 jours',
      days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    },
    it: {
      location: 'Londra, Regno Unito',
      day: 'Lunedì 7 aprile 2026',
      condition: 'Parzialmente nuvoloso',
      wind: 'Velocità del vento',
      humidity: 'Umidità',
      feelsLike: 'Percepita',
      forecast: 'Previsioni per 7 giorni',
      days: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
    },
    de: {
      location: 'London, Vereinigtes Königreich',
      day: 'Montag, 7. April 2026',
      condition: 'Teilweise bewölkt',
      wind: 'Windgeschwindigkeit',
      humidity: 'Luftfeuchtigkeit',
      feelsLike: 'Gefühlt',
      forecast: '7-Tage-Vorhersage',
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    },
    nl: {
      location: 'Londen, Verenigd Koninkrijk',
      day: 'Maandag 7 april 2026',
      condition: 'Gedeeltelijk bewolkt',
      wind: 'Windsnelheid',
      humidity: 'Luchtvochtigheid',
      feelsLike: 'Gevoelstemperatuur',
      forecast: '7-daagse voorspelling',
      days: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
    },
    zh: {
      location: '伦敦，英国',
      day: '2026年4月7日 星期一',
      condition: '局部多云',
      wind: '风速',
      humidity: '湿度',
      feelsLike: '体感温度',
      forecast: '7天预报',
      days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    location: 'Londres, Reino Unido',
    day: 'Segunda-feira, 7 de Abril de 2026',
    condition: 'Parcialmente Nublado',
    wind: 'Velocidade do Vento',
    humidity: 'Umidade',
    feelsLike: 'Sensação Térmica',
    forecast: 'Previsão de 7 Dias',
    days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  } : {
    location: 'London, UK',
    day: 'Monday, 7 April 2026',
    condition: 'Partly Cloudy',
    wind: 'Wind Speed',
    humidity: 'Humidity',
    feelsLike: 'Feels Like',
    forecast: '7-Day Forecast',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  });

  const forecast = [
    { day: t.days[0], temp: 22, icon: <CloudSun className="text-yellow-400" /> },
    { day: t.days[1], temp: 24, icon: <Sun className="text-yellow-500" /> },
    { day: t.days[2], temp: 19, icon: <CloudRain className="text-blue-400" /> },
    { day: t.days[3], temp: 21, icon: <Cloud className="text-gray-400" /> },
    { day: t.days[4], temp: 23, icon: <Sun className="text-yellow-500" /> },
    { day: t.days[5], temp: 25, icon: <Sun className="text-yellow-600" /> },
    { day: t.days[6], temp: 22, icon: <CloudSun className="text-yellow-400" /> },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-light mb-2">{t.location}</h1>
            <p className="text-lg opacity-80">{t.day}</p>
          </div>
          <div className="text-right">
            <div className="text-7xl font-thin mb-2">22°C</div>
            <p className="text-xl opacity-80">{t.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4">
            <Wind className="text-blue-200" />
            <div>
              <p className="text-sm opacity-60">{t.wind}</p>
              <p className="text-xl font-semibold">12 km/h</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4">
            <Droplets className="text-blue-200" />
            <div>
              <p className="text-sm opacity-60">{t.humidity}</p>
              <p className="text-xl font-semibold">45%</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4">
            <Thermometer className="text-blue-200" />
            <div>
              <p className="text-sm opacity-60">{t.feelsLike}</p>
              <p className="text-xl font-semibold">24°C</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">{t.forecast}</h2>
          <div className="flex justify-between items-center overflow-x-auto gap-8 pb-4">
            {forecast.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[60px]">
                <p className="text-sm opacity-60">{item.day}</p>
                <div className="text-2xl">{item.icon}</div>
                <p className="text-lg font-semibold">{item.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
