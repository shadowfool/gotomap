const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

function voice ( config ) {
  // config will have:
  // Grammar, view (for controls), data for mapping of loc to lat long.
  // scale/extent?
  this.recognition = new SpeechRecognition();
  this.speechRecognitionList = new SpeechGrammarList();
  this.speechRecognitionList.addFromString( config.grammar, 1 );

  this.view = config.view || {};
  this.data = config.data || {};


  this.recognition.grammars = this.speechRecognitionList;
  this.recognition.continuous = config.continuous || true;
  this.recognition.lang = 'en-US';
  this.recognition.interimResults = false;
  this.recognition.maxAlternatives = 1;

  this.recognition.onresult = e => {
    console.log(e.results)
     var location = e.results[ e.results.length - 1 ][ 0 ].transcript;
     let coordinates = this.getLatLon( location );
     this.setMapPosition( coordinates );
  }
  // Keeps the listner alive if continuous is true, otherwise let's it die
  this.recognition.onend = e => {
    if(this.recognition.continuous === true) this.start();
    return;
  }

  this.getLatLon =  key => {
    //removing whitespace from continous feed
    console.log(key)
    if(key[0] === ' ') key = key.slice(1);

    if( this.data[ key ] ){
      return [ this.data[ key ].longitude, this.data [ key ].latitude ]
    } else{
      return [1,1];
    }
  }

  this.setMapPosition = ( latLon = [] ) => {
    this.view.goTo( latLon );
  }


  this.start = () => {
    this.recognition.start();
  } 


  return this;
}




//Export as ES6 module, but also attach to window because esri uses amd 
window.voice = voice
