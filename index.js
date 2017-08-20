const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

function voice ( config ) {
  console.log(config)
  this.recognition = new SpeechRecognition();
  this.speechRecognitionList = new SpeechGrammarList();
  this.speechRecognitionList.addFromString(config.grammar, 1);


  this.recognition.grammars = this.speechRecognitionList;
  this.recognition.continuous = true;
  this.recognition.lang = 'en-US';
  this.recognition.interimResults = false;
  this.recognition.maxAlternatives = 1;

  this.recognition.onresult = (e) => {
    console.log(e)
  }


  this.start = () => {
    this.recognition.start();
  }

  return this;
}




//Export as ES6 module, but also attach to window because esri uses amd 
window.voice = voice
