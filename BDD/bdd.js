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

function addtoBDD(n,p,m,pr,t,a,e,l,c) {
    db.collection('utilisateurs').findOne({adresse_email : m},function(err,user){ //une adresse email est unique
    if (err){
        return 0;
    }
    else if (user){
        return 1;
    }
    else{
        var util = new Utilisateur({
            nom : n,
            prenom : p,
            adresse : {
                voie : a.id1,
                ville : a.id2,
            },
            promo : pr,
            adresse_email : m,
            tel : t,
            entreprise : {
                nom : e.id1,
                adresse : {
                    voie : e.id2,
                    ville : e.id3,
                } 
            },
            //mdp : 'coucou',
            langue: l,
            competence : c,
        });
        util.save(function(err, utilisateur) {
            mongoose.disconnect();
        });
        return 2;
        
    }
});


mongoose.connect('mongodb://localhost/projet2A');
module.exports = mongoose;
