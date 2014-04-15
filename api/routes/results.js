var async = require('async');

module.exports = function(app){

  app.get('/results', [], function(req, res, next){
    async.auto({
      survey: function(cb){
        db.models['Survey'].findOne(function(err, survey){
          cb(err, survey);
        });
      },
      steps: ['survey', function(cb, data){
        db.models['Step'].find({survey: data.survey.id}).sort({order: 1}).exec(function(err, steps){
          cb(err, steps);
        });
      }],
      questions: ['steps', function(cb, data){
        async.map(data.steps, function(step, next){
          step = step.toObject();
          db.models['Question'].find({step: step._id}).sort({order: 1}).exec(function(err, questions){
            step.questions = questions;
            next(err, step);
          });
        }, cb);
      }],
      grid: ['questions', function(cb, data){

        var grid = [];
        for(var i=0; i<data.questions.length; i++){
          var step = data.questions[i], stepCells = 0,
            questions = [];

          for(var j=0; j<step.questions.length; j++){
            var question = step.questions[j].toObject(),
              cells = [];

            for(var k=0; k<question.items.length; k++){
              cells.push({name: question.items[k].name, answers: []});
            }
            if(question.hasComments){
              cells.push({name: 'comments', answers: []});
            }

            questions.push({id: question._id, name: question.title, items: cells, nbCells: cells.length});
            stepCells += cells.length;
          }
          grid.push({id: step._id, name: step.title, questions: questions, nbCells: stepCells});
        }

        cb(null, grid);
      }],
      answers: ['survey', function(cb, data){
        db.models['Answer'].find({survey: data.survey.id}).sort({createdAt: 1}).exec(function(err, answers){
          cb(err, answers);
        });
      }],
      build: ['answers', 'grid', function(cb, data){

        for(var i=0; i<data.grid.length; i++){
          var step = data.grid[i];

          for(var j=0; j<step.questions.length; j++){
            var question = step.questions[j];

            for(var k=0; k<question.items.length; k++){
              var item = question.items[k];


              // ANSWER LEVEL
              for(var l=0; l<data.answers.length; l++){
                var answer = data.answers[l].toObject(), value = '';

                for(var m=0; m<answer.steps.length; m++){
                  var answerStep = answer.steps[m];
                  if(answerStep.id.toHexString() == step.id.toHexString()){
                    // In the right step
                    for(var n=0; n<answerStep.questions.length; n++){
                      var answerQuestion = answerStep.questions[n];
                      if(answerQuestion.id.toHexString() == question.id.toHexString()){
                        // In the right question

                        if(answerQuestion.value.hasOwnProperty(item.name)){
                          // The item was filled !
                          value = (answerQuestion.value[item.name] === true)? 'Oui': answerQuestion.value[item.name];
                        }
                      }
                    }
                  }
                }

                item.answers.push(value);
              }


            }
          }
        }

        cb(null, data.grid);
      }]
    }, function(err, data){

      var result = '', nbAnswers = data.answers.length;

      for(var i=0; i<data.grid.length; i++){
        var step = data.grid[i];
        result += step.name;
        for(var j=0; j<step.nbCells; j++)
          result += ',';
      }
      result += "\r\n";


      for(var i=0; i<data.grid.length; i++){
        var step = data.grid[i];
        for(var j=0; j<step.questions.length; j++){
          var question = step.questions[j];
          result += question.name;
          for(var k=0; k<question.nbCells; k++){
            result += ',';
          }
        }
      }
      result += "\r\n";

      for(var i=0; i<data.grid.length; i++){
        var step = data.grid[i];
        for(var j=0; j<step.questions.length; j++){
          var question = step.questions[j];
          for(var k=0; k<question.items.length; k++){
            var item = question.items[k];
            result += item.name+',';
          }
        }
      }
      result += "\r\n";

      // Content
      for(var a=0; a<nbAnswers; a++){

        for(var i=0; i<data.grid.length; i++){
          var step = data.grid[i];
          for(var j=0; j<step.questions.length; j++){
            var question = step.questions[j];
            for(var k=0; k<question.items.length; k++){
              var item = question.items[k];
              result += item.answers[a]+',';
            }
          }
        }
        result += "\r\n";
      }

      


      res.send(result);
    });
  });
};
