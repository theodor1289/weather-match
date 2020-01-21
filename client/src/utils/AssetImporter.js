
function importAll(image) {
    return image.keys().map(image);
}

const atmosphere = importAll(require.context('../assets/Atmosphere/', false, /\.(png|jpe?g|svg)$/));
const clear_day = importAll(require.context('../assets/Clear/Day/', false, /\.(png|jpe?g|svg)$/));
const clouds_day = importAll(require.context('../assets/Clouds/Night/', false, /\.(png|jpe?g|svg)$/));
const clear_night = importAll(require.context('../assets/Clear/Night/', false, /\.(png|jpe?g|svg)$/));
const clouds_night = importAll(require.context('../assets/Clouds/Day/', false, /\.(png|jpe?g|svg)$/));
const rain = importAll(require.context('../assets/Rain/', false, /\.(png|jpe?g|svg)$/));
const snow = importAll(require.context('../assets/Snow/', false, /\.(png|jpe?g|svg)$/));
const thunderstorm = importAll(require.context('../assets/Thunderstorm/', false, /\.(png|jpe?g|svg)$/));

export default function getCorrectWeatherImage(weather, isDaytime) {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    switch (weather) {
        case "Clear":
            return isDaytime? clear_day[getRndInteger(0, clear_day.length - 1)] : clear_night[getRndInteger(0, clear_night.length - 1)];
        case "Clouds":
            return isDaytime? clouds_day[getRndInteger(0, clouds_day.length - 1)] : clouds_night[getRndInteger(0, clouds_night.length - 1)];
        case "Rain":
            return rain[getRndInteger(0, rain.length - 1)];
        case "Drizzle":
            return rain[getRndInteger(0, rain.length - 1)];
        case "Snow":
            return snow[getRndInteger(0, snow.length - 1)];
        case "Thunderstorm":
            return thunderstorm[getRndInteger(0, thunderstorm.length - 1)];
        default:
            return atmosphere[getRndInteger(0, atmosphere.length - 1)];
    }
}