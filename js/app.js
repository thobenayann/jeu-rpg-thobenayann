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

    // déclaration d'un booléen pour la gestion de la fin de partie
    gameOver: false,

    // Compteur du nombre de déplacements
    nbMoves: 0,

    init: function () {
      console.log('init !');
      app.boardNode = document.getElementById('board');
      app.drawBoard();

      // on branche nos écouteurs d'événements sur le body
      document.body.addEventListener('keyup', app.onKeyboardEvent);
      document.getElementById('button-restart').addEventListener('click', app.restartGame);

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
        app.checkIfGameOver();
    },

    // Une fonction de logique du jeu
    // Tourner à droite correspond à prendre l'élément suivant dans mon tableau
    // app.availableDirections
    turnRight: function () {
        // Si gameOver vaut true, je ne dois plus pouvoir exécuter les fonctions de mouvement
        if (app.gameOver) {
            return;
        }

        // Tourner à droite correspond à prendre l'élément suivant dans mon tableau
        // app.availableDirections
        app.player.directionIndex++;

        // Si je sors du tableau (direction top + turnRight)
        // Alors je reviens au début du tableau, l'index de la direction du joueur repasse à 0
        if (app.player.directionIndex >= app.availableDirections.length) {
            app.player.directionIndex = 0;
        }

        // je met à jour la propriété player.direction
        app.player.direction = app.availableDirections[app.player.directionIndex];

        // j'augmente mon nombre de déplacements
        app.nbMoves++;

        // on pense à redraw pour avoir instantanément le résultat
        app.redrawBoard();
    },

    turnLeft: function () {
        // Si gameOver vaut true, je ne dois plus pouvoir exécuter les fonctions de mouvement
        if (!app.gameOver) {
            // je met à jour la propriété player.direction
            app.player.directionIndex--;

            // Si je sors du tableau (direction right + turnLeft)
            // donc par le haut cette fois si
            // Alors je reviens au début du tableau, l'index de la direction du joueur repasse à 0
            if (app.player.directionIndex < 0) {
                app.player.directionIndex = app.availableDirections.length - 1;
            }
        
            // je met à jour la propriété player.direction
            app.player.direction = app.availableDirections[app.player.directionIndex];

            // j'augmente mon nombre de déplacements
            app.nbMoves++;

            app.redrawBoard();
        }
    },

    // On va créer ici notre fonction pour faire avancer le joueur
    moveForward: function () {
        if (app.gameOver) {
            return;
          }      

        if (app.player.direction === 'right') {
            app.player.x++;
        } else if (app.player.direction === 'bottom') {
            app.player.y++;
        } else if (app.player.direction === 'left') {
            app.player.x--;
        } else if (app.player.direction === 'top') {
            app.player.y--;
        }
        
        // Ici on gère le cas ou le joueur sortirais du plateau en x (a gauche ou a droite)
        if(app.player.x >= app.NB_CELLS) {
            app.player.x = app.NB_CELLS - 1;
        } else if(app.player.x < 0) {
            app.player.x = 0;
        }

        // Ici on gère le cas ou le joueur sortirais du plateau en y (en haut ou en bas)
        if(app.player.y >= app.NB_ROWS) {
            app.player.y = app.NB_ROWS - 1;
        } else if(app.player.y < 0) {
            app.player.y = 0;
        }

        // j'augmente mon nombre de déplacements
        app.nbMoves++;

        app.redrawBoard();
    },

    // Ici on gère l'interaction avec le clavier
    // pour réaliser les mouvements du joueur
    onKeyboardEvent: function (event) {
        // console.log('Key code :', event.keyCode, 'Key :', event.key, 'Code :', event.code);
        if (event.key === 'ArrowUp') {
            app.moveForward();
        }
        if (event.key === 'ArrowLeft') {
            app.turnLeft();
        }
        if (event.key === 'ArrowRight') {
            app.turnRight();
        }
    },

    // Gestion du game over
    checkIfGameOver: function () {
        // on regarde si le joueur a gagné
        // Donc si il se trouve sur la case targetCell
        // donc sur les mêmes coordonnées x et y
        if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
            alert(`Bravo, vous avez gagné avec ${app.nbMoves} déplacements!!!`);
            app.gameOver = true;
        }
    },

    // Recommencer une partie
    restartGame: function () {
        app.player.x = 0,
        app.player.y = 0,
        app.player.direction = 'right',
        app.player.directionIndex = 0,
        app.nbMoves = 0
        app.gameOver = false;
        app.redrawBoard();
    },
  };
  
  document.addEventListener('DOMContentLoaded', app.init);
  