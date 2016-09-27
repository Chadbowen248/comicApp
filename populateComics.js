var  request     = require("request"),
     dbComics    = require("./models/comicsSchema");
    

     
     function loadComics(callback) {
        dbComics.remove({}, function(err){
            if(err){
                console.log(err);
            } else {
                request('https://api.shortboxed.com/comics/v1/new', function(error, response, body) {
                    if(!error && response.statusCode == 200){
                        var apiComics = JSON.parse(body);
                        var counter = 0;
                        apiComics["comics"].forEach(function(comic){
                            dbComics.create(comic, function(err, comic){
                                if(err){
                                    console.log(err);
                                } else {
                                    counter ++;
                                    console.log("success");
                                    if(counter === apiComics["comics"].length){
                                        setTimeout(callback, 3000);
                                    }
                                }
                            });
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
            
            console.log("removing comics");
        });
        
        
        
        
        
    }
    
    
    
    


 module.exports = loadComics;
 
 
 
