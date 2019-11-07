


function updateChart(chart_ctx,rides,chartId){
	if (chartId == "Speed"){
		var resultDistribSpeed = distribSpeed(rides);
		var chart = new Chart(chart_ctx, {
    type: 'line',
    data: {
		labels :resultDistribSpeed[2],
        datasets: [
		
		{
            label: 'Mécanique',
            data: resultDistribSpeed[1],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
        },{
            label: 'Electrique',
            data: resultDistribSpeed[0],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					display : false
                    }
					
                
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + ' km/h';
                    }
					
				}
				
			}]
        },
		title:{
			display: true,
			text: "Distribution de la vitesse moyenne par trajet",
			fontSize:25
			
		}
    }
});
		
		
	}else if(chartId == "TripDay"){
		
var resultVoyagesJour = distribVoyagesParJour(rides);
		var chart = new Chart(chart_ctx, {
    type: 'bar',
    data: {
		labels :resultVoyagesJour[1],
        datasets: [
		
		{
            label: 'Nombre de jour avec X voyages',
            data: resultVoyagesJour[0],
			borderColor: 'rgba(79, 65, 61,0.5)',
			backgroundColor: 'rgba(79, 65, 61,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					display : false
                    }
					
                
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + ' voyages';
                    }
					
				}
				
			}]
        },
		title:{
			display: true,
			text: "Distribution du nombre de voyages par jour",
			fontSize:25
			
		}
    }
});

		
		
	}else if(chartId == "DistCumul"){
		var resultEvolDist = evolDist(rides);
var chart = new Chart(chart_ctx, {
    type: 'line',
    data: {
        labels: resultEvolDist[5],
        datasets: [{
            label: 'Mécanique',
            data: resultEvolDist[1],
			borderColor: 'rgba(21, 179, 50,0.8)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
        },
		{
            label: 'Electrique',
            data: resultEvolDist[0],
			borderColor: 'rgba(23, 92, 189,0.8)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
        }
		]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					callback: function(value, index, values) {
                        return value + ' km';
                    }
				
                },
				stacked: true
            }]
        },
		title:{
			display: true,
			text: "Distance parcourue cumulée au fil du temps",
			fontSize:25
			
		}
    }
});
		
		
	}else if(chartId == "DistMonth"){
		var resultEvolDist = evolDist(rides);
		var chart = new Chart(chart_ctx, {
    type: 'bar',
    data: {
        labels: resultEvolDist[5].slice(1,resultEvolDist[5].length),
        datasets: [
		{
            label: 'Mécanique',
            data: resultEvolDist[4],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
        },
		{
            label: 'Electrique',
            data: resultEvolDist[3],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					callback: function(value, index, values) {
                        return value + ' km';
                    }
                },
				stacked: true
            }],
			xAxes: [{
				stacked: true
            }]
        },
		title:{
			display: true,
			text: "Distance parcourue par mois",
			fontSize:25
			
		}
    }
});
		
		
		
	}else if(chartId == "Broken"){
		var resultEvolError = evolErrors(rides);
var chart = new Chart(chart_ctx, {
    type: 'bar',
    data: {
        labels: resultEvolError[3],
        datasets: [{
            label: 'Total',
            data: resultEvolError[0],
			borderColor: 'rgba(79, 65, 61,0.5)',
			backgroundColor: 'rgba(79, 65, 61,0.1)',
			borderWidth: '1'
        },
		{
            label: 'Electrique',
            data: resultEvolError[1],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
        },
		{
            label: 'Mécanique',
            data: resultEvolError[2],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					callback: function(value, index, values) {
                        return value + '%';
                    }
					
                }
            }]
        },
		title:{
			display: true,
			text: "Pourcentage de trajets avec remise immédiate du velib",
			fontSize:25
			
		}
    }
});

		
		
		
	}else if(chartId == "DistTrip"){
		
		var resultDistribDist2 = distribDistVoyages(rides);
		var chart = new Chart(chart_ctx, {
    type: 'line',
    data: {
		labels :resultDistribDist2[1],
        datasets: [
		{
			label: "Nombre de voyages",
            data: resultDistribDist2[0],
			borderColor: 'rgba(79, 65, 61,0.5)',
			backgroundColor: 'rgba(79, 65, 61,0.1)',
			borderWidth: '1',
			steppedLine: true
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					display : false
                },
				stacked: true
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + ' km';
                    }
					
				}
				
			}]
        },
		title:{
			display: true,
			text: "Distribution des distances des voyages",
			fontSize:25
			
		}
    }
});
		
		
	}else if(chartId == "DistRide"){
		var resultDistribDist = distribDist(rides);
		var chart = new Chart(chart_ctx, {
    type: 'line',
    data: {
		labels :resultDistribDist[2],
        datasets: [
		
		{
            label: 'Mécanique',
            data: resultDistribDist[1],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1',
			steppedLine: true
        },
		{
            label: 'Electrique',
            data: resultDistribDist[0],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1',
			steppedLine: true
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					display : false
                },
				stacked: true
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + ' km';
                    }
					
				}
				
			}]
        },
		title:{
			display: true,
			text: "Distribution des distances de trajets",
			fontSize:25
			
		}
    }
});

		
		
		
	}else if(chartId == "DistHour"){
		var resultDistribDistHour = distribDistHour(rides);
		var chart = new Chart(chart_ctx, {
    type: 'bar',
    data: {
		labels :resultDistribDistHour[0],
        datasets: [
		
		{
            label: 'Mécanique',
            data: resultDistribDistHour[2],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1',
			steppedLine: true
        },{
            label: 'Electrique',
            data: resultDistribDistHour[1],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1',
			steppedLine: true
        }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					callback: function(value, index, values) {
                        return value + 'km';
                    }
					
                },
				stacked: true
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + 'h';
                    }
					
				},
				stacked: true
				
			}]
        },
		title:{
			display: true,
			text: "Distance totale parcourue par heure de début de trajet",
			fontSize:25
			
		}
    }
});
		
		
		
	}else if(chartId == "DistDay"){
		var resultDistribDistDay = distribDistDay(rides);
		var chart = new Chart(chart_ctx, {
    type: 'bar',
    data: {
		labels :resultDistribDistDay[0],
        datasets: [
		
		{
            label: 'Mécanique',
            data: resultDistribDistDay[2],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
        },{
            label: 'Electrique',
            data: resultDistribDistDay[1],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					callback: function(value, index, values) {
                        return value + 'km';
                    }
					
                },
				stacked: true
				
            }],
			xAxes: [{
				stacked: true
            }]
        },
		title:{
			display: true,
			text: "Distance totale parcourue par jour de la semaine",
			fontSize:25
			
		}
    }
});

		
		
	}else if(chartId == "BikeIdDay"){
		var resultDistribBikeId = distribBikeId(rides);
		var chart = new Chart(chart_ctx, {
    type: 'bar',
    data: {
		labels :resultDistribBikeId[1],
        datasets: [
		
		{
            label: 'Nombre de velib pris X jours différents',
            data: resultDistribBikeId [0],
			borderColor: 'rgba(79, 65, 61,0.5)',
			backgroundColor: 'rgba(79, 65, 61,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
				stacked: true
				
            }],xAxes: [{
                ticks: {
                   	callback: function(value, index, values) {
						if (value == 1){
							return value + ' jour';
						}else{
							return value + ' jours';
						}
                    }
                }
				
            }]			
			
					
        },
		title:{
			display: true,
			text: "Nombre de jours différents avec utilisation du même velib",
			fontSize:25
			
		}
    }
});

		
		
		
	}else if(chartId == "DistTime"){
		var resultDistTime = DistTime(rides);
		var chart = new Chart(chart_ctx, {
    type: 'scatter',
    data: {
        datasets: [{ label:"Electrique",
		
		data:resultDistTime[0],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
		},
		{ label:"Mécanique",
		
		data:resultDistTime[1],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
		}]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					callback: function(value, index, values) {
                        return value + ' min';
                    }
                }
				
            }],
			xAxes: [{
                ticks: {
					callback: function(value, index, values) {
                        return value + ' km';
                    }
                }
				
            }]
			
					
        },
		title:{
			display: true,
			text: "Relation Temps-Distance sur vos trajets",
			fontSize:25
			
		}
    }
});

		
		
		
	}else if(chartId == "TimeRide"){
		var resultDistribTime = distribTime(rides);
		var chart = new Chart(chart_ctx, {
    type: 'line',
    data: {
		labels :resultDistribTime[2],
        datasets: [
		
		{
            label: 'Mécanique',
            data: resultDistribTime[1],
			borderColor: 'rgba(21, 179, 50,0.5)',
			backgroundColor: 'rgba(21, 179, 50,0.1)',
			borderWidth: '1'
        },
		{
            label: 'Electrique',
            data: resultDistribTime[0],
			borderColor: 'rgba(23, 92, 189,0.5)',
			backgroundColor: 'rgba(23, 92, 189,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					display : false
                },
				stacked: true
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + ' min';
                    }
					
				}
				
			}]
        },
		title:{
			display: true,
			text: "Distribution des temps de trajets",
			fontSize:25
			
		}
    }
});

		
		
		
	}else if(chartId == "DistOneDay"){
		
		var resultDistribDay = distribDistOneDay(rides);
		var chart = new Chart(chart_ctx, {
    type: 'line',
    data: {
		labels :resultDistribDay[1],
        datasets: [
		{
			label: "Nombre de jours",
            data: resultDistribDay[0],
			borderColor: 'rgba(79, 65, 61,0.5)',
			backgroundColor: 'rgba(79, 65, 61,0.1)',
			borderWidth: '1'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					display : false
                },
				stacked: true
				
            }],
			xAxes: [{
				ticks: {
					 callback: function(value, index, values) {
                        return value + ' km';
                    }
					
				}
				
			}]
        },
		title:{
			display: true,
			text: "Distribution des distances parcourues en une journée",
			fontSize:25
			
		}
    }
});
		
		
	}
	
	return chart;
	
}