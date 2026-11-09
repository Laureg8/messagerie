# 🌟 Star Messages

**Star Messages** est une messagerie instantanée utilisable sur ordinateur et téléphone. Dessus on peut créer et rejoindre des groupes de discussion afin de pouvoir parler avec d'autres personnes en temps réel.
La particularité du site c'est que le thème de la page de discussion change en fonction de la météo de Chicoutimi, grâce à l'API open-meteo qui permet de récupérer les informations de la météo d'un lieu grâce à des codes qui correspondent à une météo.
Pour assurer la connexion et l'envoi de messages, l'application utilise Supabase qui permet de s'inscrire, se connecter, envoyer des messages et créer des canaux de discussion.

---

## Fonctionnalités

- **Messagerie par canaux** : Créez et rejoignez différents salons de discussion.
- **Interface dynamique** : Envoi et réception de messages dans une interface claire avec défilement fluide.
- **Météo intégrée** : Consultation des données météorologiques directes via l'API Open-Meteo.

---

## Technologies utilisées

- **HTML** & **CSS** 
- **JavaScript**
- **API Open-Meteo** 

---

# Structure du projet

├── src/                    # Dossier des ressources (images, icônes)
├── style/                  # Dossier des feuilles de style CSS
│   ├── index.css
│   ├── inscription.css
│   ├── login.css
│   ├── meteo.css
│   └── style.css
├── discussion.html         # Page de la messagerie
├── index.html              # Page d'accueil
├── login.html              # Page de connexion
├── meteo.js                # Appel API météo
├── README.md               # Documentation du projet
├── script.js               # Logique principale de l'application
├── signin.html             # Page d'inscription
└── supabase-client.js      # Configuration et client Supabase

- **Lien** : https://laureg8.github.io/messagerie/
- **Lien Figma** : https://www.figma.com/design/6wzMWODztMGEJZmjkXnkry/Messagerie?node-id=0-1&t=v913UcNv7kf3tMz0-1
