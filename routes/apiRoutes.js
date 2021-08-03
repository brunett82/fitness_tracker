const router = require('express').Router();
let db = require('../models')


    router.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (err, workouts) => {
            if(err){
                console.log(err);
            } else {
                res.json(workouts)
            }
        });
    });

    router.post("/api/workouts/:workout", ({ params, body }, res) => {
        db.Workout.findOneAndUpdate({ _id: params.id},
            {$push: {excercises:body }},
            { upsert: true, useFindandModify:false},
            updatedWorkout => {
            res.json(updatedWorkout);
        })
    });
  
    router.post('/api/workouts', (req,res) => {
        db.Workout.create({}).then(newWorkout => {
            res.json(newWorkout);
        });
    });

    router.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    }); 
    
    module.exports = router