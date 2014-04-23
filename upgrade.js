var currentWeapon = {
	"weaponName" : "Rapier",
	"weaponLevel" : 1,
	"weaponUpgrade" : 0,
	"weaponDamage" : 300,
	"upgradeDamage" : 0,
	"weaponCost" : 6200
}

var upgradeChart = {
	"level1" : {
		"chance" : [100,100,100,100,100,100,100,60,40,20],
		"damage" : [10,10,10,10,10,10,10,20,30,80]
	}
}
$(document).ready(function(){
	$("#upgradeAmount").text("+"+currentWeapon["weaponUpgrade"]);
	$("#weaponName").text(currentWeapon["weaponName"]);
	$("#weaponDamage").text(currentWeapon["weaponDamage"]+" + "+currentWeapon["upgradeDamage"]);
		
	$("#upgrade").on("click",function(){
		var currentUpgrade = currentWeapon["weaponUpgrade"];
		var weaponLevel = currentWeapon["weaponLevel"];
		
		var chanceToNext = upgradeChart["level"+weaponLevel]["chance"][currentUpgrade];
		var damageIncrease = 0;
		var damageDecrease = 0;
		if(weaponLevel>0)
		{
			damageDecrease = upgradeChart["level"+weaponLevel]["damage"][currentUpgrade-1];
		}
		if(weaponLevel<10)
		{
			damageIncrease = upgradeChart["level"+weaponLevel]["damage"][currentUpgrade];
		}
		
		
		var random = Math.random();
		random = Math.floor(random * 10);
		
		var upgradeSuccess;
		
		if((random) < (chanceToNext/10))
		{
			upgradeSuccess = true;
		}
		else
		{
			upgradeSuccess = false;
		}
		
		if(upgradeSuccess)
		{
			if(currentWeapon["weaponUpgrade"] < 10)
			{
				currentWeapon["weaponUpgrade"]++;
				currentWeapon["upgradeDamage"] += (damageIncrease);
			}
		}
		else
		{
			if(currentWeapon["weaponUpgrade"] > 0)
			{
				currentWeapon["weaponUpgrade"]--;
				currentWeapon["upgradeDamage"] -= (damageDecrease);
			}
		}
		
		$("#upgradeAmount").text("+"+currentWeapon["weaponUpgrade"]);
		$("#weaponName").text(currentWeapon["weaponName"]);
		$("#weaponDamage").text(currentWeapon["weaponDamage"]+" + "+currentWeapon["upgradeDamage"]);
		
		if(currentWeapon["weaponUpgrade"] == 10)
		{
			$('#upgrade').prop('disabled','disabled');
		}
		
	});
});