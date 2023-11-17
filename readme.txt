   
    Api servant à simuler des lancer de dés et à calculer les probabilités qu'une action réussisent dans le jeu Bloodbowl

    Page "Lancer"

    -choix du nombres de face du dé
    -choix du nombre de dé à lancer
    -bouton "lancer" qui lance le nombre de dé choisis 
    -bouton "lancé certifié" qui lance 1 dé et fait vibrer le téléphone
    -A faire : lancer des dés de blocage pour Bloodbowl

    Page Simulation
    - choisir les compétences du joueur actif (liste à compléter)
    - A faire : pouvoir changer de joueur actif
    -choisir les actions réaliser
        -Esquiver 
        -Blocage (a faire : frénésie)
        -Ramassage
        -Passe 
        -Foncer
        -Réception
        -Autre Action
        -A faire :  -ajouter les passages d'armures
                    -les agressions
    -Partie Résultat
        -choisir le nombre de relance d'équipe disponible
        -afficher la séquence (supprimer l'action via clic)
        -afficher la probabilité de réussisent
        - A faire :     -calcul de la proba avec les relances d'équipes, solitaire et Pro
                        -lancer la simulation avec un résultat échec ou réussite

    Bouton reset pour supprimer toutes la séquence
    Bouton export pour envoyer la séquence et ses chances de réussite


    -A faire : pouvoir faire des embranchements (exemple si push ou pow)
    -Idéalement, des components pour les actions plutot que tout mettre en vrac dans sim.page.html (utiliser des Form ?)





    Permissions à rajouter dans : android\app\src\main\AndroidManifest.xml

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />