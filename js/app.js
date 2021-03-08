var app = {
    NB_ROWS : 4,
    NB_CELLS: 6,
    // Création de l'objet player qui aura plusieurs propriétés
    // relatives à sa position
    player: {
        x: 0,
        y: 0,
        direction: 'right',

        // directionIndex correspond à la direction du joueurs
        // dans le tableau availableDirections
        directionIndex: 0
    },
    
    // définition de la case à atteindre
    targetCell: {
        x: 5,
        y: 3
    },

    // On donne les directions possible du joueur
    // On commence par 'right' car c'est la direction par défaut du joueur
    availableDirections : [
        'right',
        'bottom',
        'left',
        'top'
    ],

    // déclaration de la propriété qui va créer notre plateau de jeu
    boardNode: null,

    init: function () {
      console.log('init !');
      app.boardNode = document.getElementById('board');
      app.drawBoard();
    },

    drawBoard: function () {

        // NB_ROWS et NB_CELLS dans les propriétés de app
        // Ici on doit créer 2 opérations imbriquées
        // Pour obtenir app.NB_ROWS(nombre de rows) x app.NB_CELLS(nombre de cellules)
        for (let indexRow = 0; indexRow < app.NB_ROWS; indexRow++) {

            const rowNode = document.createElement('div');
            rowNode.classList.add('row');

            app.boardNode.appendChild(rowNode);

            for (let indexCell = 0; indexCell < app.NB_CELLS; indexCell++) {

                const cellNode = document.createElement('div');
                cellNode.classList.add('cell');
                rowNode.appendChild(cellNode);

                // Tester les coordonnées de la cellule
                // Si les coordonnées de la cellule sont égales à app.targetCell x et y
                if (indexCell === app.targetCell.x && indexRow === app.targetCell.y) {
                    // On ajoute la classe target-cell
                    cellNode.classList.add('target-cell');
                }

                // Tester les coordonnées de la cellule
                // Si les coordonnées de la cellule sont égales à app.player x et y
                if (indexCell === app.player.x && indexRow === app.player.y) {
                    // On ajoute une div avec la classe player dans la cellule
                    const playerNode = document.createElement('div');
                    playerNode.classList.add('player');
                    // Ici on gère l'ajout d'une classe CSS conditionnée en fonction de la direction du joueur
                    playerNode.classList.add('direction-' + app.player.direction);
                    cellNode.appendChild(playerNode);
                }
            }
        }

    },

    // Une fonction qui efface tout ce qui est dans notre plateau de jeu
    clearBoard: function () {
        while (app.boardNode.firstChild) {
            app.boardNode.removeChild(app.boardNode.firstChild);
        }
    },

    // Une fonction qui va effacer notre plateau de jeu PUIS le redessiner
    // Avec des valeurs d'index du joueur différentes
    redrawBoard: function () {
        app.clearBoard();
        app.drawBoard();
    },

    // Une fonction de logique du jeu
    // Tourner à droite correspond à prendre l'élément suivant dans mon tableau
    // app.availableDirections
    turnRight: function () {
        // Tourner à droite correspond à prendre l'élément suivant dans mon tableau
        // app.availableDirections
        console.log('Avant de tourner :');
        console.log('Direction :', app.player.direction, 'index :', app.player.directionIndex);

        app.player.directionIndex++;

        // Si je sors du tableau (direction top + turnRight)
        // Alors je reviens au début du tableau, l'index de la direction du joueur repasse à 0
        if (app.player.directionIndex >= app.availableDirections.length) {
            app.player.directionIndex = 0;
        }

        app.player.direction = app.availableDirections[app.player.directionIndex];
        console.log('Après de tourner :');
        console.log('Direction :', app.player.direction, 'index :', app.player.directionIndex);

        app.redrawBoard();
    },

    turnLeft: function () {
        console.log('Avant de tourner :');
        console.log('Direction :', app.player.direction, 'index :', app.player.directionIndex);

        app.player.directionIndex--;

        // Si je sors du tableau (direction right + turnLeft)
        // donc par le haut cette fois si
        // Alors je reviens au début du tableau, l'index de la direction du joueur repasse à 0
        if (app.player.directionIndex < 0) {
            app.player.directionIndex = app.availableDirections.length - 1;
        }

        app.player.direction = app.availableDirections[app.player.directionIndex];
        console.log('Après de tourner :');
        console.log('Direction :', app.player.direction, 'index :', app.player.directionIndex);

        app.redrawBoard();
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);
  