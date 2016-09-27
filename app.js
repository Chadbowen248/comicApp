var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    loadComics  = require("./populateComics"),
    saveImgPath  = require("./getImages"),
    dbComicImages = require("./models/comicsWithImage"),
    vault = require("./models/vaultComics"),
    moment      = require("moment");

//==========================================================//   
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//==========================================================//

mongoose.connect("mongodb://localhost/dbComics");  

//==========================================================//
moment().format();
var dayofweek = moment().day();
if(dayofweek == 1){                  //2 is set for tuesday //
    //loadComics(saveImgPath); 
}
//==========================================================//

app.get("/", function(req, res){
    vault.find({}, function(err, vault){
        if(!err){
            res.render("index", {vault: vault});
        }
    })
    
});

app.get("/vault/:id", function(req,res){
    vault.findById(req.params.id, function(err,vaultComic){
        if(!err){
            res.render("vaultDetail", {vaultComic: vaultComic})
        }
    })
})

app.get("/:publisher", function(req, res){
    dbComicImages.find({publisher: req.params.publisher}, function(err, foundComicsWithImg){
        if(err){
            console.log(err);
        } else {
            res.render('publisherView', {foundComicsWithImg: foundComicsWithImg});
        }
    });
});


app.get("/:publisher/:id", function(req, res){
    dbComicImages.findById(req.params.id, function(err, foundComic){
        if(!err){
            res.render("detailView", {foundComic: foundComic})
        }
    })
})


app.get("/:publisher/:id/save", function(req, res){
    dbComicImages.findById(req.params.id, function(err, saveComic){
        if(!err){
            var vaultComic = saveComic.toObject();
            delete vaultComic["_id"]
            vault.create(vaultComic, function(err, createComic){
                if(!err){
                    console.log("saved comic to vault");
                    console.log("redirecting to vault detailView")
                    res.redirect("/vault/"+createComic._id)
                }
            })
        }
    })
})









//==========================================================//
    
app.listen(process.env.PORT,process.env.IP, function() {
    console.log("server is up on port", process.env.PORT );
});

