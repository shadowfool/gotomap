const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const voice = (config) => {
  
  this.recognition = new SpeechRecognition();

  this.speechRecognitionList = new SpeechGrammarList();
  this.speechRecognitionList.addFromString(config.grammar, 1);


  this.recognition.grammars = this.speechRecognitionList;
  //recognition.continuous = false;
  this.recognition.lang = 'en-US';
  this.recognition.interimResults = false;
  this.recognition.maxAlternatives = 1;

  return this;
}





//Export as ES6 module, but also attach to window because esri uses amd 
window.voice = voice
export default voice