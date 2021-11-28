class Drumkit{
constructor(){

    this.pads=document.querySelectorAll(".pad");
    this.kickAudio=document.querySelector(".kick-sound");
    this.snareAudio=document.querySelector(".snare-sound");
    this.hihatAudio=document.querySelector(".hihat-sound");
    this.currentKick="./Sounds/kick-808.wav";
    this.currentSnare="./Sounds/hihat-analog.wav";
    this.currentHihat="./Sounds/snare-analog.wav";
    this.index=0;
    this.bpm=150;
    this.playButton=document.querySelector(".play");
    this.isPlaying=null;
    this.selects=document.querySelectorAll("select")
    this.tempoSlider=document.querySelector(".tempo-slider")
}
activePad(){
    this.classList.toggle("active"); 
    // console.log(this);
}
repeat() {
    
    let step=this.index % 8;
    
    const activeBar=document.querySelectorAll(`.b${step}`)
    activeBar.forEach(bars=>{
        bars.style.animation=`playTrack 0.3s alternate ease-in-out 2`;
        //check if pads are active
        if(bars.classList.contains("active")){
            if(bars.classList.contains("kick-pad")){
            this.kickAudio.play()
            this.kickAudio.currentTime=0
             }
            if(bars.classList.contains("snare-pad")){
            this.snareAudio.play()
             this.snareAudio.currentTime=0
             }
            if(bars.classList.contains("hihat-pad")){
            this.hihatAudio.play()
             this.hihatAudio.currentTime=0
             }
    }
    
    
    });
  
    this.index++

    console.log(activeBar);
}
start(){
    const interval=(60/this.bpm)*1000
    if(!this.isPlaying){
        this.playButton.innerText="Stop"
        this.playButton.classList.add("active")
    this.isPlaying= setInterval(()=>{
        this.repeat()
    },interval)}
    else{
        this.playButton.innerText="Play"
        this.playButton.classList.remove("active")
        clearInterval(this.isPlaying)
        this.isPlaying=null;
    }
}

changeSound(e){
const selectionName=e.target.name;
const selectionValue=e.target.value;

console.log(selectionName);
console.log(selectionValue);

// switch(selectioName):
//     case
switch (selectionName) {
    case "kick-select":
        this.kickAudio.src=selectionValue;
        break;
    case "snare-select":
        this.snareAudio.src=selectionValue;
        break;
    case "hihat-select":
        this.hihatAudio.src=selectionValue;
        break;

   
}
}
changeTempo(e){
   const tempoText=document.querySelector(".tempo-nr")
 
    tempoText.innerText=e.target.value
}
updateTempo(e){
    this.bpm=e.target.value;
    clearInterval(this.isPlaying)
    this.isPlaying=null;
    if( this.playButton.classList.contains("active")){
        this.start()
    }
}

}


const drumkit=new Drumkit();
drumkit.pads.forEach(pad =>{
    pad.addEventListener('click',drumkit.activePad);
    pad.addEventListener("animationend",function(){
        this.style.animation="";
    })
})


//EVENTLISTNERS
drumkit.playButton.addEventListener("click",()=>{
drumkit.start()})

drumkit.tempoSlider.addEventListener("input",function(e){
    drumkit.changeTempo(e)
})
drumkit.tempoSlider.addEventListener("input",function(e){
    drumkit.updateTempo(e)
})


drumkit.selects.forEach(select =>{
select.addEventListener("change",function(e){
drumkit.changeSound(e)
})});


// 
// drumkit.start()
