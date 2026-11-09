
//appel de l'API météo, la longitude/ latitude de Chicoutimi et les paramétres météorologique que l'on prend en compte
const url = 'https://api.open-meteo.com/v1/forecast?latitude=48.4284&longitude=-71.0621&current=weather_code'


var getWeather = (temp_code) => {
  if (temp_code === 0 ||temp_code === 1 ) return 'soleil' 
  if (temp_code === 2 || temp_code === 3) return 'pluie'
  if ((temp_code >= 71 && temp_code <= 77) || temp_code === 85 || temp_code === 86) return 'neige'
  if ((temp_code >= 51 && temp_code <= 67)|| 
    (temp_code >= 80 && temp_code <= 82) || 
    (temp_code >= 95 && temp_code <= 99) ||
    temp_code === 45 || temp_code === 48)
    {
     return 'pluie'
    }
    
    return 'soleil' 
}

function appliquerTheme(theme){
  const body = document.body;
  body.classList.remove('soleil', 'pluie', 'neige');
  body.classList.add(theme);
}

async function getData() {
  try {
    const reponse = await fetch(url);


    const resultat = await reponse.json();

    //récupération du code météo actuel (current vient de l'API Open meteo)
    const codeMeteo = resultat.current.weather_code;
    const temps = getWeather(codeMeteo);

    console.log("Code météo :", codeMeteo);
    console.log("Temps actuel :", temps);

    appliquerTheme(temps);
  } catch (erreur) {
    console.error(erreur.message);
  }
}

getData();
