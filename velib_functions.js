// Function qui récupère les courses de l'utilisateur

function getRides(json_file){

    var data = json_file['walletOperations'];
    var rides = [];
    for (let i = 0; i < data.length; i++){
        var distance = data[i]['parameter3']['DISTANCE'];
        var isElec = (data[i]['parameter1'] == "yes");
        var when = new Date(data[i]['operationDate']);
		if (data[i]['startDate'] == undefined){
        var duration = data[i]["quantity"];
		}else{
		
		var duration = (data[i]['endDate']-data[i]['startDate'])/1000;
			
		}
        var bikeId = data[i]['parameter3']['BIKEID'];
        rides.push([parseFloat(distance),isElec,when,duration,bikeId]);
	}
	console.log(rides[0]);
    return rides

}


// Functions pour les graphiques

function totalDist(rides){
	var dist = 0;
	var dist_elec = 0;
	var dist_meca = 0;
	for (let i = 0; i < rides.length; i++){
		if (rides[i][0] > 100){
			dist += rides[i][0];
			if (rides[i][1]){
				
				dist_elec += rides[i][0];
			}else{
				
				dist_meca += rides[i][0];
			}
		}
		
	}
	
	return [dist,dist_elec,dist_meca]
	
}

function monthBefore(year,month){
	if (month == 0){
		return [year-1,11]
	}else{
		return [year,month-1]
	}
	
	
	
}

function dateToStr(year,month){
  return (month+1).toString()+"/"+year.toString()	
}


function monthAfter(year,month){
	if (month == 11){
		return [year+1,0]
	}else{
		return [year,month+1]
	}
	
	
	
}

function evolDist(rides){
	var tabCumulDistElec = [0,0];
	var tabCumulDistMeca = [0,0];
	var tabEvolDist = [0];
	var tabEvolDistElec = [0];
	var tabEvolDistMeca = [0];
	var currentMonth = rides[rides.length-1][2].getMonth();
	var currentYear = rides[rides.length-1][2].getFullYear();
	var momentStart = monthBefore(currentYear,currentMonth);
	var labels = [dateToStr(momentStart[0],momentStart[1]),dateToStr(currentYear,currentMonth)];
	for (let i =0; i < rides.length; i++){
		r = rides[rides.length-1-i]
		if (r[0] > 100){
			var newMonth = r[2].getMonth();
			var newYear = r[2].getFullYear();
			var dist = r[0]/1000;
			while ((newMonth != currentMonth) || (newYear != currentYear)){
				tabCumulDistElec.push(tabCumulDistElec[tabCumulDistElec.length-1]);
				tabCumulDistMeca.push(tabCumulDistMeca[tabCumulDistMeca.length-1]);
				tabEvolDist.push(0);
				tabEvolDistElec.push(0);
				tabEvolDistMeca.push(0);
				var newMoment = monthAfter(currentYear,currentMonth);
				currentYear = newMoment[0];
				currentMonth = newMoment[1];
				labels.push(dateToStr(currentYear,currentMonth));
			}
			tabEvolDist[tabEvolDist.length-1] += dist;
			if (r[1]){
				tabCumulDistElec[tabCumulDistElec.length-1] += dist;
				tabEvolDistElec[tabEvolDist.length-1] += dist;
			}else{
				
				tabCumulDistMeca[tabCumulDistMeca.length-1] += dist;
				tabEvolDistMeca[tabEvolDist.length-1] += dist;
				
			}
		
		}
		
	}
	return [tabCumulDistElec,tabCumulDistMeca,tabEvolDist,tabEvolDistElec,tabEvolDistMeca,labels]
	
	
	
}



function evolErrors(rides){
	var tabEvolError = [];
	var tabEvolErrorElec = [];
	var tabEvolErrorMeca = [];
	var currentMonth = rides[rides.length-1][2].getMonth();
	var currentYear = rides[rides.length-1][2].getFullYear();
	var labels = [dateToStr(currentYear,currentMonth)];
	var count = 0;
	var total = 0;
	var countElec = 0;
	var totalElec = 0;
	var countMeca = 0;
	var totalMeca = 0;
	for (let i =0; i < rides.length; i++){
		r = rides[rides.length-1-i]
		
			var newMonth = r[2].getMonth();
			var newYear = r[2].getFullYear();
			while ((newMonth != currentMonth) || (newYear != currentYear)){
				tabEvolError.push(count*100/total);
				tabEvolErrorElec.push(countElec*100/totalElec);
				tabEvolErrorMeca.push(countMeca*100/totalMeca);
				count = 0;
				total = 0;
				countElec = 0;
				totalElec = 0;
				countMeca = 0;
				totalMeca = 0;
				var newMoment = monthAfter(currentYear,currentMonth);
				currentYear = newMoment[0];
				currentMonth = newMoment[1];
				labels.push(dateToStr(currentYear,currentMonth));
			}
			total += 1
			
			if (r[1]){
				totalElec += 1;
				if (r[0] <= 100){
					count += 1;
					countElec += 1;
				}
			}else{
				
				totalMeca += 1;
				if (r[0] <= 100){
					count += 1;
					countMeca += 1;
				}
				
			}
		
		}
		
	
	tabEvolError.push(count*100/total);
	tabEvolErrorElec.push(countElec*100/totalElec);
	tabEvolErrorMeca.push(countMeca*100/totalMeca);
	return [tabEvolError,tabEvolErrorElec,tabEvolErrorMeca,labels]
	
}



function distribDist(rides){
	var tabDistribDistElec =[];
	var tabDistribDistMeca =[];
	var labels = [];
	for (i=0;i< rides.length;i++){
		
		r = rides[i];
		if (r[0] > 100){
			 var dist = Math.floor(r[0]/1000);
			 if (r[1]){
				 if (tabDistribDistElec[dist] == undefined){
					 tabDistribDistElec[dist] = 1;
				 }else{
					 tabDistribDistElec[dist] += 1;					
				 }
			}else{
				 if (tabDistribDistMeca[dist] == undefined){
				 tabDistribDistMeca[dist] = 1;
				 }else{
					 tabDistribDistMeca[dist] += 1;					
			 }
		 }
		}
	}
			
			
		
	for (i=0;i < tabDistribDistElec.length;i++){
		if (tabDistribDistElec[i] == undefined){
					tabDistribDistElec[i] = 0;
		}
		labels[i] = i;
		if (i >= tabDistribDistMeca.length){
					tabDistribDistMeca[i] = 0;
			
		}
	}
	for (i=0;i < tabDistribDistMeca.length;i++){
		if (tabDistribDistMeca[i] == undefined){
					tabDistribDistMeca[i] = 0;
		}		
		labels[i] = i;
		if (i >= tabDistribDistElec.length){
					tabDistribDistElec[i] = 0;
			
		}
	}
	
	tabDistribDistElec.push(0)
	tabDistribDistMeca.push(0)
	labels.push(labels[labels.length-1]+1);
		
		
	
	return [tabDistribDistElec,tabDistribDistMeca,labels]
	
	

}



function distribTime(rides){
	var tabDistribTimeElec =[];
	var tabDistribTimeMeca =[];
	var labels = [];
	for (i=0;i< rides.length;i++){
		
		r = rides[i];
		if (r[0] > 100){
			 var time = Math.floor(r[3]/(60*2));
			 if (r[1]){
				 if (tabDistribTimeElec[time] == undefined){
					 tabDistribTimeElec[time] = 1;
				 }else{
					 tabDistribTimeElec[time] += 1;					
				 }
			}else{
				 if (tabDistribTimeMeca[time] == undefined){
				 tabDistribTimeMeca[time] = 1;
				 }else{
					 tabDistribTimeMeca[time] += 1;					
			 }
		 }
		}
	}
			
			
		
	for (i=0;i < tabDistribTimeElec.length;i++){
		if (tabDistribTimeElec[i] == undefined){
					tabDistribTimeElec[i] = 0;
		}
		labels[i] = 2*i;
		if (i >= tabDistribTimeMeca.length){
					tabDistribTimeMeca[i] = 0;
			
		}
	}
	for (i=0;i < tabDistribTimeMeca.length;i++){
		if (tabDistribTimeMeca[i] == undefined){
					tabDistribTimeMeca[i] = 0;
		}		
		labels[i] = 2*i;
		if (i >= tabDistribTimeElec.length){
					tabDistribTimeElec[i] = 0;
			
		}
	}
	
	tabDistribTimeElec.push(0)
	tabDistribTimeMeca.push(0)
	labels.push(labels[labels.length-1]+2);
		
		
	
	return [tabDistribTimeElec,tabDistribTimeMeca,labels]
	
	

}



function distribDistVoyages(rides){
	var tabDistribDist =[];
	var labels = [];
	var lastTime = 0;
	var totalDist = 0;
	for (i=0;i< rides.length;i++){
		
		r = rides[rides.length-1-i];
		if (r[0] > 100){
			var dist = r[0]/1000;
			var newTime = Date.parse(r[2]);
			if ((newTime-lastTime <= (600*1000)) || (i == 0)){
				totalDist += dist;
			}else{
				finalDist = Math.floor(totalDist);
				if (tabDistribDist[finalDist] == undefined){
					 tabDistribDist[finalDist] = 1;
				 }else{
					 tabDistribDist[finalDist] += 1;					
				 }
				 totalDist = dist;
			}
			lastTime = newTime+r[3]*1000;
			
		 }
		}
		finalDist = Math.floor(totalDist);
		if (tabDistribDist[finalDist] == undefined){
			 tabDistribDist[finalDist] = 1;
		 }else{
		 tabDistribDist[finalDist] += 1;					
		 }
			
		
	for (i=0;i < tabDistribDist.length;i++){
		if (tabDistribDist[i] == undefined){
					tabDistribDist[i] = 0;
		}
		labels[i] = i;
	}
	
	tabDistribDist.push(0)
	labels.push(labels[labels.length-1]+1);
	return [tabDistribDist,labels]

}


function distribDistOneDay(rides){
	var tabDistribDist =[];
	var labels = [];
	var lastDay = 0;
	var totalDist = 0;
	for (i=0;i< rides.length;i++){
		
		r = rides[rides.length-1-i];
		if (r[0] > 100){
			var dist = r[0]/1000;
			var newDay = Math.floor(Date.parse(r[2])/(3600*24*1000));
			if ((newDay == lastDay) || (i == 0)){
				totalDist += dist;
			}else{
				finalDist = Math.floor(totalDist/2);
				if (tabDistribDist[finalDist] == undefined){
					 tabDistribDist[finalDist] = 1;
				 }else{
					 tabDistribDist[finalDist] += 1;					
				 }
				 totalDist = dist;
			}
			lastDay = newDay;
			
		 }
		}
		finalDist = Math.floor(totalDist/2);
		if (tabDistribDist[finalDist] == undefined){
			 tabDistribDist[finalDist] = 1;
		 }else{
		 tabDistribDist[finalDist] += 1;					
		 }
			
		
	for (i=0;i < tabDistribDist.length;i++){
		if (tabDistribDist[i] == undefined){
					tabDistribDist[i] = 0;
		}
		labels[i] = i*2;
	}
	
	tabDistribDist.push(0)
	labels.push(labels[labels.length-1]+2);
	return [tabDistribDist,labels]

}
function distribDistHour(rides){
	var tabDistribHourElec = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var tabDistribHourMeca = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
	for (i =0; i < rides.length; i++){
		r = rides[i];
		if (r[0] > 100){
			var h = r[2].getHours();
			if (r[1]){
			tabDistribHourElec[h] += r[0]/1000;
			}else{
			tabDistribHourMeca[h] += r[0]/1000;
			}
		}
	
	}
	return [labels,tabDistribHourElec,tabDistribHourMeca]
}
	
	
function distribDistDay(rides){
	var tabDistribHourElec = [0,0,0,0,0,0,0];
	var tabDistribHourMeca = [0,0,0,0,0,0,0];
	var labels = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
	for (i =0; i < rides.length; i++){
		r = rides[i];
		if (r[0] > 100){
			var d = r[2].getDay();
			if (d == 0){
				d = 7;
			}
			if (r[1]){
			tabDistribHourElec[d-1] += r[0]/1000;
			}else{
			tabDistribHourMeca[d-1] += r[0]/1000;
			}
		}
	
	}
	return [labels,tabDistribHourElec,tabDistribHourMeca]
}



function distribSpeed(rides){
	var tabDistribSpeedElec =[];
	var tabDistribSpeedMeca =[];
	var labels = [];
	countElec = 0;
	countMeca = 0;
	for (i =0; i < rides.length; i++){
		r = rides[i]
		if (r[0] > 100){
			var speed = Math.floor(r[0]*1.8/r[3]);
			if (r[1]){
				countElec += 1;
				 if (tabDistribSpeedElec[speed] == undefined){
					 tabDistribSpeedElec[speed] = 1;
				 }else{
					 tabDistribSpeedElec[speed] += 1;					
				 }
			}else{
				countMeca += 1;
				 if (tabDistribSpeedMeca[speed] == undefined){
				 tabDistribSpeedMeca[speed] = 1;
				 }else{
					 tabDistribSpeedMeca[speed] += 1;					
			 }
			}
			
			
			
		}
		
	}
		
	for (i=0;i < tabDistribSpeedElec.length;i++){
		if (tabDistribSpeedElec[i] == undefined){
					tabDistribSpeedElec[i] = 0;
		}else{
			tabDistribSpeedElec[i] /= countElec;
		}
		labels[i] = 2*i;
		if (i >= tabDistribSpeedMeca.length){
					tabDistribSpeedMeca[i] = 0;
			
		}
	}
	for (i=0;i < tabDistribSpeedMeca.length;i++){
		if (tabDistribSpeedMeca[i] == undefined){
					tabDistribSpeedMeca[i] = 0;
		}else{
			tabDistribSpeedMeca[i] /= countMeca;
		}	
		labels[i] = 2*i;
		if (i >= tabDistribSpeedElec.length){
					tabDistribSpeedElec[i] = 0;
			
		}
	}
	tabDistribSpeedElec.push(0)
	tabDistribSpeedMeca.push(0)
	labels.push(labels[labels.length-1]+2);
	
	return [tabDistribSpeedElec,tabDistribSpeedMeca,labels]
}



function distribVoyagesParJour(rides){
	var tabDistribVoyages =[];
	var labels = [];
	var lastTime = 0;
	var count = 0;
	var currentDay = Math.floor(Date.parse(rides[rides.length-1][2])/(24*3600*1000))
	for (i =0; i < rides.length; i++){
		r = rides[rides.length-1-i]
		if (r[0] > 100){
			var newTime = Date.parse(r[2]);
			var newDay = Math.floor(newTime/(24*3600*1000))
			if (newTime-lastTime > (600*1000)){
				if (newDay == currentDay){
				count += 1;
				}else{
					if (tabDistribVoyages[count-1] == undefined){
						tabDistribVoyages[count-1] = 1;
					}else{
						tabDistribVoyages[count-1] += 1;
					}
				count = 1;
				currentDay = newDay;
				}
			}
			lastTime = newTime + r[3]*1000;
			
			
		}
		
	}
		
	for (i=0;i < tabDistribVoyages.length;i++){
		if (tabDistribVoyages[i] == undefined){
					tabDistribVoyages[i] = 0;
		}
		labels[i] = i+1;
	}
	
	
	return [tabDistribVoyages,labels]
}


function distribBikeId(rides){
	var idSeen = new Map();
	for(i=0;i < rides.length;i++){
		r = rides[i];
		if ((r[3] > 100) && (r[4] != "")){
			var newDay = Math.floor(Date.parse(r[2])/(3600*24*1000));
			if (idSeen.has(r[4])){
				var tab = idSeen.get(r[4]);
				if (!(tab.includes(newDay))){
					tab.push(newDay);
					idSeen.set(r[4],tab);		
				}
			}else{
			idSeen.set(r[4],[newDay]);
				
				
			}
		}
		
	}
		
	var iterator = idSeen.values();
	var cont = true;
	var countseen = []
	while(cont){
		var newE = iterator.next().value
		if (newE == undefined){
			cont = false;	
		}else{
			if (countseen[newE.length-1] == undefined){
				countseen[newE.length-1]  = 1;
			}else{
				countseen[newE.length-1] += 1;
			}
		}
		
	}
	labels = [];
	
	for (i=0;i<countseen.length;i++){
		if (countseen[i] == undefined){
			countseen[i] = 0;
		}
		labels[i] = i+1;		
	}
	return [countseen,labels]
	
}


function DistTime(rides){
	var pointsElec = [];
	var pointsMeca = [];
	for (i=0;i<rides.length;i++){
		r = rides[i];
		if (r[0] > 100){
			
			var point = {x:r[0]/1000, y :r[3]/60};
			if (r[1]){
				pointsElec.push(point);
			}else{
				pointsMeca.push(point);
			}	
		}
	}
	return [pointsElec,pointsMeca]	
}
	
// Fonction qui récupère les infos du profil de l'utilisateur

function getInfos(json_file){
	console.log(json_file);
	var name = json_file['generalDetails']['customerDetails']['name']['title'] + ". "+ json_file['generalDetails']['customerDetails']['name']['firstName'] + " "+ json_file['generalDetails']['customerDetails']['name']['lastName'];
	var abonnement = json_file['subscriptions']['title'];
	var abonnement_start = new Date(json_file['subscriptions']['subscriptionDate']);
	var abonnement_end = new Date(json_file['subscriptions']['terminationDate']);
	return [name,abonnement,abonnement_start,abonnement_end]
	
	
}


function getPayments(json_file){
	var totalDepenses = 0;
	data = json_file['customerPaymentDtoList'];
	for (let i = 0; i < data.length; i++){
		totalDepenses += data[i]['amount'];
		
	}
	return totalDepenses
}

//function recuprants les statistiques


function plusLongVoyage(rides){
	var longestTrip = 0;
	var lastTime = 0;
	var totalDist = 0;
	for (i=0;i< rides.length;i++){
		
		r = rides[rides.length-1-i];
		if (r[0] > 100){
			var dist = r[0]/1000;
			var newTime = Date.parse(r[2]);
			if (newTime-lastTime <= (600*1000)){
				totalDist += dist;
			}else{
				if (totalDist > longestTrip){
					longestTrip = totalDist;
				}
				 totalDist = dist;
			}
			lastTime = newTime+r[3]*1000;
			
		 }
		}
		
		if (totalDist > longestTrip){
					longestTrip = totalDist;
				}	

	return longestTrip

}




function getStats(rides){
	var totalDist = 0;
	var totalDistElec = 0;
	var totalDistMeca = 0;
	var totalTime = 0;
	var	totalDistMonth = 0;
	var today = new Date(Date.now());
	var thisMonth = today.getMonth();
	var thisYear = today.getFullYear();
	var longestTrip = plusLongVoyage(rides);
	
	for (i=0;i < rides.length;i++){
		r = rides[i];
		if (r[0] > 100){
			totalDist += r[0]/1000;
			if (r[1]){
				totalDistElec += r[0]/1000;
			}else{
				totalDistMeca += r[0]/1000;
			}
			var newYear = r[2].getFullYear();
			var newMonth = r[2].getMonth();
			if ((newYear == thisYear) && (newMonth == thisMonth)){
				totalDistMonth += r[0]/1000;
			}
			totalTime += r[3];
			
			
		}
		
	}
	
	return [totalDist,totalDistElec,totalDistMeca,totalDistMonth,totalTime,longestTrip]
	
	
	
}
	
// Pour les badges



function carnetDeVoyage(rides){
	var stats = getStats(rides);
	var totalDist = stats[0];
	var city_name = ["Bruxelles","Londres","Amsterdam","Dublin","Barcelone","Rome","Lisbonne","Tunis","Athenes","Moscou","Le Caire","New York","New Dehli","Madagascar","Rio","Tokyo","Buenos Aires","Syndey","Wellington","Paris"];
	var city_dist = [264,344,430,782,832,1105,1455,1770,2099,2490,3215,5845,7100,8724,9188,9730,11066,16984,19012,40075];
	var out_content = "";
	var last = -1;
	for (i=0;i<city_dist.length;i++){
		if (totalDist >= city_dist[i]){
			out_content += "<nav class='trip'><img src='img/badges/"+city_name[i]+".jpg'/>"+city_name[i]+" ("+city_dist[i]+" km)</nav>";
		}else if (last == -1){
			last = i;
			
		}
		
	}
	out_content += "<nav class='trip'><img src='img/badges/Next.jpg'/> ??? ("+city_dist[last]+" km)</nav>";
	return out_content
	
}


function maxDistOneDay(rides){
	var maxDist = 0;
	var lastDay = 0;
	var totalDist = 0;
	for (i=0;i< rides.length;i++){
		
		r = rides[rides.length-1-i];
		if (r[0] > 100){
			var dist = r[0]/1000;
			var newDay = Math.floor(Date.parse(r[2])/(3600*24*1000));
			if ((newDay == lastDay) || (i == 0)){
				totalDist += dist;
			}else{
				if (totalDist > maxDist){
					maxDist = totalDist;
				}
				totalDist = dist;
			}
			lastDay = newDay;
		 }
		}
		if (totalDist > maxDist){
			maxDist = totalDist;
			totalDist = 0;
		}
	return maxDist
}



function maxDistVoyages(rides){
	var maxDist = 0;
	var lastTime = 0;
	var totalDist = 0;
	for (i=0;i< rides.length;i++){
		
		r = rides[rides.length-1-i];
		if (r[0] > 100){
			var dist = r[0]/1000;
			var newTime = Date.parse(r[2]);
			if ((newTime-lastTime <= (600*1000)) || (i == 0)){
				totalDist += dist;
			}else{
				if (totalDist > maxDist){
					maxDist = totalDist;
				}
				 totalDist = dist;
			}
			lastTime = newTime+r[3]*1000;
			
		 }
		}
		if (totalDist > maxDist){
					maxDist = totalDist;
				}
	
	
	
	return maxDist

}


function distDimanche(rides){
	var totalDist = 0;
	for (i=0;i< rides.length;i++){
		
		r = rides[i];
		if (r[0] > 100){
			var when = r[2];
			if ((when.getHours() >= 6) && (when.getHours() < 12) && (when.getDay() == 0)){
				totalDist += r[0]/1000
				
			}
				
				
			}
		 }
		
	return totalDist
}

function countId(rides){
	var idSeen = new Map();
	for(i=0;i < rides.length;i++){
		r = rides[i];
		if ((r[3] > 100) && (r[4] != "")){
			var newDay = Math.floor(Date.parse(r[2])/(3600*24*1000));
			if (idSeen.has(r[4])){
				var tab = idSeen.get(r[4]);
				if (!(tab.includes(newDay))){
					tab.push(newDay);
					idSeen.set(r[4],tab);		
				}
			}else{
			idSeen.set(r[4],[newDay]);
				
				
			}
		}
		
	}
	
	var iterator = idSeen.values();
	var cont = true;
	var maxTime = 0;
	var countVelos = 0;
	while(cont){
		var newE = iterator.next().value
		if (newE == undefined){
			cont = false;	
		}else{
			countVelos += 1;
			var maxDay = Math.max(newE);
			var minDay = Math.min(newE);
			if ((maxDay-minDay) > maxTime){
				maxTime = maxDay-minDay;
			}
		}
		
	}
	return [countVelos,maxTime]
	
	
}

function badges(rides){
	var out_content = "";
	var stats = getStats(rides);
	var distElec = stats[1];
	var distMeca = stats[2];
	var badgesNameElec =  ["Sans se fatiguer","Super Mamie","Sponso EDF","Un tour de France à l'électrique, ça compte ?"];
	var badgesNameMeca = ["Pas besoin d'aller à la salle","Muscles d'acier","The Rock","Et un tour de France, un !"];
	var badgesDist = [100,500,1000,3500];
	var content_elec = "";
	var content_meca = "";
	for (i=0;i < 4;i++){
		if (distElec > badgesDist[i]){
			content_elec += "<nav class='badge'><img src='img/badges/Next.jpg'/> "+badgesNameElec[i]+"</nav>";
		}
		if (distMeca > badgesDist[i]){
			content_meca += "<nav class='badge'><img src='img/badges/Next.jpg'/> "+badgesNameMeca[i]+"</nav>";	
		}	
	}
	out_content += content_elec + content_meca;
	var maxDistDay = maxDistOneDay(rides);
	if (maxDistDay >= 35.01){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Tour du périph </nav>";
	}
	var maxDistV = maxDistVoyages(rides);
	if (maxDistV >= 17){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Versailles </nav>";
	}
	var distHour = distribDistHour(rides);
	var timeNight = distHour[1][2] + distHour[1][3] + distHour[1][4] + distHour[1][5] + distHour[2][2] + distHour[2][3] + distHour[2][4] + distHour[2][5];
	if (timeNight >= 50){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Je reprends une pinte ? </nav>";
		
	}
	var timeMorning = distHour[1][6] + distHour[1][7] + distHour[2][6] + distHour[2][7];
	if (timeMorning >= 50){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Le monde appartient à ceux qui se lèvent tôt </nav>";
		
	}
	var distDimancheMatin = distDimanche(rides);
	if (distDimancheMatin >= 50){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Pas de grasse mat' </nav>";		
	}
	
	var idVelosInfos = countId(rides);
	if (idVelosInfos[0] >= 500){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Catch'em all ! </nav>";		
		
	}
	if (idVelosInfos[1] >= 31){
		out_content +=  "<nav class='badge'><img src='img/badges/Next.jpg'/> Vieux copains </nav>";		
		
	}
	var distribId = distribBikeId(rides);
	var maxDaysSameVelib = Math.max(distribId[0]);
	if (maxDaysSameVelib >= 3){
		out_content += "<nav class='badge'><img src='img/badges/Next.jpg'/> On se connaît ? </nav>";	
	}
	
	var firstRide = Date.parse(rides[rides.length-1][2])/(3600*24*1000);
	var today = Date.now()/(3600*24*1000);
	if (today-firstRide >= 365){
		out_content += "<nav class='badge'><img src='img/badges/Next.jpg'/> Joyeux velibersaire ! </nav>";	
		
	}
	
	return out_content
}



// Recupere les trajets


function outputRides(rides,offset,limit){
	var out_content = "";
	if (limit == -1){
		var lastOne = rides.length;
		offset = 0;
		var cont = false;
		
	}else{
	var lastOne = Math.min(limit,rides.length-offset);
	var cont = (limit >= rides.length-1-offset);
	}
	for (i=0;i<lastOne;i++){
		r = rides[offset+i];
		if (r[1]){
			var elec = "Oui";
		}else{
			var elec = "Non";
		}
		if (r[0] < 100){
			var class_t  = "broken";}
		else if (r[1]) { 
			var class_t = "electric"; }
		else{
			var class_t = "mecanic";
			}
		var date = '<tr><td><b>Date </b></td><td> '+r[2].getDate()+'/'+(r[2].getMonth()+1)+'/'+r[2].getFullYear()+' ('+String(r[2].getHours()).padStart(2, "0")+':'+String(r[2].getMinutes()).padStart(2, "0")+')</td></tr>';
		var dist = '<tr><td><b>Distance</b> </td><td>'+r[0]/1000+' km</td></tr>';
		var elec = '<tr><td><b>Electrique ? </b></td><td>'+elec+'</td></tr>';
		var duree = '<tr><td><b>Durée </b></td><td>'+String(Math.floor(r[3]/60)).padStart(2, "0")+" min "+String(r[3]%60).padStart(2, "0")+' s </td></tr>';
		var idv = '<tr><td><b>Id vélib </b></td><td> #'+r[4]+'</td></tr></table>';
		out_content += "<div class='trajet "+class_t+"'><table>" +date+dist+elec+duree+idv+ "</table></div>";
		
	}
	return [out_content,cont];
	
}

