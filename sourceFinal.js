var cards = [
    {
        img: "https://i.imgur.com/gigr4zu.jpg",
        id: 1,
    },
    {
        img: "http://newsroom.aua.am/files/2016/09/AUA-25th-logo.jpg",
        id: 2
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/American_University_of_Armenia_logo.png/200px-American_University_of_Armenia_logo.png",
        id: 3
    },
    {
        img: "https://scontent.fevn1-2.fna.fbcdn.net/v/t1.0-1/p320x320/12651376_1509954622641640_6579085218164614886_n.png?_nc_cat=103&_nc_ht=scontent.fevn1-2.fna&oh=e33d97f5483f66054864724b59fcbeff&oe=5CAB8986",
        id: 4
    }, 
    {
        img: "https://i.imgur.com/TcRSzcm.png",
        id: 5
    },
    {
        img: "https://scontent.fevn1-1.fna.fbcdn.net/v/t1.0-9/1378305_10151882202425141_1136904594_n.jpg?_nc_cat=101&_nc_ht=scontent.fevn1-1.fna&oh=dffdc6b1ca81695fd6ba82af637c710b&oe=5C9B4816",
        id: 6
    },
    {
        img: "https://scontent.fevn1-1.fna.fbcdn.net/v/t1.0-9/30744040_1758453390878207_4615957060096010608_n.png?_nc_cat=111&_nc_ht=scontent.fevn1-1.fna&oh=d4b970ddec728e94e8b1b97362d321c3&oe=5C9AA585",
        id: 7
    },
    {
        img: "https://scontent.fevn1-2.fna.fbcdn.net/v/t1.0-9/13532933_1046520268735162_7730919218463770343_n.png?_nc_cat=105&_nc_ht=scontent.fevn1-2.fna&oh=f7c55285961242313a4d9f3dd162685a&oe=5CA30971",
        id: 8
    },
    {
        img: "https://i.imgur.com/EktspFa.jpg",
        id: 9
    },
    {
        img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
        id: 10
    },
    {
        img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
        id: 11
    },
    {
        img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
        id: 12
    },
];
var build= function()
{
    var div = '';
    for(var key in cardsArray)
    { 
        div += '<div class="card" data-num="'+ cardsArray[key].id +'"><div class="inside">\
        <div class="front"><img src="'+ cardsArray[key].img +'"\></div>\
        <div class="back">  </div></div>\
        </div>';
           
    };
    return div;
};     

var shuffle = function(cardss)
{
    var counter = cardss.length;
    var random;
    var temporary;
         while (counter > 0) {
    random = Math.floor(Math.random() * counter);
    counter--;
    temporary = cardss[counter]; 
    cardss[counter] = cardss[random];
    cardss[random] = temporary ;
    }
    return cardss;
};
//jquery code
var game = $(".game");//document.querySelector document.getELementsByClassName
var hard = $("button.hard");
var normal = $("button.normal");
var menu= $(".menu");
var end = $(".end");
var overlay = $(".end-overlay");
var restart = $("button.restart");
var paused = false;
var guess = null;
var cardsArray =[];
var shufflecards = shuffle(cardsArray);
game.hide();
//js code
var interval;
var finalTime ;
var timer = document.querySelector(".timer");
var minute = 0;
var second = 0;
var hour = 0;
var moveCounter =0;
var moves= document.querySelector(".moves") ;
var finalmoves;


function startTimer(){
    interval = setInterval(function(){
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
       // console.log(second,minute)
    },1000);
}

var clicked = function()
{
    var card = $(this);//this
    if(!paused && !card.find(".inside").hasClass("matched") && !card.find(".inside").hasClass("picked")) //find= querySelector , hasClass = classlist.contains, addClass = classList.add
    {   
        card.find(".inside").addClass("picked");
        if(!guess){
            guess = card.attr("data-num"); // getattribute
            } 
        else if(guess == card.attr("data-num") && !card.hasClass("picked")){
            $(".picked").addClass("matched");
            guess = null;
            moveCounter++;
        } else {
            guess = null;
            paused = true;
            moveCounter++;
            setTimeout(function(){
                $(".picked").removeClass("picked");
                paused = false;
            }, 600);
        }
        console.log(moveCounter);
        if($(".matched").length == $(".card").length){
            victory();
        }
    }
};



hard.click(function()
{
    cardsArray = cards.concat(cards);
    shuffle(cardsArray);
    html = build();
    game.html(html); //.html()= .innerHTML
    menu.hide(); //visibility = "hidden"
    game.show("slow");
    memoryCards = $(".card"); //assign card div, to memoryCards variable which turns into an objenct
    startTimer();
    memoryCards.on("click", clicked); //.onclick

})

normal.click(function()
{
    for(x = cards.length-1 ; x >= 8; x--)
    {
        cards.pop();
    }
    cardsArray = cards.concat(cards);
    shuffle(cardsArray);
    game.addClass("easy"); //.classlist.add("")
    html = build();
    game.html(html);
    menu.hide();
    game.show("slow");
    memoryCards = $(".card");
    startTimer();
    memoryCards.on("click", clicked);

})




var showEndScreen = function()
{
    overlay.show();
    end.fadeIn();
};


var victory = function()
{
    clearInterval(interval);
    finalTime = minute + " minute " + second + " seconds";
    finalmoves = "and " + moveCounter + " moves";
    timer.innerHTML = finalTime; //.html()
    moves.innerHTML = finalmoves;
  //  console.log(timer);
    paused = true;
    setTimeout(function(){
        showEndScreen();
        game.fadeOut(); //game.overlay.style.visibility = "hidden";

    }, 1000);
};

