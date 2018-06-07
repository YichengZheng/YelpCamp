// ========= Environment Setup =========
var express = require("express");
var app = express();
var mongoose = require ("mongoose");
var flash = require("connect-flash");
// flash, below line needs to be put before app.use(indexRoutes);
app.use(flash());

var seedDB = require("./seeds");
//seedDB();// seed the database

var passport = require("passport");
var LocalStrategy = require("passport-local");

// require methodoverride, and tells it what method to look for
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// below two lines of code are needed for body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
// tell express to search the content in public folder
// add dirname
app.use(express.static(__dirname + "/public"));

//default url address
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v7";

console.log(url);

// development database
// mongoose.connect("mongodb://localhost/yelp_camp_v7");

mongoose.connect(url);

// production database
// mongoose.connect("mongodb://yichengzheng:74314795mongo@ds249530.mlab.com:49530/yelpcampyz");



//========= Schema Setup ========= 
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var user = require("./models/user");

//========= Routes Setup with separate file========= 
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");



// Passport Configuration
app.use(require("express-session")({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// middleware to be used in every route [IMPORTANT]
// app.use(function...), function... will be used in every route
app.use(function(req, res, next){
    // req.user will contain information regarding currently logged in users
    // req.user will be undefined/empty if no user logged in
    // currentUser will be passed in as variable in res.locals and available in all templates
    // this user object will be passed in to the router, which contains info about logged in user
    // currentUser, error, and success will be used in all routes and templates, used in the header file
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
// take all campgroundRoutes, and append "/campgrounds" in front
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});