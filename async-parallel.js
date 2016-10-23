var async = require('async');
var request = require('request');

var reqUrl = 'http://apiurl/api/multiprice';
var reservationDate = '2016-10-21';
var hotelEntryDate = '2016-10-25';
var hotelExitDate = '2016-10-29';
var peopleCount = 2;
var hotelIdList = [1,2,3,4,5,6,7,8,9,];

var i,j,temparray,chunk = 5;
var hotelIdParse = [];
var apiResponse = [];
var apiRequest =[];
var hotelIdString =[];

for(i=0,j=hotelIdList.length; i<j; i+=chunk){
    hotelIdParse = [];
    temparray = hotelIdList.slice(i,i+chunk);

    temparray.forEach(function(id){
        hotelIdParse.push(id);
    });

    hotelIdString.push(hotelIdParse.toString());
}

hotelIdString.forEach(function(item){

    apiRequest.push(
            function(callback){ 
                console.log(new Date());
                    request.post({
                            headers: {'content-type' : 'application/json; charset=utf-8', 'cache-control': 'no-cache', 'pragma' : 'no-cache'},
                            url:     reqUrl,
                            body:    '{"idCollection":[' + item + '],"entryDate":"' + hotelEntryDate + '","exitDate":"' + hotelExitDate + '","peopleCount":' + peopleCount + '}',
                            forever:true
                          }, function(err, asyncResponse, body) {
                      callback(null,asyncResponse.body);
                    });

            }
    );    
});


async.parallel(apiRequest,function(err,result){
   console.log('[' + result.toString() + ']');
});
