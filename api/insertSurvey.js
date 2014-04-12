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



    /*
     *  SECTIONS
     */
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




    /*
     *  SECTION 1
     */
    s1q1: ['step1', function(cb, data){
      var question = new db.models['Question']({
        step: data.step1.id,
        type: 'fields',
        title: '1.1 - Informations personnelles',
        order: 1,
        description: '',
        name: 's1q1',
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
      var question = new db.models['Question']({
        step: data.step1.id,
        type: 'check',
        title: '1.2 - Mode d\'exercice',
        order: 2,
        description: 'Veuillez cocher vos modes d\'exercice, en précisant éventuellement le service concerné',
        name: 's1q2',
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





    /*
     *  SECTION 2
     */
    s2q1: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'fields',
        title: '2.1 - Formation initiale',
        order: 1,
        description: '',
        name: 's2q1',
        items: [
          {name: 'lieu', text: 'Lieu', placeholder: 'Centre de formation initial', width: 12, inputWidth: 75},
          {name: 'annee', text: 'Année', placeholder: 'Année d\'obtention du diplôme', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q2: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'radio',
        title: '2.2',
        order: 2,
        description: 'Avez-vous reçu, dans le cadre de la formation initiale, un enseignement en oralité?',
        name: 's2q2',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q3: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'radio',
        title: '2.3',
        order: 3,
        description: 'Avez-vous fait des formations complémentaires en oralité?',
        name: 's2q3',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q4: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'check',
        title: '2.4',
        order: 4,
        description: 'Si oui, laquelle / lesquelles?',
        name: 's2q4',
        items: [
          {name: 'hanen', text: 'Centre Hanen'},
          {name: 'bo', text: 'Bo'},
          {name: 'kunz', text: 'Kunz'},
          {name: 'barbier', text: 'Barbier'},
          {name: 'autres', text: 'Autres', free: true, placeholder: 'Précisez', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q5: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'radio',
        title: '2.5',
        order: 5,
        description: 'Dans le cadre de la formation initiale, avez-vous reçu un enseignement en accompagnement parental / guidance parentale / accompagnement familial / thérapie indirecte?',
        name: 's2q5',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q6: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'radio',
        title: '2.6',
        order: 6,
        description: 'Avez-vous fait des formations complémentaires en accompagnement parental?',
        name: 's2q6',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q7: ['step2', function(cb, data){
      var question = new db.models['Question']({
        step: data.step2.id,
        type: 'check',
        title: '2.7',
        order: 7,
        description: 'Si oui, laquelle / lesquelles?',
        name: 's2q7',
        items: [
          {name: 'hanen', text: 'Centre Hanen'},
          {name: 'bo', text: 'Bo'},
          {name: 'kunz', text: 'Kunz'},
          {name: 'barbier', text: 'Barbier'},
          {name: 'autres', text: 'Autres', free: true, placeholder: 'Précisez', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],




    /*
     *  SECTION 3
     */
    s3q1: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.1 - Séances',
        order: 1,
        description: 'En moyenne, combien de temps consacrez-vous à la préparation des séances de thérapie indirecte en dysoralités?',
        name: 's3q1',
        items: [
          {name: '1', text: 'De 0min à 30min'},
          {name: '2', text: 'De 30min à 1h'},
          {name: '3', text: 'De 1h à 1h30'},
          {name: '4', text: 'De 1h30 à 2h'},
          {name: '5', text: 'Plus de 2h'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q2: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.2',
        order: 2,
        description: 'Actuellement, pratiquez vous l\'accompagnement parental (thérapie indirecte) dans les prises en soin des troubles de l\'oralité alimentaire?',
        name: 's3q2',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q3: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.3',
        order: 3,
        description: 'Si oui, quels types d\'accompagnement parental faites-vous? (Définit par Bo, 2013, dans Auzias et le Menn, 2011)',
        name: 's3q3',
        items: [
          {name: 'type1', width: 12, height: 150, text: '<strong>Type I :</strong> Echanges formels ou informels, informations argumentées, conseils, écoute et étayage de l\'orthophoniste à la famille'},
          {name: 'type2', width: 12, height: 150, text: '<strong>Type II :</strong> Type collcaboratif, conseils, nombreux échanges ,apprentissage de techniques et entraînements. La famille et l\'orthophoniste travaillent selon des objectifs et directives élaborés par l\'orthophoniste'},
          {name: 'type3', width: 12, height: 150, text: '<strong>Type III :</strong> Repose sur l\'intervention des parents, ressources proposées plutôt que conseils imposés. La famille et l\'orthophoniste travaillent selon des objectifs, mais les stratégies sont discutées et choisies par l\'aidant. Il s\'agit d\'une élaboration conjointe de stratégies adaptées, d\'un partenariat parents-orthophoniste.'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q4: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'checkGrid',
        title: '3.4 - Auto-efficacité',
        order: 4,
        description: 'Lors des prises en soins indirectes des dysoralités, diriez-vous: ',
        name: 's3q4',
        items: [{
          name: 'phrase1',
          text: 'Je parviens toujours à résoudre les problèmes difficiles si je m\'en donne la peine.'
        },{
          name: 'phrase2',
          text: 'Si quelqu\'un (parents, entourage de l\'enfant) me fait obstacle dans le cadre de la rééducation, je peux trouver un moyen pour le surmonter.'
        },{
          name: 'phrase3',
          text: 'Il est facile pour moi de maintenir mes intentions et d\'accomplir mes objectifs professionnels.'
        },{
          name: 'phrase4',
          text: 'J\'ai confiance en moi pour faire face efficacement aux évènements innatendus.'
        },{
          name: 'phrase5',
          text: 'Grâce à mes compétences, je sais gérer des situations professionnelles inattendues.'
        },{
          name: 'phrase6',
          text: 'Je peux résoudre la plupart de mes problèmes professionnels si je mets en oeuvre les moyens nécessaires.'
        },{
          name: 'phrase7',
          text: 'Je reste calme lorsque je suis confronté(e) à des difficultés professionnelles car je peux me reposer sur mes capacitées à maîtriser les problèmes.'
        },{
          name: 'phrase8',
          text: 'Lorsque je suis confronté(e) à un problème, je peux habituellement trouver plusieurs idées pour le résoudre.'
        },{
          name: 'phrase9',
          text: 'Si j\'ai une problème professionnel, je sais toujours quoi faire.'
        },{
          name: 'phrase10',
          text: 'Quoiqu\'il arrive en séance, je sais généralement faire face.'
        },]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q5: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.5',
        order: 5,
        description: 'Parmi les parents avec qui vous pensez utiliser l\'outil, précisez le profil d\'implication parentale (profils adaptés de Family Participation Rating Scale de M.P. Moeller, 2000), le plus fréquemment rencontré',
        name: 's3q5',
        items: [
          {name: 'profil5', text: '<strong>Profil 5 :</strong> Définition'},
          {name: 'profil4', text: '<strong>Profil 4 :</strong> Définition'},
          {name: 'profil3', text: '<strong>Profil 3 :</strong> Définition'},
          {name: 'profil2', text: '<strong>Profil 2 :</strong> Définition'},
          {name: 'profil1', text: '<strong>Profil 1 :</strong> Définition'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q6: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.6',
        order: 6,
        description: 'Donnez vous des supports (feuilles, cahier...) aux parents dans le cadre des prises en soin des dysoralités?',
        name: 's3q6',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q7: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'check',
        title: '3.7',
        order: 7,
        description: 'TODO: Une liste dans une liste c\'est pas compréhensible pour le visiteur',
        name: 's3q7',
        items: [
          {name: 'profil5', text: '<strong>Profil 5 :</strong> Définition'},
          {name: 'profil4', text: '<strong>Profil 4 :</strong> Définition'},
          {name: 'profil3', text: '<strong>Profil 3 :</strong> Définition'},
          {name: 'profil2', text: '<strong>Profil 2 :</strong> Définition'},
          {name: 'profil1', text: '<strong>Profil 1 :</strong> Définition'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q8: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.8',
        order: 8,
        description: 'Les parents sont-ils demandeur de support reprenant les informations et conseils délivrés lors des séances?',
        name: 's3q8',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],




    /*
     *  SECTION 4
     */
    s4q1: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.1',
        order: 1,
        description: 'Avez-vous connaissance de matériel existant (ouvrages, jeux, support de rééducation...) pour les prises en soin de dysoralités?',
        name: 's4q1',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q2: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.2',
        order: 2,
        description: 'TODO: C\'est incompréhensible comme formulation!',
        name: 's4q2',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q3: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.3',
        order: 3,
        description: 'Avez vous connaissance de matériel existant <em>pour les parents</em>, dans le cadre des dysoralités?',
        name: 's4q3',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q4: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.4',
        order: 4,
        description: 'TODO: C\'est incompréhensible comme formulation!',
        name: 's4q4',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q5: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.5',
        order: 5,
        description: 'Fabriquez-vous du matériel, des supports, pour vos prise en soin des dysoralités?',
        name: 's4q5',
        items: [
          {name: 'oui', text: 'Oui'},
          {name: 'non', text: 'Non'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q6: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'check',
        title: '4.6',
        order: 6,
        description: 'Si vous fabriquez des supports pour les parents, de quel type?',
        name: 's4q6',
        items: [
          {name: 'livret', text: 'Livret'},
          {name: 'carnet', text: 'Carnet'},
          {name: 'feuille', text: 'Feuille avec schémas / dessins'},
          {name: 'ecrits', text: 'Explications écrites'},
          {name: 'autres', text: 'Autres: ', free: true, inputWidth: 60},
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q7: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'check',
        title: '4.7',
        order: 7,
        description: 'Si vous fabriquez des supports pour votre pratique, de quel type?',
        name: 's4q7',
        items: [
          {name: 'jeux', text: 'Jeux'},
          {name: 'autres', text: 'Autres: ', free: true, inputWidth: 60},
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q8: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'check',
        title: '4.8',
        order: 8,
        description: 'Si vous fabriquez des supports pour vous, de quel type?',
        name: 's4q8',
        items: [
          {name: 'trame', text: 'Trame de rééducation'},
          {name: 'autres', text: 'Autres: ', free: true, inputWidth: 60},
        ]
      }).save(function(err, data){ cb(err, data);});
    }],


  }, function(err, data){
    console.log('=======================================');
    console.log('=            SURVEY LOADED            =');
    console.log('=======================================');
  });
};