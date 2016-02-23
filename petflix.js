Router.route('/', function () {
  this.render('index');
});

Router.route('/list', function () {
  this.render('list');
});

Router.route('/scheduler', function () {
  this.render('scheduler');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});

Router.route('/verifier', function () {
  this.render('verifier');
});

Router.route('/success', function () {
  this.render('success');
});

Router.route('/addowner', function () {
  this.render('addowner');
});

Router.route('/adddog', function () {
  this.render('adddog');
});

Router.route('/addwalker', function () {
  this.render('addwalker');
});

Router.route('/select', function () {
  this.render('select');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/walker-dashboard', function () {
  this.render('walker-dashboard');
});

Router.route('/walker-pastwalks', function () {
  this.render('walker-pastwalks');
});

// given a url like "/post/5"
Router.route('/:_id', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('detail');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});

Router.route('/:_id/schedule', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('schedule');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});

Router.route('/:_id/profile', function() {
  var params = this.params;
  var id = params._id;
  pet_name = id;
  this.render('dog_profile_ownersv');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});

Router.route('/:_id/schedule/today', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('today');
});

Router.route('/:_id/schedule/week', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('week');
});

Router.route('/:_id/schedule/month', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('month');
});
/*
Tracker.autorun(function () {
  var current = Router.current();
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});
from: http://www.curtismlarson.com/blog/2015/11/11/iron-router-scroll-to-top/ */

var pet_profile = new Mongo.Collection("pet profile");
var schedules = new Mongo.Collection("schedules");
var owners = new Mongo.Collection("owners");
var walkers = new Mongo.Collection("walkers");
var pet_name = "Bella";
var schedule_time = "Thursday 5:00pm";
var schedule_id;

var imageStore = new FS.Store.GridFS("images", {
  // mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB // optional, default 5
   chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
  //                       // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    pet_profile.remove({});
    schedules.remove({});
    owners.remove({});
    Images.remove({});
    walkers.remove({});
  
    var bella_badges = [{ask: "don't tie me up", icon: "fa-link"},{ask:"only feed me real meat products", icon:"fa-cutlery"},{ask: "don't put me in a bag", icon: "fa-suitcase"}];
    var bell_bio = "Bella comes from a dog loving family with two young kids. Bella is always excited for a friend to hang out with.";
    var bella_comments = [{walker: "Leonard", rating:"5star.png", date:"Oct 2015", comment:"Bella was so energetic and fun to have out with me! She made my day!"},
    {walker:"Sheldon",rating:"4halfstar.png", date:"Nov 2015", comment:"Bella is awesome, but she's a bit too curious of everything."}];
    pet_profile.insert({name: "Bella", breed: 'Labrador', rating: "5star.png", age: 4, bio: bell_bio, temperament: 'Mild', imgURL : "bella.png",
      comments: bella_comments,badges: bella_badges, class: "C.png", distance: "1.7 miles", location:"658 Escondido Rd, Stanford, CA 94305", quote: "I can stand on both my hind legs!"});
    
    var max_badges = [{ask: "don't put me in a bag", icon: "fa-suitcase"},{ask:"only feed me real meat products", icon:"fa-cutlery"}];
    var max_bio = "Max loves people";
    var max_comments = [{walker:"Howard",rating:"4halfstar.png", date:"Dec 2015", comment:"Trust me, Max will be your best friend."}];
    pet_profile.insert({name: "Max", breed: 'Golden Retriever', rating: "4star.png", age: 3, bio: max_bio, temperament: 'Energetic', imgURL : "max.png",
      comments:max_comments, badges: max_badges, class: "D.png", distance: "0.5 miles", location:"473 Via Ortega, Stanford, CA 94305", quote: "I just love people."});

    var lily_badges = [{ask: "don't tie me up", icon: "fa-link"},{ask:"don't leave me alone", icon:"fa-frown-o"},{ask: "don't put me in a bag", icon: "fa-suitcase"}];
    var lily_comments = [{walker: "Penny", rating:"5star.png", date:"Aug 2015", comment:"Lily is such an amazing girl! I can't wait to see her again!"}];
    pet_profile.insert({name: "Lily", breed: 'Labrador', rating: "5star.png", age: 4, bio: "Lily is the best dog in the world.", temperament: 'Crazy', imgURL : "lily.png",
      comments: lily_comments, badges: lily_badges, class: "B.png", distance: "1.3 miles",location:"557 Mayfield Ave Stanford, CA 94305", quote: "I'll run laps around you!"});
  
    var billy_badges = [{ask: "Why am I here?", icon: "fa-link"},{ask:"I'm a goat!", icon:"fa-frown-o"},{ask: "Fine woof.", icon: "fa-suitcase"}];
    var billy_comments = [{walker: "Alex", rating:"3star.png", date:"Sep 2015", comment:"Billy is a goat! Not a dog."}];
    pet_profile.insert({name: "Billy", breed: 'Goat', rating: "3star.png", age: 6, bio: "Billy is a goat.", temperament: 'Goat', imgURL : "billy.png",
      comments: billy_comments, badges: billy_badges, class: "D.png", distance: "1 miles",location:"500 Mayfield Ave Stanford, CA 94305", quote: "Why am I here? I'm a goat!"});

    schedules.insert({name: "Bella", pickuplocation: "Stanford", time: "5:30 P.M.", owner: "Landay", confirmed: "yes"});
    /* change owner to walker and such */
    schedules.insert({name: "Bella", pickuplocation: "California Ava", time: "6:30 P.M.", owner: "Landay", confirmed: "yes"});
    schedules.insert({name: "Max", pickuplocation: "Stanford", time: "5:30 P.M.", owner: "Landay", confirmed: "no"});
    schedules.insert({name: "Lily", pickuplocation: "Stanford", time: "5:30 P.M.", owner: "Landay", confirmed: "no"});
    schedules.insert({name: "Billy", pickuplocation: "Stanford", time: "5:30 P.M.", owner: "Landay", confirmed: "no"});

    owners.insert({name: "Landay", address: "HCILYFE", phone: "6501234355"});

    Meteor.publish("all pets", function(){
      return pet_profile.find();
    });
    Meteor.publish("schedules", function(){
      return schedules.find();
    });
    Meteor.publish("owners", function(){
      return owners.find();
    });
    Meteor.publish("walkers", function(){
      return owners.find();
    });

    Meteor.publish("images", function(){ return Images.find(); });

    Images.allow({
      'insert': function () {
    // add custom authentication code here
        return true;
      },
      'download': function () {
        return true;
      },
      'remove': function() {
        return true;
      },
      'update': function() {
        return true;
      }
    });
  });
}



if (Meteor.isClient) {

  Meteor.subscribe("all pets");
  Meteor.subscribe("schedules");
  Meteor.subscribe("owners");
  Meteor.subscribe("walkers");
  Meteor.subscribe("images");

  Template.registerHelper("profileTab", () => {
    if (Router.current().route.getName().endsWith("profile")) {
      return "btn-default dogtab activetab clean-link";
    } else if (Router.current().route.getName().endsWith("walker-dashboard")) {
      return "btn-default dogtab activetab clean-link";
    }
    return "btn-default dogtab clean-link";
  });

  Template.registerHelper("scheduleTab", () => {
    if (Router.current().route.getName().indexOf("schedule") > -1) {
      return "btn-default dogtab activetab clean-link";
    } else if (Router.current().route.getName().endsWith("walker-pastwalks")) {
      return "btn-default dogtab activetab clean-link";
    }
    return "btn-default dogtab clean-link";
  });

  Template.pet.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.dog.helpers({
    pets: function () {
      return pet_profile.find({});
    },

    names: function () {
      var pet_names = Session.get('name');
      return pet_profile.find({name: pet_names});
    },

    bool: function () {
      return Session.get('bool');
    }
  });

  Template.dog.events({
    "submit .search": function (event) {
      event.preventDefault();
      var text = event.target.text.value;
      Session.set('bool', true);
      if(text == "") {
        Session.set('bool', false);
      }
      Session.set('name', text);
    }
  })

  Template.profile.helpers({
    pet: function() {
      var pet = pet_profile.findOne({name: pet_name});
      return pet;
    }
  })

  Template.today.helpers({
    schedule: function() {
      var schedule =  schedules.findOne({name: pet_name});
      return schedule;
    },
    pet: function() {
      var pet = pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.week.helpers({
    schedule: function() {
      var schedule =  schedules.findOne({name: pet_name});
      return schedule;
    },
    pet: function() {
      var pet = pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.month.helpers({
    schedule: function() {
      var schedule =  schedules.findOne({name: pet_name});
      return schedule;
    },
    pet: function() {
      var pet = pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.confirmation.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.cancellation.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.scheduler.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.scheduler.events({
    'click .dropdown-menu': function (event) {
      $('#chosen').text( $(event.target).text());
      schedule_time = $(event.target).text();
    },

    'click #confirm-button': function (event) {

      var pickup = $('input:radio[name=pickup]:checked').val();

      if (pickup == ""){
        pickup = $('input:text[name=user-enter]').val();
      }
      if(schedule_id!=null){
        schedules.remove({_id: schedule_id});
      }
      schedule_id = schedules.insert({name: pet_name, pickuplocation: pickup, time: schedule_time, confirmed: "no"});

    },
    'keypress #message-textarea': function (event) {
      if (event.which === 13) {
        var $messagesContainer = $("#messages-box");
        var $message = $("#message-textarea");
        if (!$message.val()) return;

        if ($messagesContainer.hasClass("has-messages")) {
          $messagesContainer.append("<br>You: " + $message.val());
          $message.val('');
        }
        else {
          $messagesContainer.html("You: " + $message.val());
          $messagesContainer.addClass("has-messages");
          $message.val('');
        }
      }
    },
    'click #message-send': function (event) {
        var $messagesContainer = $("#messages-box");
        var $message = $("#message-textarea");
        if (!$message.val()) return;

        if ($messagesContainer.hasClass("has-messages")) {
          $messagesContainer.append("<br>You: " + $message.val());
          $message.val('');
        }
        else {
          $messagesContainer.html("You: " + $message.val());
          $messagesContainer.addClass("has-messages");
          $message.val('');
        }
    }    
  });

  Template.verifier.helpers({
    schedule: function() {
      var schedule =  schedules.findOne({name: pet_name});
      return schedule;
    },
      pet: function() {
        var pet =  pet_profile.findOne({name: pet_name});
        return pet;
      }
  });

  Template.success.helpers({
      pet: function() {
        var pet =  pet_profile.findOne({name: pet_name});
        return pet;
      }
  });
  Template.addwalker.events({
    "click #finishbutton": function (event) {
      event.preventDefault();
      var name = $("#name").val();
      var address = $("#address").val();
      var phone = $("#phone").val();
      console.log("fickedaddy");
      walkers.insert({
        name: name,
        address: address,
        phone: phone,
      });
      Router.go('/list');
    }
  });

  Template.addowner.events({
    "click #finishbutton": function (event) {
      event.preventDefault();
      var name = $("#name").val();
      var address = $("#address").val();
      var phone = $("#phone").val();
      owners.insert({
        name: name,
        address: address,
        phone: phone,
      });
      Router.go('/adddog');
    }
  });


  Template.adddog.events({
    "change #picture-upload": function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function(err, fileObj) {
          if (err) {
          //handle error
          }
          else {
            $("#pID").val(fileObj._id);
          }

        });
      });
    },
    "click #finishbutton": function (event) {
      event.preventDefault();
      var $emptyInputs = [];
      var $hasInput = [];
      $(".doginput :input").each(function() {
        if (!($(this).val())) $emptyInputs.push($(this));
        else $hasInput.push($(this));
      })
      if ($emptyInputs.length) {
        for (var i = 0; i < $emptyInputs.length; i++) {
          $emptyInputs[i].parent().addClass("has-error has-feedback");
        }
        for (var i = 0; i < $hasInput.length; i++) {
          $hasInput[i].parent().removeClass("has-error has-feedback");
        }
      }
      else { // Everything has input - proceed
        var name = $("#name").val();
        var breed = $("#breed").val();
        var age = $("#age").val();
        var description = $("#description").val();
        var temperament = $("#temperament").val();
        var bio = $("#bio").val();
        
      // now find the dog in the database, and put its url as the imgurl
        pet_profile.insert({
          name: name,
          breed: breed,
          age: age,
          quote: description,
          temperament: temperament, //fucking jack spelled temperament wrong in the original database and it fucked everything up
          bio: bio,
          rating: "5star.png",
          distance: "1.7 miles",
          imgURL: "cfs/files/images/" + $("#pID").val(), // fuck yeah
          class: "C.png",
        });
        Router.go('/list');
      }
    }
  });

  Template.schedule.helpers({
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.select.helpers({
    pets: function () {
      return pet_profile.find({});
    }
  });


}