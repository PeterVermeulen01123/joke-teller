const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passing joke to voiceRSS api
function tellMe(joke) {
console.log('tell me: ',joke);
VoiceRSS.speech({
    key: '9a108854132a4ed48003d1c67dcc1646', // get your own API key here: http://www.voicerss.org/api/... in production this would be hidden on the backend server and not available to front end users
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
});
}

// get jokes from joke API
let joke = '';
const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

async function getJokes() {
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        //text-to speech
        tellMe(joke);
        //disable button
        toggleButton();
    }
    catch(error){
        //catch errors here
        console.log('opps', error);
    }
}
//event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);