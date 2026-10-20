//Connexion supabase

    const SUPABASE_URL = "https://tzugubrpoizirgufhozn.supabase.co"; 
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dWd1YnJwb2l6aXJndWZob3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0OTY1ODEsImV4cCI6MjEwNzA3MjU4MX0.q8GrSI-3MpTeKgHSHwp8q4QcU7uA_SeYavW4uwHFJj0"; 
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentChannelId = null;
//Vérifier qu'un utilisateur est connecté 
const IsConnected = async () => {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return null; 

  // Requête vers profiles 
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error("Erreur profil :", error.message);
    return null;
  }

  // Retourne l'id du profil
  return data?.id;
};



/*fonction pour vérifier si on est entrain d'écrire*/

/*récupération du champs de saisie */
const input = document.querySelector("input");

input.addEventListener("keydown", logKey);

function logKey(e) {
  console.log('entrain d écrire...')
};


const btnCreerCanal = document.getElementById("btn-creer-canal");
const champNomCanal = document.getElementById("nom-canal");

btnCreerCanal.addEventListener('click', async () => {
    const nomCanal = champNomCanal.value.trim();
    if (!nomCanal) return;

    const currentProfileId = await IsConnected();
    if (!currentProfileId) {
        alert("Vous devez être connecté pour créer un canal !");
        return;
    }

    // création du canal
    const { data: channelData, error: channelError } = await supabaseClient
        .from('channel')
        .insert([{ name: nomCanal }])
        .select()
        .single();

    if (channelError) {
        console.error("Erreur lors de la création du canal :", channelError.message);
        return;
    }

    currentChannelId = channelData.id;
    console.log("Canal créé avec succès ! ID :", currentChannelId);

    const { error: memberError } = await supabaseClient
        .from('channel_members')
        .insert([{
            channel_id: currentChannelId,
            profile_id: currentProfileId
        }]);

    if (memberError) {
        console.error("Erreur lors de l'ajout du membre au canal :", memberError.message);
        return;
    }

    champNomCanal.value = '';
});

const ul = document.getElementById("messages");
const btnEnvoie = document.getElementById("envoie");

btnEnvoie.addEventListener('click', async () => {
    const valeur = input.value.trim();
    if (!valeur) return;


    const currentProfileId = await IsConnected();
    if (!currentProfileId) {
        alert("Vous devez être connecté pour envoyer un message !");
        return;
    }

    const { data, error } = await supabaseClient
        .from('messages')
        .insert([{ 
            message_content: valeur,
            channel_id: currentChannelId,
            profile_id: currentProfileId    
        }]);

    if (error) {
        console.error("Erreur lors de l'envoi du message :", error.message);
        return;
    }

    const li = document.createElement("li");
    li.textContent = valeur;
    li.classList.add("message", "envoye");
    ul.appendChild(li);

    // Vider le champ de saisie
    input.value = '';
});

