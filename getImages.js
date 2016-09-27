var request         = require("request"),
    dbComics        = require("./models/comicsSchema"),
    dbComicImages   = require("./models/comicsWithImage");
    
    
    function saveImgPath() {
        dbComicImages.remove({},  function(err){
            if(!err){
                console.log('removing comics to avoid duplicates');
            }
        });
        
        dbComics.find({}, function(err, updatedComics){
            if(err){
                console.log(err);
            } else {
                updatedComics.forEach(function(comics){
                    request('http://www.previewsworld.com/Catalog/' + comics.diamond_id, function(error, response, body){
                        if(!error && response.statusCode === 200) {
                            var urlString = body.match(/SiteImage\/CatalogImage\/S.............../g)[0].toString();
                            var newComic = comics.toObject();
                            newComic.image = "http://www.previewsworld.com/" + urlString;
                            delete newComic["_id"];
                            dbComicImages.create(newComic, function(err, comics){
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log('added a comic with Image');
                                }
                            });
                            
                        }
                    });
                });
            }
        });
    }



 module.exports = saveImgPath;
 


