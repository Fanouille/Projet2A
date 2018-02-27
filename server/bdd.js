//var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise

//-------------------UTILISATEUR, DONNES PERSO-------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------------------------------

var db = mongoose.connection;

//---------------------------------------AJOUT BDD AVEC PROMESSE-----------------------------------------------------
mongoose.promiseAddUserToBDD = function(data){
    return new Promise(function(resolve,reject){
        db.collection('utilisateurs').findOne({adresse_email : data[5]}, function(err,user){ //une adresse email est unique
            if (err){
                return reject(err);
            }
            
            else if (user==null){
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
                return resolve(user);
                
            }
            
            else{
                return reject("user Already in BDD"); 
            } 
        });
    })
}
//-------------------------------------------------------------------------------------------------------------------

/*
//---------------------------------------TEST AJOUT A BDD------------------------------------------------------------
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
}
//-------------------------------------------------------------------------------------------------------------------
*/

//-------------------RECHERCHE PAR MOT CLE---------------------------------------------------------------------------
db.collection('utilisateurs').dropIndexes(); //on indexe les données 
db.collection('utilisateurs').createIndex({'$**':'text'});

mongoose.searchInBDD = function(research){
    //console.log("on est dans bdd, recherche en cours");
    return new Promise(function(resolve,reject){ //promesse
        db.collection('utilisateurs').find({$text : {$search: research}}).toArray(function(err,items){
            if (err) {
                return reject(err);
            }
            return resolve(items); //on rempli la promesse avec les items trouvés dans la BDD
        })
    })
}
//-------------------------------------------------------------------------------------------------------------------


mongoose.connect('mongodb://localhost/projet2A',{useMongoClient : true});
module.exports = mongoose;
