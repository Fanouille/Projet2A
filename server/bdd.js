//var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');

///////////UTILISATEUR, DONNES PERSO
var utilisateurSchema = mongoose.Schema({ //structure de a genre de classe
    nom: String,
    prenom : String,
    promo : String, //année complete 2016
    adresse_email : String,
    adresse: {
        voie: String,
        ville: String,
    },
    tel : String,
    entreprise : {
        nom : String,
        adresse : {
            voie : String,
            ville : String,
        } 
    },
    //mdp : String,
    langue: Array,
    competence : Array, //liste des compétences
});
var db = mongoose.connection;



//-------TEST AJOUT A BDD----------------

mongoose.addUserToBDD = function(data){
    //console.log("Request add user to BDD.");
    var result = db.collection('utilisateurs').findOne({adresse_email : data[5]}, function(err,user){ //une adresse email est unique
        if (err){
            console.log("Error happened");
            return 0;
        }
        
        else if (user==null){
            //console.log(user)
            var Utilisateur = mongoose.model('utilisateurs', utilisateurSchema);
            var util = new Utilisateur({

                nom : data[0],

                prenom : data[1],

                adresse : {
                    voie : data[2],
                    ville : data[3],
                },

                promo : data[4],

                adresse_email : data[5],

                tel : data[6],

                entreprise : {
                    nom : data[7],
                    adresse : {
                        voie : data[8],
                        ville : data[9],
                    } 
                },
                //mdp : 'coucou',
                langue: data[10],
                competence : data[11],
            });
            util.save(function(err, utilisateur) {
                mongoose.disconnect();
            });
            console.log("User added to BDD");
            return 2;
            
        }
        
        else{
            console.log(user);
            console.log("Already in BDD");
            return 1; 
        } 
    });
    //console.log(result);
    //return result;
}
//-------------------------------------------
db.collection("utilisateurs").createIndex({"$**":"text"});

mongoose.searchInBDD = function(research){
    console.log("on est dans bdd, recherche en cours");
    var cursor = db.collection("utilisateurs").find({ $text: {$search: research[0]}}).toArray(function(err, items) {
        if (err){
            return 0;
        }
        console.log(items);
        
    });
    return 1    
}

mongoose.connect('mongodb://localhost/projet2A');
module.exports = mongoose;
