//var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');

///////////UTILISATEUR, DONNES PERSO
var utilisateurSchema = mongoose.Schema({ //structure de a genre de classe
    nom: String,
    prenom : String,
    promo : Number, //année complete 2016
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

function test(){
    console.log("on est dans bdd.js");
}

function addtoBDD(name,prenom,mail,promotion,telephone,adress,firm,language,competences) {
    console.log("Request add user to BDD.");
    var result = db.collection('utilisateurs').findOne({adresse_email : m}, function(err,user){ //une adresse email est unique
        console.log("Ask")
        if (err){
            return 0;
        }
        else if (user){
            return 1;
        }
        else{
            var util = new Utilisateur({
                nom : name,
                prenom : prenom,
                adresse : {
                    voie : adress.rue,
                    ville : adress.ville,
                },
                promo : promotion,
                adresse_email : mail,
                tel : telephone,
                entreprise : {
                    nom : firm.name,
                    adresse : {
                        voie : firm.ad_rue,
                        ville : firm.ad_ville,
                    } 
                },
                //mdp : 'coucou',
                langue: language,
                competence : competences,
            });
            util.save(function(err, utilisateur) {
                mongoose.disconnect();
            });
            return 2;
            
        }  
    });
    console.log(result);
    return result;
}

mongoose.connect('mongodb://localhost/projet2A');
module.exports = mongoose;



//module.exports addtoBdd 