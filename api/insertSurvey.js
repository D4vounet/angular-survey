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
        description: '<br /><br />Ce premier questionnaire intervient dans le cadre de notre mémoire d\'orhtophonie. Nous recueillons ces informations dans le but de créer un outil destiné à la thérapie indirecte en oralité.<br /><br />Toutes les informations que vous nous transmettrez seront anonymées. Vos coordonnées ne seront utilisées qu\'à titre personnel. La durée du questionnaire est estimée à une trentaine de minutes.<br /><br />',
        thanks: 'Merci pour le temps que vous nous avez accordé.',
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
        name: 'identite'
      }).save(function(err, data){ cb(err, data);});
    }],
    step2: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 2,
        title: 'Formations',
        name: 'formation'
      }).save(function(err, data){ cb(err, data);});
    }],
    step3: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 3,
        title: 'Pratique professionnelle',
        name: 'pratiqueprofessionnelle'
      }).save(function(err, data){ cb(err, data);});
    }],
    step4: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 4,
        title: 'Outils & Matériels',
        name: 'outilsmateriels'
      }).save(function(err, data){ cb(err, data);});
    }],
    step5: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 5,
        title: 'Attentes par rapport à l\'outil',
        name: 'attentes',
        description: 'Notre outil se présentera sous forme de fiches numérisées, imprimables et qui pourront être insérées dans un classeur ou autre support apporté par le parent. Cet outil est à destination des parents, mais sera mis en place par l’orthophoniste dans le cadre de séances d’accompagnement familial.'
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
        description: 'Veuillez cocher votre mode d\'exercice, en précisant éventuellement le service concerné. Plusieurs réponses possibles.',
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
          {name: 'lieu', text: 'Lieu', placeholder: 'Centre de formation initiale', width: 12, inputWidth: 75},
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
        description: 'Avez-vous suivi des formations complémentaires en oralité?',
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
          {name: 'hanen', text: 'Catherine Senez'},
          {name: 'bo', text: 'Catherine Thibault'},
          {name: 'kunz', text: 'Fanny Guillon'},
          {name: 'barbier', text: 'Isabelle Barbier'},
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
        description: 'Dans le cadre de la formation initiale, avez-vous reçu un enseignement en accompagnement familial?',
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
        description: 'Avez-vous suivi des formations complémentaires en accompagnement familial?',
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
          {name: 'bo', text: 'Agnès Bo'},
          {name: 'kunz', text: 'Laurence Kunz'},
          {name: 'barbier', text: 'Isabelle Barbier'},
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
        description: 'Actuellement, pratiquez vous l\'accompagnement familial (thérapie indirecte) dans les prises en soins des troubles de l\'oralité alimentaire?',
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
        type: 'check',
        title: '3.3',
        order: 3,
        description: 'Si oui, quels types d\'accompagnement familial faites-vous?',
        name: 's3q3',
        items: [
          {name: 'type1', width: 12, height: 75, text: '<strong>Type I :</strong> Echanges formels ou informels, informations argumentées, conseils, écoute et étayage de l\'orthophoniste à la famille.'},
          {name: 'type2', width: 12, height: 100, text: '<strong>Type II :</strong> Collaboration avec les parents, échanges, conseils, objectifs et stratégies choisis par l\'orthophoniste, apport de techniques.'},
          {name: 'type3', width: 12, height: 75, text: '<strong>Type III :</strong> Intervention des parents, objectifs choisis par l\'orthophoniste, stratégies choisies par le parent, partenariat.'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q4: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'checkGrid',
        title: '3.4 - Auto-efficacité professionnelle',
        order: 4,
        description: 'Dans la prise en soins indirecte des dysoralités, afin de transmettre différentes informations aux parents avec vos supports actuels, diriez vous: </strong>',
        name: 's3q4',
        items: [{
          name: 'phrase1',
          text: 'Je parviens toujours à résoudre les problèmes difficiles.'
        },{
          name: 'phrase2',
          text: 'Si quelqu’un (parents, entourage de l’enfant) a des difficultés pour comprendre mes explications, je peux trouver un moyen pour améliorer la situation.'
        },{
          name: 'phrase3',
          text: 'Il est facile pour moi de maintenir les objectifs de la séance.'
        },{
          name: 'phrase4',
          text: 'J’ai confiance en moi pour faire face efficacement aux questions inattendues des parents et autres aléas.'
        },{
          name: 'phrase5',
          text: 'Grâce à mes compétences, je peux gérer les situations inattendues lors d’une séance.'
        },{
          name: 'phrase6',
          text: 'Je peux résoudre la plupart des difficultés d’explication.'
        },{
          name: 'phrase7',
          text: 'Je reste calme face à des difficultés de transmission des informations, car je suis capable de les surmonter.'
        },{
          name: 'phrase8',
          text: 'Lorsque je suis confronté(e) à des problèmes d’explication des informations, je peux trouver plusieurs idées pour les résoudre.'
        },{
          name: 'phrase9',
          text: 'Face à une difficulté en séance avec les parents, je sais toujours quoi faire.'
        },{
          name: 'phrase10',
          text: 'Quoiqu’il arrive en séances avec les parents, je sais généralement faire face.'
        },]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q5: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.5',
        order: 5,
        description: 'Parmi les parents avec qui vous pensez utiliser l\'outil, précisez le profil d\'implication parentale, le plus fréquemment rencontré',
        name: 's3q5',
        items: [
          {name: 'profil5', height: 190, width: 12, text: '<strong>Profil 5, participation idéale :</strong> Très bons ajustements de la famille qui prend en compte les difficultés de l’enfant. Utilisation des techniques transmises par l’orthophoniste, au domicile. Lors des séances : coopération active et présence régulière, indications suivies spontanément. Les parents font le lien entre les différents professionnels et impliquent les membres de la famille élargie à la rééducation.'},
          {name: 'profil4', height: 145, width: 12, text: '<strong>Profil 4, bonne participation :</strong> Adaptation supérieure à la moyenne, participation régulière aux séances, rôle actif des parents mais pas principal. Efforts pour l’utilisation des techniques au domicile avec facilité parfois, et pour impliquer les membres de la famille élargie à la rééducation.'},
          {name: 'profil3', height: 190, width: 12, text: '<strong>Profil 3, participation moyenne :</strong> Efforts pour comprendre et surmonter les difficultés de l’enfant. Participation à la plupart des séances. La transmission des informations à la famille élargie est limitée. Gestion de la rééducation perçue comme difficile par la famille et parfois assurée par un membre de la famille qui fait plus que sa part de responsabilité. Volonté d’utiliser les techniques mais besoin de soutien et d’indications au quotidien.'},
          {name: 'profil2', height: 145, width: 12, text: '<strong>Profil 2, participation sous la moyenne :</strong> Difficultés d’acceptation du trouble. Présence aux séances peu régulière. Stress familial quotidien qui empêche la transposition efficace des techniques à la maison, peu d’investissement dans la rééducation. Les soins de l’enfant sont des défis quotidiens.'},
          {name: 'profil1', height: 120, width: 12, text: '<strong>Profil 1, participation limitée :</strong> Le stress familial prend le pas sur les besoins quotidiens de l’enfant. Compréhension limitée du trouble et de ses conséquences. Participation très irrégulière ou très inefficace.'}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s3q6: ['step3', function(cb, data){
      var question = new db.models['Question']({
        step: data.step3.id,
        type: 'radio',
        title: '3.6',
        order: 6,
        description: 'Donnez vous des supports (feuilles, cahier...) aux parents dans le cadre des prises en soins des dysoralités?',
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
        type: 'radio',
        title: '3.7',
        order: 7,
        description: 'Les parents sont-ils demandeur de support reprenant les informations et conseils délivrés lors des séances?',
        name: 's3q7',
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
        description: 'Avez-vous connaissance de matériel existant pour les prises en soins des dysoralités?',
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
        type: 'fields',
        title: '4.2',
        order: 2,
        description: 'Si oui, précisez les références du matériel.',
        name: 's4q2',
        items: [
          {name: 'ref1', text: 'Référence 1', width: 12, inputWidth: 75},
          {name: 'ref2', text: 'Référence 2', width: 12, inputWidth: 75},
          {name: 'ref3', text: 'Référence 3', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q3: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.3',
        order: 3,
        description: 'Avez vous connaissance de matériel existant <strong>pour les parents</strong>, dans le cadre des dysoralités?',
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
        type: 'fields',
        title: '4.4',
        order: 4,
        description: 'Si oui, précisez les références du matériel.',
        name: 's4q4',
        items: [
          {name: 'ref1', text: 'Référence 1', width: 12, inputWidth: 75},
          {name: 'ref2', text: 'Référence 2', width: 12, inputWidth: 75},
          {name: 'ref3', text: 'Référence 3', width: 12, inputWidth: 75}
        ]
      }).save(function(err, data){ cb(err, data);});
    }],
    s4q5: ['step4', function(cb, data){
      var question = new db.models['Question']({
        step: data.step4.id,
        type: 'radio',
        title: '4.5',
        order: 5,
        description: 'Fabriquez-vous des supports pour vos prise en soins des dysoralités?',
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
        description: 'Si oui, de quel type?',
        name: 's4q6',
        items: [
          {name: 'livret', text: 'Livret'},
          {name: 'carnet', text: 'Carnet'},
          {name: 'feuille', text: 'Schémas'},
          {name: 'ecrits', text: 'Explications écrites'},
          {name: 'autres', text: 'Autres: ', free: true, inputWidth: 60},
        ]
      }).save(function(err, data){ cb(err, data);});
    }],




    s5q1: ['step5', function(cb, data){
      var question = new db.models['Question']({
        step: data.step5.id,
        type: 'check',
        title: '5.1',
        order: 1,
        description: 'Parmi les éléments suivants, lesquels souhaiteriez-vous trouver dans l’outil ? (plusieurs choix possibles)<br />Une case commentaire est disponible pour toute autre remarque.',
        name: 's5q1',
        items: [
          {name: 'reperes', width: 12, height: 75, text: 'Repères théoriques sur le développement de la sphère orale (anatomiques et temporels)'},
          {name: 'schemas', width: 12, text: 'Schémas anatomiques de la sphère oro-faciale'},
          {name: 'desensibilitation', width: 12, text: 'Protocole de désensibilisation du réflexe nauséeux'},
          {name: 'succion', width: 12, text: 'Gestes d’aide à la succion'},
          {name: 'alimentation', width: 12, text: 'Aides à l’alimentation'},
          {name: 'massages', width: 12, text: 'Techniques de massages corporels & faciaux'},
          {name: 'comptines', width: 12, text: 'Comptines'},
          {name: 'alimentation2', width: 12, height: 75, text: 'Informations sur l’alimentation (texture, quantité des cuillerées, température...)'},
          {name: 'objectifs', width: 12, text: 'Objectifs pour la séance suivante'},
          {name: 'astuce', width: 12, height: 75, text: 'Fiche « Astuce », pense-bête que les parents et l’orthophoniste pourront remplir'},
          {name: 'emploidutemps', width: 12, height: 75, text: 'Fiche « Emploi du temps » pour noter les moments importants de la journée (temps de massages...)'},
          {name: 'questions', width: 12, height: 75, text: 'Fiche « Questions » sur laquelle les parents pourront noter leurs interrogations, à poser à l’orthophoniste à la séance suivante'},
          {name: 'masemaine', width: 12, height: 75, text: 'Fiche « Ma semaine » où les parents noteront ce qui s’est passé dans la semaine (positif et négatif)'},
          {name: 'liaison', width: 12, text: 'Fiche « Liaison » que les professionnels pourront remplir'},
          {name: 'diversification', width: 12, text: 'Fiches de diversification alimentaire'},
          {name: 'praxies', width: 12, text: 'Fiches praxies'},
          {name: 'jeux', width: 12, text: 'Fiches de jeux (souffle, tactiles...)'},
          {name: 'autres', width: 12, text: 'Autres', free: true, inputWidth: 75, placeholder: 'Précisez'}
        ],
        hasComments: true
      }).save(function(err, data){ cb(err, data);});
    }],
    s5q2: ['step5', function(cb, data){
      var question = new db.models['Question']({
        step: data.step5.id,
        type: 'check',
        title: '5.2',
        order: 2,
        description: 'Quelle forme de fiches vous conviendrait le mieux? <br />Une case commentaire est disponible pour toute autre remarque.',
        name: 's5q2',
        items: [
          {name: 'preremplies', width: 12, height: 75, text: 'Fiches pré-remplies avec une partie libre (à remplir par l’orthophoniste avec le parent)'},
          {name: 'cleenmain', width: 12, text: 'Fiches « clé en main » prêtes à être utilisées'},
          {name: 'autres', width: 12, text: 'Autres: ', free: true, inputWidth: 75, placeholder: 'Précisez'},
        ],
        hasComments: true
      }).save(function(err, data){ cb(err, data);});
    }]


  }, function(err, data){
    console.log('=======================================');
    console.log('=            SURVEY LOADED            =');
    console.log('=======================================');
  });
};