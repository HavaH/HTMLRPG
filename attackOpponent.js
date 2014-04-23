var currentOpponent = {
	"name" : "Roshan",
	"level" : 1,
	"MaxHP" : 400,
	"HP" : 400,
	"damage" : 300,
	"Armour" : 10
}

var currentPlayer = {
	"name" : "IMBA Spirit",
	"level" : 1,
	"MaxHP" : 400,
	"HP" : 400,
	"damage" : 0,
	"Armour" : 10,
	"gold" : 0
}

var levelUPChart = {
	"HP" : [547,705,871,1046,1230,1422,1672,1988,2622],
	"damageIncrease" : [10,10,10,10,10,10,10,20,30,80],
	"bounty" : [10,10,10,10,10,10,10,20,30,80]
}

$(document).ready(function(){
	displayDetails("opponentDetails",currentOpponent);
	displayDetails("playerDetails",currentPlayer);

	$("#attackOpponent").on("click",function(){
	
		$("#attackOpponent").prop("disabled","disabled");
		var weaponDamage = currentWeapon["weaponDamage"] ;
		var upgradeDamage = currentWeapon["upgradeDamage"];
		var opponentDamage = currentOpponent["damage"];
		
		var playerHP = currentPlayer["HP"];
		var opponentHP = currentOpponent["HP"];
		
		var playerArmour = currentPlayer["Armour"];
		var opponentArmour = currentOpponent["Armour"];
		
		var nextAttack = function(){
			if(playerHP>0 && opponentHP>0){
				var playerRandom = Math.floor(Math.random()*10);
				var effPlayerArmour = playerArmour + playerRandom;
				
				var opponentRandom = Math.floor(Math.random()*10);
				var effOpponentArmour = opponentArmour + opponentRandom;
				
				var damageOnPlayer = opponentDamage * (100 - effPlayerArmour)/100;
				playerHP-=damageOnPlayer;
				
				var damageOnOpponent = weaponDamage * (100 - effOpponentArmour)/100 + upgradeDamage;
				opponentHP-=damageOnOpponent;
				
				currentPlayer["HP"] = playerHP;
				currentOpponent["HP"] = opponentHP;
				
				displayDetails("opponentDetails",currentOpponent);
				displayDetails("playerDetails",currentPlayer);
				setTimeout(nextAttack, 1000); // check again in a second
			}
			
			else
			{
				var matchResult;
		
				if(playerHP == opponentHP)
				{
					matchResult = "Mutual Death";
				}
				
				else if(playerHP < opponentHP)
				{
					matchResult = "Player Death";
				}
				
				else
				{
					matchResult = "Opponent Death";
				}
				alert(matchResult);
				
				currentPlayer["HP"] = currentPlayer["MaxHP"];
				currentOpponent["HP"] = currentOpponent["MaxHP"];
				displayDetails("opponentDetails",currentOpponent);
				displayDetails("playerDetails",currentPlayer);
				$("#attackOpponent").removeAttr("disabled");
			
			}
		}
		nextAttack();
		
		
	});

});

function displayDetails(id,element)
{
	$("#"+id+" .name").text(element["name"]);
	$("#"+id+" .level").text(element["level"]);
	$("#"+id+" .HP").text(element["HP"]);
	$("#"+id+" .damage").text(element["damage"]);
	$("#"+id+" .Armour").text(element["Armour"]);
}