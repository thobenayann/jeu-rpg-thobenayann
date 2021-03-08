var app = {
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

    init: function () {
      console.log('init !');
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);
  