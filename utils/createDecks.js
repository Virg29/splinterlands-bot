require('dotenv').config()
var keypress = require('keypress');
const fetch = require("node-fetch");

const availableCards = require("./basicCards.json");


//menu
//  |
// \|/
//creating deck
// |
// \
//   > choosing manapool ("deck0")
// |                           /|\
// \                            |
//   > choosing against rule ("deck1")
// |                              /|\
// \                               |
//   > choosing summoner ("deck2")/
// |                            /|\
// \                             |
//   > choosing cards ("deck3") /

var stage = "menu";

var possibleRules = ["earth", "fire", "dragon", "water", "life", "death"];


var manapool = null;
var againstRule = null;
var cards = [];


var buffer = "";


function processingTerminal() {
	keypress(process.stdin);
	renewComandPrompt();
	process.stdin.on('readable', function () {
		// console.log(ch);
		console.log(process.stdin.read().toString());
		var key = {name:null};
		key.name = process.stdin.read();

		if(key.name == "return"){
			if(stage == "menu"){
				deck0();
			}
			if(stage == "deck0"){
				var possibleResult = Number.parseInt(buffer);
				if(possibleResult && possibleResult > 0){
					manapool = possibleResult
					deck1();
				}else{
					deck0()
				}
			}
			renewComandPrompt();
		}
		else if(key.name == "backspace"){
			buffer = buffer.slice(0,buffer.length-1);
		}
		
		buffer += key.name;

		
	

		// console.log('got "keypress"', key);
		if (key && key.ctrl && key.name == 'c') {
			if(stage == "menu"){
				process.stdin.pause();
			}
			if (stage == "deck0") {
				menu();
			}
			if(stage == "deck1"){
				deck0();
			}
			if(stage == "deck2"){
				deck1();
			}
			if(stage == "deck3"){
				deck2();
			}
		}
	});

	process.stdin.setRawMode(true);
	process.stdin.resume();
}


function renewComandPrompt(){
if(stage == "menu"){
	process.stdout.write('\033c')
	console.log("Type enter to start creating new deck");
}
if(stage == "deck0"){
	process.stdout.write('\033c')
	console.log("CHOOSING MANAPOOL");
	console.log(buffer);
}
}


function menu() {
	stage = "menu";
	manapool = null;
	againstRule = null;
	cards = [];
	buffer = "";
	process.stdout.write('\033c')
}
function deck0(){
	stage = "deck0";
	manapool = null;
	buffer = "";
	process.stdout.write('\033c')
}
function deck1() {
	stage = "deck1";
	againstRule = null;
	buffer = "";
	process.stdout.write('\033c')
}
function deck2() {
	stage = "deck2";
	cards = [];
	buffer = "";
	process.stdout.write('\033c')
}
function deck3() {
	stage = "deck3";
	cards = cards.slice(0,1)
	buffer = "";
	process.stdout.write('\033c')
}
function complete() {
	stage = "menu";
	buffer = "";
	process.stdout.write('\033c')
}





async function getCards() {//это говно не работает так как нужно
	var username = process.env.ACCOUNT.split('@')[0];
	var answer = await fetch(
		`https://game-api.splinterlands.io/cards/collection/${username}`,
		{
			"credentials": "omit",
			"headers": {
				"accept": "application/json, text/javascript, */*; q=0.01"
			},
			"referrer": `https://splinterlands.com/?p=collection&a=${username}`,
			"referrerPolicy": "no-referrer-when-downgrade",
			"body": null,
			"method": "GET",
			"mode": "cors"
		}
	)
	console.log(answer);
}

processingTerminal();


