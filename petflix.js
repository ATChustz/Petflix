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
    var bell_bio = "Bella comes from a dog loving family with two young kids. Bella is always excited for a friend to hang out with.";
    pet_profile.insert({name: "Bella", breed: 'Labrador', rating: '5star.png', age: 4, bio: bell_bio, temperment: 'mild', imgURL : "bella.png"});
    var max_bio = "Max loves people";
    pet_profile.insert({name: "Max", breed: 'Golden Retriever', rating: '4star.png', age: 3, bio: max_bio, temperment: 'energetic', imgURL : "max.png"});
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


