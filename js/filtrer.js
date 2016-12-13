// Ajout de l'événement Input à tous les inputs possédant la classe .filtrer
document.querySelectorAll("input.filtrer").forEach(function(elt){
    elt.addEventListener("input", filtrerInput); 
});

function filtrerInput(e) {
    // Récupérer les paramètres du champ
    var input = e.target;
    var valeur = input.value;
    var valLong = input.value.length;
    var start = input.selectionStart;
    var end = input.selectionEnd;
    // Conversion
    var nouvValeur = "";
    if (valLong > 0) {
        // Variables
        var carAutorises = "";                              // les caractères autorisés (si "" => tout caractère autorisé)
        var carRemplaceEspace = "";                         // caractère de remplacement pour l'espace (si "" => pas de remplacement")
        var toutMajuscules = false;                         // tous les caractères en majuscules
        var longMax = input.getAttribute("data-longmax");   // Longueur maximale
        // Paramètres en fonction du type prédéfini
        if (input.classList.contains("telephone")) carAutorises = "0123456789 +()";
        if (input.classList.contains("chiffres")) carAutorises = "0123456789";
        if (input.classList.contains("majuscules-tout")) toutMajuscules = true;
        if (input.classList.contains("login")) {
            toutMajuscules = true;
            carAutorises = "abcdefghijklmnopqrstuvwxyz0123456789-_";
            carRemplaceEspace = "_";
        }
        var nouveauMot =true;                               // Sert à déclencher un nouveau mot pour le type majuscules-mot
        // Boucle de transformation
        for (var i = 0; i < valeur.length; i++) {
            var c = valeur.substring(i, i + 1);
            if (carRemplaceEspace != "" && c == " ") c = carRemplaceEspace;
            if (carAutorises != "" && carAutorises.indexOf(c.toLowerCase()) == -1 && carAutorises.indexOf(c.toUpperCase()) == -1) {
                // Caractère non autorisé
                c = "";
            }
            // Gestion des majuscules
            if (toutMajuscules) {
                // Tout en majuscule
                c = c.toUpperCase();
            }
            if (input.classList.contains("majuscules-mot")) {
                // initiale de chaque mot en majuscule
                var carDeclenchantEspace = " -.";
                if (nouveauMot && carDeclenchantEspace.indexOf(c) == -1) {
                    c = c.toUpperCase();
                    nouveauMot = false;
                }
                else if (carDeclenchantEspace.indexOf(c) != -1) {
                    nouveauMot = true;
                } 
            }
            // Ajouter le caractère (si le nbre maxi autorisé n'est pas atteint)
            if (longMax == null || nouvValeur.length - end + start < longMax ) {
                nouvValeur += c;
            }
        }
    }
    // Affecter la nouvelle valeur
    input.value = nouvValeur;
    // Longueur du nouveau contenu
    var nouvLong = nouvValeur.length;
    // Repositionner le curseur en fonction de la positiion de départ et de la longueur de chaîne ajoutée
    input.selectionStart = input.selectionEnd = start - valLong + nouvLong;
}
