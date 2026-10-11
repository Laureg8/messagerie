//Connexion supabase

/* const SUPABASE_URL = "https://qgtpterfnrltrmsygbrh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_X8CN-z4V1TrT3eNmq_GrmQ_nNfDNrRU";

const supabaseClient = supabase.creatClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
 */
/*fonction pour vérifier si on est entrain d'écrire*/

/*récupération du champs de saisie */
const input = document.querySelector("input");
/*récupération de l'input type submit*/
//const btnEnvoie = document.addEventListener('#envoie');

input.addEventListener("keydown", logKey);

function logKey(e) {
  console.log('entrain d écrire...')
};


const ul = document.getElementById("messages");
const btnEnvoie = document.getElementById("envoie");
const champSaisie = document.getElementById("saisie");




btnEnvoie.addEventListener('click', function(){
    const valeur = input.value
    const li = document.createElement("li");
    
    li.textContent = valeur;
    
    li.classList.add("message", "envoye");
    ul.appendChild(li);

    /*pour supprimer ce qui se trouve dans l'input après chaque envois de message*/
    champSaisie.value ='';

}) 


