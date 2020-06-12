
// setting up click listeners
// creating an array of players selections

 // todo -  make a function for all the click listeners to remove the duplication:
 //      each click listenert runs a function, the event is passed into the fuction,
 //       the function parses the data from the event object

let sequenceArray = [];
let playerArray = [];

const redBox = document.querySelector('.red');
const blueBox = document.querySelector('.blue');
const yellowBox = document.querySelector('.yellow');
const greenBox = document.querySelector('.green');
const face = document.querySelector('#face');
const message = document.querySelector('#message');

redBox.addEventListener('click',()=> {
    console.log('red clicked');
    playerArray.push('red');
    redBox.classList.add("animate__animated", "animate__headShake");
    const delay = new Promise ((resolve, reject) => {
        setTimeout( ()=> {
            redBox.classList.remove('animate__animated', 'animate__headShake');
            resolve();
        },300);               
    });
    if (playerArray.length >= sequenceArray.length && playerArray.length > 0){
        compare();
    };  
});

blueBox.addEventListener('click',()=> {
    console.log('blue clicked');
    playerArray.push('blue');
    blueBox.classList.add("animate__animated", "animate__headShake");
    const delay = new Promise ((resolve, reject) => {
        setTimeout( ()=> {
            blueBox.classList.remove('animate__animated', 'animate__headShake');
            resolve();
        },300); 
    });
    if (playerArray.length >= sequenceArray.length && playerArray.length > 0){
        compare();
    };
});

yellowBox.addEventListener('click',()=> {
    console.log('yellow clicked');
    playerArray.push('yellow');
    yellowBox.classList.add("animate__animated", "animate__headShake");
    const delay = new Promise ((resolve, reject) => {
        setTimeout( ()=> {
            yellowBox.classList.remove('animate__animated', 'animate__headShake');
            resolve();
        },300); 
    });
    if (playerArray.length >= sequenceArray.length && playerArray.length > 0){
        compare();
    };
});

greenBox.addEventListener('click',()=> {
    console.log('green clicked');
    playerArray.push('green');
    greenBox.classList.add("animate__animated", "animate__headShake");
    const delay = new Promise ((resolve, reject) => {
        setTimeout( ()=> {
            greenBox.classList.remove('animate__animated', 'animate__headShake');
            resolve();
        },300); 
    });
    if (playerArray.length >= sequenceArray.length && playerArray.length > 0){
        compare();
    };
});


face.addEventListener('click', () => nextRound());



//  create a speech() function and pass in round.  put all message options in there
//  to keep compare() tidy.   also pass in calledFrom to identify which function
// is calling, to give different options

function compare(){
    console.log(playerArray) 
    if(playerArray.join(',')=== sequenceArray.join(',')){
       
        speech(round,'compare');

        if (round>highScore) highScore = round;
        infoBoard.innerHTML = `<h1 class='disptext'>Your highest score: ${highScore-1}</h1>`
    
// todo - move 'highscore is only ... to seperate if.
// make an if not first try, if highScore defined. set highScore to undefined !!!

    } else {
        let wrongs = ["WRONG! Idiot, start again!","No! You pile of stinking horse manure, YOU ARE WRONG!! start again", `the high score is only ${highScore} and you cant even beat that.  You make me want to physically vomit in your stupid face!`,"What? are you serious? Are you taking the pissout of me here? get back tothe start",
                        "why are you not trying? do you hate me?", " I will murder you and everyone you have ever met. Start again", "Aaw, so close. so unlucky. You fucking cretin."]
        message.innerHTML = wrongs[Math.floor(Math.random() * wrongs.length)];
        if (bestRun){
            message.innerHTML = ` NO NO NO WRONG!!! But you got a new high score of ${round-1}!  You're still a loser, but I suppose your mother is probably proud of you.`
        }
        bestRun === false;
    playerArray=[];
    sequenceArray=[];
    round=1;
    //nextButton.classList.remove('hidden');
    console.log('start again: level 1')
    };
};


// generate a random sequence, increasing in length by one at a time.
const colors = ['red','blue', 'yellow', 'green'];
const scoreBoard = document.querySelector('#score');
const infoBoard = document.querySelector('#info');
let round = 1;
let highScore = 0;  //set to null or undefined then do if(highscore) then the messge


const nextRound = ()=>{

    playerArray=[];

    scoreBoard.innerHTML = `<h1 class='disptext'>Round ${round}!</h1>`
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequenceArray.push(randomColor);
    
    speech(round,'nextRound');
    round++;
    playSequence(sequenceArray);
    


    
  
};


// todo -  and play a sound. code below should help, if i can get mp3/sound files
////////////////////////
// const sound = new Audio()
// const button = document.querySelector(‘button’)
// button.addEventListener(‘click’, playSound)

// function playSound() {
//   sound.src = ‘audio/dragon.mp3’
//   sound.play()
// }
/////////////////////////
    let index = 0;
    const  playSequence = (array) => { 
        
        console.log(index)
       
        let input= array[index]
        if(input){             
            let color = document.querySelector("."+input);
            color.classList.add('newstyle', 'animate__animated', 'animate__bounce'); 

            const delay = new Promise ((resolve, reject) => {
                setTimeout( ()=> {
                    color.classList.remove('newstyle','animate__animated', 'animate__bounce');
                    resolve();
                },800);               
            });

            delay.then(()=>{
                index++;
                playSequence(array);
                });   
        } else {
            speech(round,'playSequence');
            index = 0;
        }    
    };

// bestRun is to track if this is a highest scoring attempt, avoiding repeating the new highscore message each time
let bestRun = false; 

    const speech = (round,calledFrom) => {
        if (calledFrom === 'playSequence'){
            const overToYou = ["Let's see you try that!","Rpeat that then","You're turn!!", "Bet you cant repeat that!", "You're gonna screw it up this time!!", "You got this!", "if anyone can I bet you can do it!","Do you want to see my balls?", "you know what to do!!", "I LOOOVE this game! your turn bitch :-)",
                                "Go Go go!!!", "What the fuck is wrong with you?",]

            let msg = overToYou[Math.floor(Math.random() * overToYou.length)];
            message.innerHTML = msg;

           
            if ( round === highScore && !bestRun){
                bestRun= true;
                message.innerHTML = "this is to set a new HIGH SCORE! Oh my god you are like my favorite player ever. Seriously. Did i tell you about the guy who, oh wait, forget it just click me"
            }
       
        }

        if (calledFrom === 'compare'){
            const letsPlay = ["Yay, you got it! Poke my face to play next round... Hmm, thats right. YOu dont have to be gentle...", "Hooray, good job! Now click me again you maggot face bug eyed shit weasle", "you're not bad! Go again?",
             "OK, no-one likes a show off! Im making the next one super hard!", "Wow, you have such beautiful eyes.  CLick me quick, before I fall in love with you", "Ooh you got it right. Well done you. What do you want, a fucking medal? Click on or fuck off", "OMG, like, how did you even do that? that was like so hard and you like just did it. That was A-Mazin.",
            "Do you think you are clever? Rememembering the colours? try again then", "YES! You nailed it! Wooo woo woooo! So excited! click me click meclick me click meclick me click meclick me click meclick me click meclick me click meclick me click me please...?", "...what? Oh are you still playing? Pffft ok click me then", "Wow, you amaze my balls!",
            "YES!!! Yes yes yes!!!  Do it to me again, just like that!", "Your aunt Fanny was good at this game.  Better than you anyway.  Click???",""]
            
             let msg = letsPlay[Math.floor(Math.random() * letsPlay.length)]
            message.innerHTML = msg;
        
           
            if (!(round %5)){
                message.innerHTML = ` Nice work! I bet you can't get ${round} in a row?  I mean, you can try, but I think we both know your not up to it.`
            }

        }

        if (calledFrom ==='nextRound'){
            const watch = ["Pay attention!", "watch closely ", "Here we go", "let's do this!!"," You can do it!", "try if you want", "why are you wasting your time?", "Look! Ooh you're cute when you concentrate ;-)","Can you actually remember anything?"];
            const diversions = ["wait, what's that behind you? Look!",`You're not getting ${round} in a row . Just give up.`, "Look out, a panther!!!!", "do you smell burning?? is the gas on?","Your neighbour is murdering kittens right now!! Why are you still playing this game???"]             

            if (!(round%5)){
               
                let msg = diversions[Math.floor(Math.random() * diversions.length)];
                message.innerHTML = msg;
            } else {
                let msg = watch[Math.floor(Math.random() * watch.length)];
                message.innerHTML = msg;
            }
        }

    }
// todo - fonts

// todo - tidying up -> put all functions in a separate file 
//                    -> move all variable declarations to top

// todo replace placeholder text on info blocks to something cute til something is added


//todo - move th e caption face over top of game, keep hidden except when needed, clicking it
// activates the nextRound button

// development -> a sequence of length n is played.  player has to match
//                as above, match in reverse
//                compare as each color is clicked,  if wrong element clicked, use animation out
//                a 'hints' button to repeat the sequence. finite no of hints per game
//                display that shows name of color, in that color text, as it is either clicked or played back.
