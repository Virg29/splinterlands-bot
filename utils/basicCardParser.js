var a = $(".card.beta");// not only basic cards
// var a = $(".card.beta.starter");// only basic cards
var b = [];
for (var i = 0; i < a.length; i++) {
	var current = $(a[i]);
	var obj = {
		"name": null,
		"speed": null,
		"damage": null,
		"isSummoner": null,
		"mana": null,
		"health": null,
		"id": null,
	}
	if ($(current.find(".relative-position")[1]).find('.summoner-stats').length != 0) {
		obj["isSummoner"] = true;
		obj["name"] = $(current.find(".relative-position")[2]).find(".card-name-name").html();
		obj["mana"] = Number.parseInt($(current.find(".relative-position")[1]).find(".stat-text-mana").html());
		obj["id"] = $(current.find("img")[0]).attr("card_detail_id");
	} else {
		var damage = 0;

		damage = $(current.find(".relative-position")[1]).find(".stat-attack").length != 0 ? $($(current.find(".relative-position")[1]).find(".stat-attack")).find(".stat-text").html() : 0;

		damage = $(current.find(".relative-position")[1]).find(".stat-ranged").length != 0 && damage == 0 ? $($(current.find(".relative-position")[1]).find(".stat-ranged")).find(".stat-text").html() : damage;

		damage = $(current.find(".relative-position")[1]).find(".stat-magic").length != 0 && damage == 0 ? $($(current.find(".relative-position")[1]).find(".stat-magic")).find(".stat-text").html() : damage;

		obj["isSummoner"] = false;
		obj["name"] = $(current.find(".relative-position")[2]).find(".card-name-name").html();
		obj["mana"] = Number.parseInt($(current.find(".relative-position")[1]).find(".stat-text-mana").html());
		obj["speed"] = Number.parseInt($($(current.find(".relative-position")[1]).find(".stat-speed")[0]).find(".stat-text").html());
		obj["damage"] = Number.parseInt(damage);
		obj["health"] = Number.parseInt($($(current.find(".relative-position")[1]).find(".stat-health")[0]).find(".stat-text").html());
		obj["id"] = $(current.find("img")[0]).attr("card_detail_id");

	}

	b.push(obj);
}
console.log(JSON.stringify(b));