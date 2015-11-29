    pet_profile = new Mongo.Collection("pet profile");

if (Meteor.isServer) {
  Meteor.startup(function () {
    pet_profile.remove({});
    var bell_bio = "Bella comes from a dog loving family with two young kids. Bella is always excited for a friend to hang out with.";
    pet_profile.insert({name: "Bella", breed: 'Labrador', rating: 5, age: 4, bio: bell_bio, temperment: 'mild', imgURL : "bella.png"});
    Meteor.publish("all pets", function(){
      return pet_profile.find();
    });


  });
}
if (Meteor.isClient) {
  var pet_name = "Bella";
  Meteor.subscribe("all pets");


  Template.pet.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });




}


