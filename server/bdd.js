//var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //règle problème d'un depreciation warning sur les promesses


//------------------------------GESTION DES MOTS DE PASSE--------------------------------------------------------------
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
//---------------------------------------------------------------------------------------------------------------------



//-------------------UTILISATEUR, DONNES PERSO-------------------------------------------------------------------------
var utilisateurSchema = mongoose.Schema({ //structure de a genre de classe
    nom: String,
    prenom : String,
    promo : String, //année complete 2016
    adresse_email : {type: String, required: true, index: {unique: true}}, //POUR LA GESTION DU MDP
    password: {type: String, required: true},
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
    langue: Array,
    competence : Array, //liste des compétences
});
//-------------------------------------------------------------------------------------------------------------------

//-------------------COMPETENCES-------------------------------------------------------------------------------------

var competenceSchema = mongoose.Schema({
    nom_comp: String,
    is_leaf: Boolean,
    commentaire : String,
    url_utile : String, 
});
competenceSchema.add({ 
    parent : competenceSchema,
});
//-------------------------------------------------------------------------------------------------------------------

var db = mongoose.connection;

db.collection("competences").remove({});



//------------------------------HASHAGE DU MOT DE PASSE AVANT ENREGISTREMENT-----------------------------------------
utilisateurSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});
//-------------------------------------------------------------------------------------------------------------------


//---------------------------METHODE DE COMPARAISON DE MOT DE PASSE--------------------------------------------------
mongoose.comparePassword = function(user, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
//-------------------------------------------------------------------------------------------------------------------


//---------------------------------------AJOUT UTILISATEUR BDD-------------------------------------------------------------------
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

                    password: data[12],

                    tel : data[6],

                    entreprise : {
                        nom : data[7],
                        adresse : {
                            voie : data[8],
                            ville : data[9],
                        } 
                    },
                    langue: data[10],
                    competence : data[11],
                });
                util.save(function(err, utilisateur) {
                    if (err){
                        throw err;
                    }
                    mongoose.disconnect();
                });
                return resolve(user);
                
            }
            
            else{
                return reject("user Already in BDD"); //TO DO : gérer le cas où l'email existe déjà
            } 
        });
    })
};
//-------------------------------------------------------------------------------------------------------------------


//----------------------------------------MODIFICATION UTILISATEUR---------------------------------------------------
mongoose.updateUser = function(id,data){
    return new Promise(function(resolve,reject){
        db.collection('utilisateurs').update({id: id},data);
    })
};
//-------------------------------------------------------------------------------------------------------------------


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
};
//-------------------------------------------------------------------------------------------------------------------


//---------------------------TESTE LA CONNEXION D'UN UTILISATEUR-----------------------------------------------------
mongoose.assertConnexion= function(mail,mdp){
    return new Promise(function(resolve,reject){
        db.collection('utilisateurs').findOne({adresse_email : mail}, function(err,user){
            if (err){
                return reject(err);
            }

            else if (user==null){
                return reject(err);
            }
            mongoose.comparePassword(user,mdp,function(err,isMatch){
                if (err){
                    return reject(err);
                }
                return resolve(isMatch);
            })
        })
    })
};
//-------------------------------------------------------------------------------------------------------------------



//-------------------COMPETENCES-------------------------------------------------------------------------------------
var Competences = mongoose.model('competences',competenceSchema);

var racine = new Competences({
    nom_comp : "Racine"
});
racine.save();

var robotique = new Competences({
    nom_comp : "Robotique",
    is_leaf : false,
    commentaire : "",
    url_utile : "", 
    parent: racine,
});
robotique.save();


var ros = new Competences({
    nom_comp : "ROS",
    is_leaf: true,
    commentaire : "description de la compétence ROS",
    url_utile : "liens utiles ros",
    parent : robotique,
});
ros.save();

var arduino = new Competences({
    nom_comp : "Arduino",
    is_leaf: true,
    commentaire : "description de la compétence Arduino",
    url_utile : "liens utiles arduino",
    parent : robotique,
});
arduino.save();

var jeu_video = new Competences({
    nom_comp : "Jeux Vidéos",
    is_leaf: false,
    commentaire : "",
    url_utile : "", 
    parent: racine,
});
jeu_video.save();

var moteur_de_jeu = new Competences({
    nom_comp : "Moteur de jeu",
    is_leaf: false,
    commentaire : "",
    url_utile : "",
    parent : jeu_video,
});
moteur_de_jeu.save();

var unity = new Competences({
    nom_comp : "Unity",
    is_leaf: true,
    commentaire : "description de la compétence Unity",
    url_utile : "liens utiles unity",
    parent : moteur_de_jeu,
}); 
unity.save();

var web = new Competences({
    nom_comp : "Web",
    is_leaf: false,
    commentaire : "",
    url_utile : "",
    parent : racine,
}); 
web.save();

var client = new Competences({
    nom_comp : "Client",
    is_leaf: true,
    commentaire : "",
    url_utile : "",
    parent : web,
}); 
client.save();

var best_practices = new Competences({
    nom_comp : "Best Practices",
    is_leaf: true,
    commentaire : "",
    url_utile : "",
    parent : web,
}); 
best_practices.save();

var serveur = new Competences({
    nom_comp : "Serveur",
    is_leaf: true,
    commentaire : "",
    url_utile : "",
    parent : web,
}); 
serveur.save();

var bdd = new Competences({
    nom_comp : "Base de données",
    is_leaf: false,
    commentaire : "",
    url_utile : "",
    parent : racine,
}); 
bdd.save();

var elasticsearch = new Competences({
    nom_comp : "ElasticSearch",
    is_leaf: true,
    commentaire : "Elasticsearch est un serveur utilisant Lucene pour l'indexation et la recherche des données. Il fournit un moteur de recherche distribué et multi-entité à travers une interface REST.",
    url_utile : "https://www.elastic.co/fr/products/elasticsearch",
    parent : bdd,
}); 
elasticsearch.save();

var no_sql = new Competences({
    nom_comp : "No-Sql",
    is_leaf: false,
    commentaire : "",
    url_utile : "",
    parent : bdd,
}); 
no_sql.save();

var sql = new Competences({
    nom_comp : "SQL",
    is_leaf: false,
    commentaire : "",
    url_utile : "",
    parent : bdd,
}); 
sql.save();

var oracle = new Competences({
    nom_comp : "Oracle",
    is_leaf: true,
    commentaire : "description de la compétence Oracle",
    url_utile : "liens utiles oracle",
    parent : sql,
}); 
oracle.save();

var mysql = new Competences({
    nom_comp : "MySql",
    is_leaf: true,
    commentaire : "description de la compétence MySQL",
    url_utile : "liens utiles MySQL",
    parent : sql,
}); 
mysql.save();

var postgresql = new Competences({
    nom_comp : "PostgreSql",
    is_leaf: true,
    commentaire : "description de la compétence PostgreSQL",
    url_utile : "liens utiles PostgreSQL",
    parent : sql,
}); 
postgresql.save();


var mongodb = new Competences({
    nom_comp : "MongoDB",
    is_leaf: true,
    commentaire : "description de la compétence MongoDB",
    url_utile : "liens utiles MongoDB",
    parent : no_sql,
}); 
mongodb.save();

var couchdb = new Competences({
    nom_comp : "CouchDB",
    is_leaf: true,
    commentaire : "description de la compétence CouchDB",
    url_utile : "liens utiles CouchDB",
    parent : no_sql,
}); 
couchdb.save();

mongoose.getSon = function(father){
    return new Promise(function(resolve,reject){
        db.collection('competences').find({"parent.nom_comp": father}).toArray(function(err,items){
            if (err) {
                return reject(err);
            }
            else{
                return resolve(items);
            }
        })
    })
};

mongoose.getLeaf = function(leaf){
    return new Promise(function(resolve,reject){
        db.collection('competences').findOne({nom_comp : leaf}, function(err,feuille){
            if (err){
                return reject(err);
            }
            else{
                return resolve(feuille);
            }
        })
    })
};

mongoose.getUserLeaf = function(leaf){
    return new Promise(function(resolve,reject){
        db.collection('utilisateurs').find({"competence" : leaf}).toArray(function(err,users){
            if (err){
                return reject(err);
            }
            else{
                //console.log(users);
                return resolve(users);
            }
        })
    })
}

mongoose.loadFromBDD = function(){
    return new Promise(function(resolve,reject){ 
        db.collection('competences').find({}).toArray(function(err,items){
            if (err) {
                return reject(err);
            }
            return resolve(items); 
        })
    })
};



/*
//---------------------------------------AJOUT COMPETENCE BDD-------------------------------------------------------------------
mongoose.promiseAddCompetencesToBDD = function(data){
    return new Promise(function(resolve,reject){
        db.collection('competences').findOne({nom_comp : data[0]}, function(err,comp){ //une competences est unique
            if (err){
                return reject(err);
            }
            
            else if (comp==null){
                var Competences = mongoose.model('competences', competenceSchema);
                var comp = new Competences({

                    nom_comp : data[0],

                    commentaire : data[1],


                    url_utile : data[4],

                    parent : data[5],

                });
                comp.save(function(err, competence) {
                    if (err){
                        throw err;
                    }
                    mongoose.disconnect();
                });
                return resolve(comp);
                
            }
            
            else{
                return reject("Skill Already in BDD"); //TO DO : gérer le cas où l'email existe déjà
            } 
        });
    })
};
//-------------------------------------------------------------------------------------------------------------------
*/

mongoose.connect('mongodb://localhost/projet2A',{useMongoClient : true}); //useMongoClient regle le problème du Warning
module.exports = mongoose;