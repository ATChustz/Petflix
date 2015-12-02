Router.route('/', function () {
  this.render('login');
});

Router.route('/list', function () {
  this.render('list');
});

// given a url like "/post/5"
Router.route('/:_id', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('detail');
});


pet_profile = new Mongo.Collection("pet profile");
var pet_name = "Bella";


if (Meteor.isServer) {
  Meteor.startup(function () {
    pet_profile.remove({});
    var lily_comments = [{walker: "Penny", rating:"5star.png", date:"Aug 2015", comment:"Lily is such an amazing girl! I couldn't wait to meet her again!"}];
    pet_profile.insert({name: "Lily", breed: 'Labrador', rating: "5star.png", age: 4, bio: "Lily is the best dog in the world.", temperment: 'crazy', imgURL : "lily.png",comments: lily_comments});
    
    
    var bell_bio = "Bella comes from a dog loving family with two young kids. Bella is always excited for a friend to hang out with.";
    var bella_comments = [{walker: "Leonard", rating:"5star.png", date:"Oct 2015", comment:"Bella is so energetic to hand out with me! She made my day!"}, 
    {walker:"Sheldon",rating:"4halfstar.png", date:"Nov 2015", comment:"Bella is awesome, though she is too curious of everything."}];
    pet_profile.insert({name: "Bella", breed: 'Labrador', rating: "5star.png", age: 4, bio: bell_bio, temperment: 'mild', imgURL : "bella.png",comments: bella_comments});
    

    var max_bio = "Max loves people";
    var max_comments = [{walker:"Howard",rating:"4halfstar.png", date:"Dec 2015", comment:"Trust me, Max will be your best friend."}]
    pet_profile.insert({name: "Max", breed: 'Golden Retriever', rating: "4star.png", age: 3, bio: max_bio, temperment: 'energetic', imgURL : "max.png",comments:max_comments});
    Meteor.publish("all pets", function(){
      return pet_profile.find();
    });
  });
}
if (Meteor.isClient) {
  Meteor.subscribe("all pets");


  Template.pet.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.dog.helpers({
    pets: function () {
      return pet_profile.find({});
    }

  });

  Template.confirmation.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

}


