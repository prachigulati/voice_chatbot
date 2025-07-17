let url = ""; //gemini api url
let API_KEY = ""; //api key
let language = "en-US";
let payload={
"contents": [{
    "parts": [
        {"text": "Hi"}
    ]
    }]
}

const getData = () =>{
        let data = axios.post(`${url}+${API_KEY}`,payload)
        .then((res)=>{
            let response = res.data.candidates[0].content.parts[0].text
            response = response.replace(/\*/g, '');
            console.log(res.data.candidates[0].content.parts[0].text);
            speaks(response)
        }).catch((err)=>{
            console.log(err);
        })
    }

const handleLanguage = (event)=>{
    language = event.target.value
    console.log(event.target.value);
}

let recognize = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let saySpeech = window.speechSynthesis;

recognize.lang = "language";
recognize.interiamResult = false;
recognize.maxAlternatives = 1;

recognize.onresult = (event) =>{
    let userInput = event.results[0][0].transcript;
    console.log(event.results[0][0].transcript);
    payload.contents[0].parts[0].text=userInput;
    getData()
}

const speaks = (input)=>{
    const uattrence = new SpeechSynthesisUtterance(input);
    uattrence.lang = language;
    saySpeech.speak(uattrence);
}
function startListening(){
    recognize.start()
}


function stopSpeaking() {
    if (saySpeech.speaking) {
        saySpeech.cancel();  // Immediately stop speaking
        console.log("Speech cancelled.");
    }
}
