const express = require('express');
const app = new express();
const dotenv=require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
  res.render('index.html');
});

function getNLUInstance() {
  let api_key = process.env.API_KEY; 
  let api_url = process.env.API_URL;
  const NaturallanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturallanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });
  return naturalLanguageUnderstanding;
}

app.get("/url/emotion", (req,res) => {
  const naturalLanguageUnderstanding= getNLUInstance();
      const analyzeParams = {
    'url':req.query.url,
    'features': {
      'emotion': {
      }
    }
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
      res.send('Could not do desired operation ', err);
    });
});

app.get("/url/sentiment", (req,res) => {
  const naturalLanguageUnderstanding= getNLUInstance();
      
  const analyzeParams = {
    'url': req.query.url,
      'features': {
        'sentiment': {
        }
      }
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      console.log(JSON.stringify(analysisResults, null, 2));
        res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
        res.send('Could not do desired operation ', err);
      });
});

app.get("/text/emotion", (req,res) => {
  const naturalLanguageUnderstanding= getNLUInstance();
      const analyzeParams = {
    'html':req.query.text,
    'features': {
      'emotion': {     
      }
    }
  };
  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
      res.send('Could not do desired operation ', err);
    });
});

app.get("/text/sentiment", (req,res) => {
  const naturalLanguageUnderstanding= getNLUInstance();
      
  const analyzeParams = {
    'html': req.query.text,
      'features': {
        'sentiment': {
        }
      }
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
      res.send('Could not do desired operation ', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
});