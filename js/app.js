var app = {
    NB_ROWS : 4,
    NB_CELLS: 6,
    // Création de l'objet player qui aura plusieurs propriétés
    // relatives à sa position
    player: {
        x: 0,
        y: 0,
        direct: 'right'
    },
    
    // définition de la case à atteindre
    targetCell: {
        x: 5,
        y: 3
    },

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
                    cellNode.appendChild(playerNode);
                }
            }
        }

    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);
  