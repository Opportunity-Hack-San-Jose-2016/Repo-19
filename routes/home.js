var ejs = require("ejs");
var mysql = require('./mysql');

function getInstaFeed(req,res){
	
}


function getHome(req,res){
	res.render("home");
}


function login(req,res){
	var statusCode = {"statusCode": 200}
	res.send(statusCode);
}

function getConfirmation(req,res){
	//var statusCode = {"statusCode": "redirect"}
	res.render("confirmation");
}

function getCustomerDetails(req,res){
	var userIdsQuery = "SELECT UserId FROM userdetails"
	var userIds = [];
	var finalResult = "[";

	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var rows = results;
				console.log("DB Results :"+results);
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				console.log("JSON userids :"+jsonString);
				for(var i in jsonParse){
					userIds[i] = jsonParse[i].UserId;
					var userDetailsQuery = "SELECT * FROM instafeedinformation where UserId = "+ userIds[i];
					mysql.fetchData(function(err,results){
						
						if(err){
							throw err;
						}
						else 
						{
							if(results.length > 0){
								var rows = results;
								console.log("DB Results :"+results);
								var jsonString = JSON.stringify(results);
								var jsonParse = JSON.parse(jsonString);
								console.log("JSON :"+jsonString);
								
								var currWeek = 27;
								var difference = 0;
								var currVal = 0;
								var prevWeek = 0;
				
								for(var i in jsonParse){
									if(currWeek == jsonParse[i].Week){
										currVal = jsonParse[i].TagCount;
									}else {
										prevWeek = jsonParse[i].TagCount;
									}
									
									if(prevWeek == 0){
										difference = (currVal - prevWeek) * 100 ;
									}else {
										difference = ((currVal - prevWeek)/prevWeek) * 100 ;
									}
									
								}
								
								console.log("Diff for userid "+ jsonParse[i].UserId + " diff "+ difference);

								var score = difference * -1; 
								//finalResult = finalResult + '{"userId":' + jsonParse[i].UserId + ',"score":' + score + ',"goalId":' + 1 + "}";
							var insertResultQuery = "INSERT INTO results (UserId , Score , GoalId) VALUES ('"+jsonParse[i].UserId+"', '"+score+"', '1')";
							mysql.fetchData(function(err,results){
								if(err){
									throw err;
								}
								else{
									console.log("Result inserted");
									/*json_responses = {"statusCode" : "userCreated"};
									res.send(json_responses);*/
								}	
							},insertResultQuery);
							}	
						}
				},userDetailsQuery);
				}
			}
		}
	},userIdsQuery);
}

exports.getInstaFeed=getInstaFeed;
exports.getHome=getHome;
exports.login=login;

exports.getConfirmation=getConfirmation;
exports.getCustomerDetails=getCustomerDetails;
