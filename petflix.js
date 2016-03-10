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

Router.route('/list/filter', function() {
  this.render('filter');
})

Router.route('/login', function () {
  this.render('login');
});

Router.route('/walkerdashboard', function () {
  this.render('walkerdashboard');
});

Router.route('/walker-pastwalks', function () {
  this.render('walker-pastwalks');
});

Router.route('/chatsowner', function() {
  this.render('chatsowner');
});

Router.route('/chatswalker', function() {
  this.render('chatswalker');
});

Router.route('/chatsowner/:id', function() {
  var params = this.params;
});

Router.route('/chatswalker/:id', function() {
  var params = this.params;
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
}, {
  name: 'schedule'
});

Router.route('/:_id/profile', function() {
  
  var params = this.params;
  var id = params._id;
  pet_name = id;
  this.render('dog_profile_ownersv');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
}, {
  name: 'profile'
});

Router.route('/:_id/message', function() {
  
  var params = this.params;
  var id = params._id;
  schedule_id = id;
  this.render('message');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
}, {
  name: 'message'
});

Router.route('/:_id/messenger', function() {
  
  var params = this.params;
  var id = params._id;
  schedule_id = id;
  this.render('messenger');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
}, {
  name: 'messenger'
});

Router.route('/:_id/messengeradded', function() {
  
  var params = this.params;
  var id = params._id;
  schedule_id = id;
  this.render('messengeradded');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
}, {
  name: 'messengeradded'
});

Router.route('/:_id/schedule/today', function () {
  var params = this.params; // { _id: "bella" }
  var id = params._id; // "5"
  pet_name = id;
  this.render('today');
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
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


var messages = new Mongo.Collection("messages");
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
      return walkers.find();
    });
    Meteor.publish("messages", function(){ 
      return messages.find(); 
    });
    Meteor.publish("images", function(){ 
      return images.find(); 
    });


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
  Meteor.subscribe("messages");
  Meteor.subscribe("images");

  Template.registerHelper('equals', function (a, b) {
    return a === b;
  });  

  Template.registerHelper("profileTab", () => {
    if (Router.current().route.getName().endsWith("profile")) {
      return "btn-default dogtab activetab clean-link";
    } else if (Router.current().route.getName().endsWith("walkerdashboard")) {
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
    confirmed: function() {
      var schedule =  schedules.find({
                dogownerid: owners.findOne({owner: Meteor.userId()})._id,
                confirmed: true
              });
      return schedule;
    },
    schedule: function() {
      var schedule =  schedules.find({
                dogownerid: owners.findOne({owner: Meteor.userId()})._id,
                confirmed: false
              });
      return schedule;
    },
    pet: function() {
      var pet = pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.today.events({
    'click #confirm': function (event) {
      schedules.update(this._id, {
        $set: {confirmed: true}
      });
    },

    'click #reject': function (event) {
      schedules.remove(this._id)
    }
  });

  Template.week.helpers({
    schedule: function() {
      var schedule =  schedules.findOne({owner: Meteor.userId()});
      return schedule;
    },
    pet: function() {
      var pet = pet_profile.findOne({name: pet_name});
      return pet;
    }
  });

  Template.month.helpers({
    schedule: function() {
      var schedule =  schedules.findOne({owner: Meteor.userId()});
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
      // var users = [Meteor.userId(), pet.owner];
      return pet;
    },

    
  });

  Template.scheduler.rendered = function() {

    var pet =  pet_profile.findOne({name: Session.get('dogID')});
  }

  Template.scheduler.events({
    'click #button-message': function (event) {
      event.preventDefault();
      var id = owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner})._id;
      Router.go('messenger', {_id: id});

    },

    'click #backbutton': function (event) {
      event.preventDefault();
      Router.go('/'+ pet_name);

    },
  });

  Template.messengeradded.helpers({
    /* list of messages with dog owner*/ /**/
    chats: function() {
      var chats = messages.find({
        walkername: walkers.findOne({owner: Meteor.userId()}).name,
        dogownerid: owners.findOne({_id: schedule_id})._id,

      }, { sort: { time: 1}});
      return chats;
    },
    /* for modal */
    pet: function() {
      var pet =  et_profile.findOne({owner: owners.findOne({_id: schedule_id}).owner});
      return pet;
    }

  });


  Template.messengeradded.events({
    /*send message - add message to message database*/
    'click #message-send': function (event) {
      event.preventDefault();
      var message = $("#message-textarea").val();
      $("#message-textarea").val('');
      messages.insert({
        message: message,
        time: Date.now(),
        dogownername: owners.findOne({_id: schedule_id}).name,
        dogownerid: schedule_id,
        walkername: walkers.findOne({owner: Meteor.userId()}).name,
        dogname: pet_profile.findOne({owner: owners.findOne({_id: schedule_id}).owner}).name,
        walker: true,
      });
    },
    /*add walk time*/
    'click #confirm-button': function (event) {

      event.preventDefault();
      var time = $("#time").val();
      var date = $("#date").val();

      schedules.insert({
        time: time,
        date: date,
        owner: Meteor.userId(),
        dogownername: owners.findOne({_id: schedule_id}).name,
        dogownerid: schedule_id,
        walkername: walkers.findOne({owner: Meteor.userId()}).name,
        dogname: pet_profile.findOne({owner: owners.findOne({_id: schedule_id}).owner}).name,
        confirmed: false,
      });
      Router.go('/walkerdashboard');

    }
  });

  Template.messenger.helpers({
    chats: function() {
      var chats = messages.find({
        walkername: walkers.findOne({owner: Meteor.userId()}).name,
        dogownerid: owners.findOne({_id: schedule_id})._id,

      }, { sort: { time: 1}});
      return chats;
    },

    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }

  });


  Template.messenger.events({
    'click #message-send': function (event) {
      event.preventDefault();
      /*checks if there is an existing chat happening*/
      var chatslist = owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner}).chats;
      var bool;
      if(chatslist){
        bool = chatslist.indexOf(chatslist.filter(function (val) {
          return val.chat === walkers.findOne({owner: Meteor.userId()})._id;
        })[0]);
      } else {
        bool = -1;
      }
      /*if there isn't one creates a new one*/
      if(bool == -1){
        walkers.update({
          _id: walkers.findOne({owner: Meteor.userId()})._id
        }, {
          $push: {chats: {
            chat: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner})._id,
            name: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner}).name
          }
        }});

        owners.update({
          _id: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner})._id
        }, {
          $push: {chats: {
            chat: walkers.findOne({owner: Meteor.userId()})._id,
            name: walkers.findOne({owner: Meteor.userId()}).name,
          }
        }});
      }
      /*adds message*/
      var message = $("#message-textarea").val();
      $("#message-textarea").val('');
      messages.insert({
        message: message,
        time: Date.now(),
        dogownername: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner}).name,
        dogownerid: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner})._id,
        walkername: walkers.findOne({owner: Meteor.userId()}).name,
        dogname: pet_name,
        walker: true,
      });
    },
    /*request walk*/
    'click #confirm-button': function (event) {

      event.preventDefault();
      var time = $("#time").val();
      var date = $("#date").val();

      schedules.insert({
        time: time,
        date: date,
        owner: Meteor.userId(),
        dogownername: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner}).name,
        dogownerid: owners.findOne({owner: pet_profile.findOne({name: pet_name}).owner})._id,
        walkername: walkers.findOne({owner: Meteor.userId()}).name,
        dogname: pet_name,
        confirmed: false,
      });
      Router.go('/walkerdashboard');

    }
  });

  Template.chatswalker.helpers({
    message: function() {
      var temp = walkers.findOne({owner: Meteor.userId()}).chats;
      return temp;
    },
    
    /*for modal*/
    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }

  });

  Template.chatswalker.events({


  });

  Template.chatsowner.helpers({
    message: function() {
      var temp = owners.findOne({owner: Meteor.userId()}).chats;
      return temp;
    },

    pet: function() {
      var pet =  pet_profile.findOne({name: pet_name});
      return pet;
    }

  });

  Template.chatsowner.events({
    /*router override */
    'click #backbutton': function (event) {
      event.preventDefault();
      var name = pet_profile.findOne({owner: Meteor.userId()}).name;
      Router.go('profile', {_id: name});

    },
  });

  Template.message.helpers({
    /*finds all messages between owner and walker*/
    chats: function() {
      var chats = messages.find({
        dogownerid: owners.findOne({owner: Meteor.userId()})._id,
        walkername: walkers.findOne({_id: schedule_id}).name,
      }, { sort: { time: 1}});
      return chats;
    },
  });

  Template.message.events({
    /*send message from owner side*/
    'click #message-send': function (event) {
      event.preventDefault();
      var message = $("#message-textarea").val();
      $("#message-textarea").val('');
      messages.insert({
        message: message,
        time: Date.now(),
        dogownername: owners.findOne({owner: Meteor.userId()}).name,
        dogownerid: owners.findOne({owner: Meteor.userId()})._id,
        walkername: walkers.findOne({_id: schedule_id}).name,
        dogname: pet_profile.findOne({owner: Meteor.userId()}).name,
        walker: false,
      });
    },

  });

  Template.verifier.helpers({
    /*finds schedules*/
    schedule: function() {
      var schedule =  schedules.findOne({name: pet_name});
      return schedule;
    },
      pet: function() {
        var pet =  pet_profile.findOne({name: pet_name});
        return pet;
      }
  });

  Template.index.events({
    /*if not a walker then add walker. If a walker route to list*/
    "click #signup": function (event) {

      if(walkers.findOne({owner: Meteor.userId()})){
          Router.go('/list');
      } else {
        Router.go('/addwalker');
      }
    }, 
    /*if not an owner route to add owner. If an owner route to profile of their pet*/
    "click #signupown": function (event) {
      var profile = pet_profile.findOne({owner: Meteor.userId()});

      if(profile){
        Router.go('profile', {_id: profile.name});
      } else {
        Router.go('/addowner');
      }
    } 
  });

  /*adds walker*/
  Template.addwalker.events({
    "click #finishbutton": function (event) {
      event.preventDefault();
      var name = $("#name").val();
      var address = $("#address").val();
      var phone = $("#phone").val();
      walkers.insert({
        name: name,
        address: address,
        phone: phone,
        owner: Meteor.userId(), 
      });
      Router.go('/list');
    }
  });
  /*adds owner*/
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
        owner: Meteor.userId(), 
      });
      Router.go('/adddog');
    }
  });

  /*adds dog*/
  Template.adddog.events({
    /*image uploading*/
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
    /*adds dog with validation*/
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
          owner: Meteor.userId(), 
        });
        Router.go('profile', {_id: name});
      }
    }
  });


  Template.walkerdashboard.helpers({
    confirmed: function() {
      var schedule =  schedules.find({
                owner: Meteor.userId(),
                confirmed: true
              });
      return schedule;
    },
    schedule: function() {
      var schedule =  schedules.find({
                owner: Meteor.userId(),
                confirmed: false
              });
      return schedule;
    }
  });

}