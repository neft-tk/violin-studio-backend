const express = require('express');
const router = express.Router();
const {User, Note, Event} = require('../models');

router.get("/",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    Event.findAll()
    .then(events => {
        const eventData = events.map((event) => event.get({ plain:true }));
        const eventsObj ={
            Events: eventData
        }
        eventsObj.logged_in=req.session.logged_in
        eventsObj.admin=req.session.admin
        res.render("home", eventsObj)
    })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})


router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/newNotes",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findAll()
    .then(users => {
        const userData = users.map((user) => user.get({ plain:true }));
        const usersObj ={
            Users: userData
        }
        usersObj.logged_in=req.session.logged_in
        res.render("newNotes", usersObj)
    })
})

router.get("/allStudents",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findAll()
    .then(users => {
        const userData = users.map((user) => user.get({ plain:true }));
        const usersObj ={
            Users: userData
        }
        usersObj.logged_in=req.session.logged_in
        res.render("allStudents", usersObj)
    })
})

router.get("/lessonNotes",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id, {
        include: [Note],
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("lessonNotes", hbsData)
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Note],
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("profile",hbsData)
    })
})

module.exports = router;