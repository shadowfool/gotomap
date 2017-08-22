const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;
const numberMap = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20
}


function voice ( config ) {
  // config will have:
  // Grammar, view (for controls), data for mapping of loc to lat long.
  // scale/extent?
  let customGrammar = '#JSGF V1.0; grammar countries; public <word> = ' + config.words.join(' | ') + ' ;';
  this.recognition = new SpeechRecognition();
  this.speechRecognitionList = new SpeechGrammarList();
  this.speechRecognitionList.addFromString( customGrammar, 1 );


  this.view = config.view || {};
  this.data = config.data || {};


  this.recognition.grammars = this.speechRecognitionList;
  this.recognition.continuous = config.continuous || true;
  this.recognition.lang = 'en-US';
  this.recognition.interimResults = false;
  this.recognition.maxAlternatives = 1;

  let scaleCommands = '#JSGF V1.0; grammar scaleCommands; public <scale> = ' + [...Array(20).keys()].map((item) => 'scale ' + item.toString()).join(' | ') + ' ;';
  let zoomCommands = '#JSGF V1.0; grammar zoomCommands; public <zoom> = ' + [...Array(20).keys()].map((item) => 'zoom ' + item.toString()).join(' | ') + ' ;';

  this.speechRecognitionList.addFromString(scaleCommands, 1);
  this.speechRecognitionList.addFromString(zoomCommands, 1)


  this.recognition.onresult = e => {
     let result = e.results[ e.results.length - 1 ][0],
         zoomCheckIndex = result.transcript.toLowerCase().indexOf('zoom'),
         scaleCheckIndex = result.transcript.toLowerCase().indexOf('scale');

     console.log(result, zoomCheckIndex, scaleCheckIndex)
     if(zoomCheckIndex > -1){
        let zoom = result.transcript.toLowerCase().slice(zoomCheckIndex + 5);
        console.log('zoombefore', zoom)
        if(isNaN(Number(zoom))) zoom = numberMap[ zoom ];
        console.log(zoom, numberMap)

        this.view.goTo({ zoom })
        console.log(zoom)
     } else if(scaleCheckIndex > -1){
        let scale = result.transcript.toLowerCase().slice(scaleCheckIndex + 5);
        if(isNaN(Number(scale))) scale = numberMap[ scale ];
        console.log(scale)
        this.view.goTo({ scale })
     } else {
        let location = e.results[ e.results.length - 1 ][ 0 ].transcript;
        let coordinates = this.getLatLon( location );
        this.setMapPosition( coordinates );
     }

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
