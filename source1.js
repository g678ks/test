(function(){
	
	var Memory = {

		init: function(cards){
			this.game = $(".game"); // get element by class = $ 
			this.end = $(".end");
			this.overlay = $(".end-overlay");
			this.restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.game.html(this.html);
			this.memoryCards = $(".card");
			this.paused = false;
     	    this.guess = null;
			this.binding();
		},

		binding: function(){
			this.memoryCards.on("click", this.cardClicked);
            this.restartButton.on("click", $.proxy(this.reset, this));
		},
		
		cardClicked: function(){
			var check = Memory;
			var card = $(this);
			if(!check.paused && !card.find(".inside").hasClass("matched") && !card.find(".inside").hasClass("picked")){
				card.find(".inside").addClass("picked");
				if(!check.guess){
					check.guess = $(this).attr("data-id");
				} else if(check.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					check.guess = null;
				} else {
					check.guess = null;
					check.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					check.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showEnd();
				Memory.game.fadeOut();
			}, 1000);
		},

		showEnd: function(){
			this.overlay.show();
			this.end.fadeIn("slow");
		},

		hideEnd: function(){
			this.overlay.hide();
			this.end.hide();
		},

		reset: function(){
			this.hideEnd();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.game.show("slow");
		},

		shuffle: function(cardss){
			var counter = cardss.length;
			var random;
			var temp;
             	while (counter > 0) {
        	random = Math.floor(Math.random() * counter);
        	counter--;
        	temp = cardss[counter]; //cardss[23]
        	cardss[counter] = cardss[random];
        	cardss[random] = temp;
	    	}
	    	return cardss;
		},

		buildHTML: function(){
			var div = '';
			this.cards.each(function(k,v){
				div += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\></div>\
				<div class="back">  </div></div>\
				</div>';
			});
			return div;
			/*
			<div class="card" data-id="1">
				<div class="inside">
					<div class="front">
					<img src> </div>
				<div class = "back">



			*/
		}
	};

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
    
	Memory.init(cards);


})();