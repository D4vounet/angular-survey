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
        description: 'Ceci est un charmant questionnaire',
        thanks: 'Merci pour le temps que vous nous avez accordé',
        available: true
      }).save(function(err, data){ cb(err, data);});
    }],
    step1: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 1,
        title: 'Première étape',
        description: 'C\'est ici que tout commence',
        name: 'step1'
      }).save(function(err, data){ cb(err, data);});
    }],
    s1q1: ['step1', function(cb, data){
      var step = new db.models['Question']({
        step: data.step1.id,
        type: 'check',
        title: '1.1',
        order: 1,
        description: 'Ceci est l\'énnoncé de la question, il est beau et fort, musclé et luisant',
        name: 's1q1',
        required: true,
        hasComments: true,
        items: [{
          name: 'value1',
          text: 'Réponse 1'
        },{
          name: 'value2',
          text: 'Réponse 2'
        },{
          name: 'other',
          text: 'Du sucré',
          free: true,
          width: 12,
          inputWidth: 60
        }]
      }).save(function(err, data){ cb(err, data);});
    }],
    s1q2: ['step1', function(cb, data){
      var step = new db.models['Question']({
        step: data.step1.id,
        type: 'radio',
        title: '1.2',
        order: 2,
        description: 'Ceci est l\'énnoncé de la question, il est beau et fort, musclé et luisant',
        name: 's1q2',
        required: true,
        items: [{
          name: 'value1',
          height: 100,
          width: 12,
          text: '<strong>Réponse 1:</strong> Je suis un super long text complètement pas intéressant mais super cool à lire quand même. Et puis je m\'appelle Hervé, c\'est trop cool comme prénom Hervé'
        },{
          name: 'value2',
          height: 100,
          width: 12,
          text: '<strong>Réponse 2:</strong> Je suis un super long text complètement pas intéressant mais super cool à lire quand même. Et puis je m\'appelle Hervé, c\'est trop cool comme prénom Hervé'
        }]
      }).save(function(err, data){ cb(err, data);});
    }],
    s1q3: ['step1', function(cb, data){
      var step = new db.models['Question']({
        step: data.step1.id,
        type: 'open',
        title: '1.3',
        order: 3,
        description: 'Tout plein du texte. On veut du texte!',
        name: 's1q3',
        required: true
      }).save(function(err, data){ cb(err, data);});
    }],
    step2: ['survey', function(cb, data){
      var step = new db.models['Step']({
        survey: data.survey.id,
        order: 2,
        title: 'Deuxième étape',
        description: 'Ici c\'est la suite',
        name: 'step2'
      }).save(function(err, data){ cb(err, data);});
    }],
    s2q1: ['step2', function(cb, data){
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
    }],
  }, function(err, data){
    console.log('=======================================');
    console.log('=            SURVEY LOADED            =');
    console.log('=======================================');
  });
};