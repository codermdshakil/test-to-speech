
const textArea = document.querySelector('.textAreaBox'),
vioceList = document.querySelector('select'),
speechBtn = document.querySelector('#btn');


let synth = speechSynthesis;
isSpeeking = true;

function voices(){
    for(const voice of synth.getVoices()){
        let selected = voice.name === 'Google US English' ? "selected" : "";
        let option = ` <option value="${voice.name}" ${selected}> ${voice.name} (${voice.lang})</option>`;
        vioceList.insertAdjacentHTML("beforeend", option); 
    }
}
synth.addEventListener('voiceschanged',voices);

// speak zoon 
function textToSpeech(text){
    let utternace = new SpeechSynthesisUtterance(text);
    for(const voice of synth.getVoices()){
        if(voice.name === vioceList.value){
            utternace.voice = voice;
        }
    }

    synth.speak(utternace); // spech the speak/ utternace
}

// eventhandler 
speechBtn.addEventListener('click', e  =>{
    e.preventDefault();
    if(textArea.value !== "" ){
        textToSpeech(textArea.value)
    }
    if(textArea.value.length > 80){
        if(isSpeeking){
            synth.resume();
            isSpeeking = false;
            speechBtn.innerText = "Pause Speech";

        }else{
            synth.pause();
            isSpeeking = true;
            speechBtn.innerText = "Resume Speech";
        }
    }
})




