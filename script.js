//Connexion supabase
import { supabaseClient } from "./supabase-client.js";



// Création du channel ID, ici il est null
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
const input = document.getElementById("saisie");


const currentProfileId = await IsConnected();


const btnCreerCanal = document.getElementById("btn-creer-canal");
const champNomCanal = document.getElementById("nom-canal");

btnCreerCanal.addEventListener('click', async () => {
    const nomCanal = champNomCanal.value.trim();
    if (!nomCanal) return;

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



const { data, error } = await supabaseClient.from('channel').select('*');
const listeChannels = document.getElementById('liste-channels');
let ul = document.getElementById("messages");

data.forEach(channel => {
    const div = document.createElement("div");  
    div.classList.add("channel");

    const li = document.createElement("li");
    li.classList.add("channel-name");
    li.textContent = channel?.name;
    
    const button = document.createElement("button");
    button.classList.add("channel-button");
    button.textContent = "cc";

    div.appendChild(li);
    div.appendChild(button);

    div.addEventListener("click", async () => {
        ul.innerHTML = '';
        currentChannelId = channel?.id; //on donne le channel cliqué comme channel actuel

        if(!currentChannelId) return;
        // récupérer tous les messages du channel choisi
        const {data: messages, error: errorMessages} = await supabaseClient.from("messages").select("*").eq("channel_id", currentChannelId); //ajouter limite de messages récupérés
        messages.forEach(message => {
            const li = document.createElement("li");
            li.textContent = message?.message_content;
            
            if(message?.profile_id == currentProfileId) {
                li.classList.add("message", "envoye");
            }else {
                li.classList.add("message", "recu");
            }
            ul.appendChild(li);
        });

    });

    listeChannels.append(div);
});


const btnEnvoie = document.getElementById("envoie");
const champSaisie = document.getElementById("saisie");



btnEnvoie.addEventListener('click', async () => {
    const valeur = input.value.trim();

    if (!valeur) return;

    const li = document.createElement("li");
    li.textContent = valeur;
    li.classList.add("message", "envoye");
    ul.appendChild(li);

    input.value = '';

    const { data, error } = await window.supabase.from('messages').insert([
        { message_content: valeur }
    ]);


    if (error) {
        console.error("Erreur lors de l'envoi :", error);
        // Optionnel : alerter l'utilisateur ou retirer le 'li' si l'envoi a échoué
    } else {
        console.log("Message stocké avec succès !", data);
    }

    /*pour supprimer ce qui se trouve dans l'input après chaque envoie de message*/
    champSaisie.value ='';

}) 
