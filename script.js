/* const email = document.querySelector('#email'); 

const emailMessage = document.querySelector('#email-message');

email.addEventListener('input', function(event){
    const valeur = email.value

    const arobase = valeur.includes('@');

    console.log(valeur);


    emailMessage.textContent = valeur;

    if (valeur === ""){
        emailMessage.textContent = "le couriel est obligatoire";
    }else if (!arobase){
        emailMessage.textContent = "le couriel est invalide";

    }else{
        emailMessage.textContent = "youhou";
    }
}); */


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




btnEnvoie.addEventListener('click', function(){
    const valeur = input.value
    const li = document.createElement("li");
    
    li.textContent = valeur;
    
    ul.appendChild(li);
}) 


