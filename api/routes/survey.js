var async = require('async');

module.exports = function(app){

  app.get('/survey', [], function(req, res, next){
    // Sends an overview of the survey, with all the step

    async.auto({
      survey: function(cb){
        db.models['Survey'].findOne(function(err, survey){
          cb(err, survey);
        });
      },
      steps: ['survey', function(cb, data){
        db.models['Step'].find({survey: data.survey.id}).sort({order: 1}).exec(function(err, steps){
          for(var i=0; i<steps.length; i++){ steps[i] = steps[i].expose();}
          cb(err, steps);
        });
      }]
    }, function(err, data){
      res.json({status: 'ok', survey: data.survey.expose(), steps: data.steps});
    });
  });

  app.get('/step/:step', [], function(req, res, next){
    // Sends a step of the survey, with the questions

    async.auto({
      step: function(cb){
        db.models['Step'].findOne({_id: req.params.step}, function(err, step){
          cb(err, step);
        });
      },
      questions: ['step', function(cb, data){
        db.models['Question'].find({step: data.step.id}).sort({order: 1}).exec(function(err, questions){
          for(var i=0; i<questions.length; i++){ questions[i] = questions[i].expose();}
          cb(err, questions);
        });
      }]
    }, function(err, data){
      res.json({status: 'ok', step: data.step.expose(), questions: data.questions});
    });
  });

  app.post('/step/:step', [], function(req, res, next){
    console.log(req.body);
    res.json({status: 'ok'});
  });

  app.post('/start', [], function(req, res, next){
    res.json({status: 'ok', token: 3});
  })

};