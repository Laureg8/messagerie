
//appel de l'API météo, la longitude/ latitude de Chicoutimi et les paramétres météorologique que l'on prend en compte
const url = 'https://api.open-meteo.com/v1/forecast?latitude=48.4284&longitude=-71.0621&current=weather_code'


const getWeather = (temp_code) => {
  if (temp_code === 0 ||temp_code === 1 ) return 'soleil' 
  if (temp_code >= 71 && temp_code <= 75) return 'neige'
  if (temp_code >= 61 && temp_code <= 67) return 'pluie'
    
    return 'soleil' 
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
  } catch (erreur) {
    console.error(erreur.message);
  }
}

getData();

