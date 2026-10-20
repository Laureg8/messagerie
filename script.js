//Connexion supabase

const SUPABASE_URL = "https://qgtpterfnrltrmsygbrh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_X8CN-z4V1TrT3eNmq_GrmQ_nNfDNrRU";

const supabaseClient = supabase.creatClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


//Vérifier qu'un utilisateur est connecté 
const IsConnected = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null; 

  //requête vers profiles
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  // retourne l'id de l'utilisateur actuellement connecté 
  return profile?.id;
};



/*fonction pour vérifier si on est entrain d'écrire*/

/*récupération du champs de saisie */
const input = document.querySelector("input");

input.addEventListener("keydown", logKey);

function logKey(e) {
  console.log('entrain d écrire...')
};


const ul = document.getElementById("messages");
const btnEnvoie = document.getElementById("envoie");




btnEnvoie.addEventListener('click', async() =>{
    const valeur = input.value
    const li = document.createElement("li");
    
    li.textContent = valeur;

    const { data, error  } = await supabaseClient
    .from('messages')
    .insert([{ 
        message_content : valeur,
        channel_id: currentChannelId,
        profile_id: IsConnected     
    }]);
    
    li.classList.add("message", "envoye");
    ul.appendChild(li);

    /*pour supprimer ce qui se trouve dans l'input après chaque envois de message*/
    input.value ='';

}) 


