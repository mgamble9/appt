
const mongoose = require("mongoose")
const User = mongoose.model("User")
const Appt = mongoose.model("Appt")

module.exports = {
  login: (req, res) => {
    User.findOne({name: req.body.name})
        .then(data => {
          if(data){
            // save to session
            req.session.user_id = data._id;
            console.log("user found in db")
            console.log(req.session)
            res.json(true);
          } else {
            let new_user = new User({name: req.body.name});
            new_user.save()
              .then(user => {
                //save into session
                console.log("user entered into db");
                req.session.user_id = new_user._id;
                res.json(true);
              })
              .catch(err => res.status(500).json(err))
          }
        })
  },


  add_appt: (req, res) => {
    Appt.findOne({id: req.body._id})
        .then(data => {
          if(data){
            console.log("appt already exists.");
            // res.redirect('/new_appt');
            res.json(false)
          } else {
            let new_appt = new Appt({patient: req.body.patient,
                              complaint : req.body.complaint,
                              date : req.body.date,
                              time : req.body.time,
                                });

            console.log(new_appt);
            new_appt.save()
              .then(question => {
                res.json(true)
              })
              .catch(err => res.status(500).json(err))
          }
        })
      },

      delete_appt: (req,res) => {
        console.log("POST DATA", req.body);
        Appt.remove({_id: req.body._id})
          .then(data => {
            res.json(true)
            console.log("appt successfully deleted")
          })
          .catch(err => res.status(500).json(err))
        },
   //


  get_appt_list: (req,res) => {
    Appt.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err))
  },

  get_logged_in_user: (req, res) => {
    if(req.session.user_id) {
      console.log("getting user");
      // res.json(USERS[0]);
      User.findOne({_id: req.session.user_id})
        .then(user => {
          console.log(user);
          res.json(user);
        })
        .catch(err => res.status(500).json(err))
    } else {
      res.json(false);
    }
  },





  logout: (req,res) => {
    req.session.destroy();
    // console.log(req.session.name)
    res.redirect("/");
  }
}
