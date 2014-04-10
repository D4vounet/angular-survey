var async = require('async');

module.exports = function(){

  async.auto({
    clean: function(cb){
      async.parallel([
        function(cb2){ db.models['Survey'].remove(cb2)},
        function(cb2){ db.models['Step'].remove(cb2)},
        function(cb2){ db.models['Question'].remove(cb2)}
      ], cb);
    },
    survey: ['clean', function(cb){
      var survey = new db.models['Survey']({
        name: 'Questionnaire',
        description: 'Ceci est un charmant questionnaire. Dans le cadre de notre mémoire, nous allons réaliser un outil. Il se présentera sous formes de fiches numérisées, imprimables et qui pourront être insérées dans un classeur ou autre support apporté par le parent. Cet outil est à destination des parents, mais sera mis en place par l’orthophoniste dans le cadre de séances d’accompagnement parental. Pour cela nous avons besoin de vos réponses aux questions suivantes',
        thanks: 'Merci pour le temps que vous nous avez accordé',
        available: true
      }).save(function(err, data){ cb(err, data);});
    }],


    step1: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 1,
        title: 'Identité',
        description: 'Autant commencer par le plus rébarbatif. Nous ne revendrons pas vos informations aux plus offrants, mais apprécierions pouvoir vous recontacter au besoin.',
        name: 'identite'
      }).save(function(err, data){ cb(err, data);});
    }],
    step2: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 2,
        title: 'Formations',
        description: 'Ceci est un superbe texte de description. Il permet de détendre le visiteur afin de lui extirper les plus viles informations',
        name: 'formation'
      }).save(function(err, data){ cb(err, data);});
    }],
    step3: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 3,
        title: 'Pratique professionnelle',
        description: 'Ceci est un superbe texte de description. Il permet de détendre le visiteur afin de lui extirper les plus viles informations',
        name: 'pratiqueprofessionnelle'
      }).save(function(err, data){ cb(err, data);});
    }],
    step4: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 4,
        title: 'Outils & Matériels',
        description: 'Ceci est un superbe texte de description. Il permet de détendre le visiteur afin de lui extirper les plus viles informations',
        name: 'outilsmateriels'
      }).save(function(err, data){ cb(err, data);});
    }],
    step5: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 5,
        title: 'Attentes par rapport à l\'outil',
        description: 'Ceci est un superbe texte de description. Il permet de détendre le visiteur afin de lui extirper les plus viles informations',
        name: 'attentes'
      }).save(function(err, data){ cb(err, data);});
    }],


    s1q1: ['step1', function(cb, data){
      var step = new db.models['Question']({
        step: data.step1.id,
        type: 'fields',
        title: '1.1 - Informations personnelles',
        order: 1,
        description: '',
        name: 's1q1',
        required: true,
        items: [
          {name: 'nom', text: 'Nom'},
          {name: 'prenom', text: 'Prénom'},
          {name: 'email', text: 'Email'},
          {name: 'telephone', text: 'Téléphone'},
          {name: 'ville', text: 'Ville', width: 12, inputWidth: 80}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s1q2: ['step1', function(cb, data){
      var step = new db.models['Question']({
        step: data.step1.id,
        type: 'check',
        title: '1.2 - Mode d\'exercice',
        order: 2,
        description: 'Veuillez cocher vos modes d\'exercice, en précisant éventuellement le service concerné',
        name: 's1q2',
        required: true,
        items: [{
          name: 'liberal',
          width: 12,
          text: 'Libéral'
        },{
          name: 'institution',
          width: 12,
          text: 'Institution',
          free: true,
          inputWidth: 75,
          placeholder: 'Précisez'
        },{
          name: 'hopital',
          width: 12,
          text: 'Hopital',
          free: true,
          inputWidth: 75,
          placeholder: 'Précisez le service'
        }]
      }).save(function(err, data){ cb(err, data);});
    }],

    s2q1: ['step2', function(cb, data){
      var step = new db.models['Question']({
        step: data.step2.id,
        type: 'fields',
        title: '2.1 - Formation initiale',
        order: 1,
        description: '',
        name: 's2q1',
        required: true,
        items: [
          {name: 'lieu', text: 'Lieu', placeholder: 'Centre de formation initial', width: 12, inputWidth: 75},
          {name: 'annee', text: 'Année', placeholder: 'Année d\'obtention du diplôme', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q2: ['step2', function(cb, data){
      var step = new db.models['Question']({
        step: data.step2.id,
        type: 'radio',
        title: '2.2',
        order: 2,
        description: 'Avez-vous reçu, dans le cadre de la formation initiale, un enseignement en oralité?',
        name: 's2q2',
        required: true,
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q3: ['step2', function(cb, data){
      var step = new db.models['Question']({
        step: data.step2.id,
        type: 'radio',
        title: '2.3',
        order: 3,
        description: 'Avez-vous fait des formations complémentaires en oralité?',
        name: 's2q3',
        required: true,
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q4: ['step2', function(cb, data){
      var step = new db.models['Question']({
        step: data.step2.id,
        type: 'check',
        title: '2.4',
        order: 4,
        description: 'Si oui, laquelle / lesquelles?',
        name: 's2q4',
        required: true,
        items: [
          {name: 'hanen', text: 'Centre Hanen'},
          {name: 'bo', text: 'Bo'},
          {name: 'kunz', text: 'Kunz'},
          {name: 'barbier', text: 'Barbier'},
          {name: 'autres', text: 'Autres', free: true, placeholder: 'Précisez', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],

    /*s2q1: ['step2', function(cb, data){
      var step = new db.models['Question']({
        step: data.step2.id,
        type: 'checkGrid',
        title: '2.1',
        order: 1,
        description: 'Ceci est un magnifique tableau trop sexy',
        name: 's2q1',
        required: true,
        items: [{
          name: 'truc1',
          text: 'Grâce à mes compétences, je sais gérer des situations professionnelles inattendues.'
        },{
          name: 'truc2',
          text: 'Grâce à mes compétences, je sais gérer des situations professionnelles inattendues.'
        },{
          name: 'truc3',
          text: 'Grâce à mes compétences, je sais gérer des situations professionnelles inattendues.'
        }]
      }).save(function(err, data){ cb(err, data);});
    }],*/
  }, function(err, data){
    console.log('=======================================');
    console.log('=            SURVEY LOADED            =');
    console.log('=======================================');
  });
};