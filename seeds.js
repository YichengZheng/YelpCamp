var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   name: "Salmon Creek",
        image: "https://images.pexels.com/photos/344102/pexels-photo-344102.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"     
    },
    {
        name: "Granite Hill", 
        image: "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg",
        description:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellatl"
    },
    {
        name: "Sugar Creek",
        image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "another creek"
    }
    ];

function seedDB(){
    // remove campGrounds
    Campground.remove({}, function(err){
        console.log("removed campgrounds");
            // add campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err,campground){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log("Added Data");
    //                 // create a comment
    //                 Comment.create({
    //                     text: "Great place",
    //                     author: "Helen"
    //                 }, function(err,comment){
    //                     if(err){
    //                         console.log(err);
    //                     }else{
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("created new comment");
    //                     }
    //                 });
    //             }
    //     })
    // });
    })


}

module.exports = seedDB;

