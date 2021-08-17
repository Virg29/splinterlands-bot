const jsonTeams = require("./decks/"+process.env.MANADECK);
const jsonTeamsAgainstRules = require("./decks/"+process.env.SUMMONERDECK);

const summonerTypes = ["earth","fire","dragon","water","life","death"]

const makeTeam = async (mana)=>{
	var bestTeam = null;
	jsonTeams.forEach((v)=>{
		if(mana >= v.manapool){
			bestTeam = v;
		}
	});

	console.log("team based only on mana");
	console.log("team manapool ",bestTeam.manapool);
	console.log("requested manapool ",mana);
	console.log({ summoner: bestTeam.cards[0], cards: bestTeam.cards.slice(1) });
	return { summoner: bestTeam.cards[0], cards: bestTeam.cards.slice(1)};
}

const makeTeamAgainstRule = async (mana,estimatedSummoner)=>{
	if(estimatedSummoner in summonerTypes){

		var chooseFrom = jsonTeamsAgainstRules.find((v) => { return v.against == estimatedSummoner? true:false;}).decks;

		var bestTeam = null;
		chooseFrom.forEach((v) => {
			if (mana >= v.manapool) {
				bestTeam = v;
			}
		});


		console.log("team based on mana and on summoner");
		console.log("team manapool ", bestTeam.manapool);
		console.log("team estimated summoner ", estimatedSummoner);
		console.log("requested manapool ", mana);
		console.log({ summoner: bestTeam.cards[0], cards: bestTeam.cards.slice(1) });
	}else{
		return makeTeam(mana);
	}
}

module.exports.makeTeam = makeTeam;
module.exports.makeTeamAgainstRule = makeTeamAgainstRule;