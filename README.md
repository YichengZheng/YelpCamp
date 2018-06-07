# YelpCamp website
A functional website allowing registered user to post campground pictures around the world along with their comments and description.
Site is deployed to Heroku and backend MongoDB database is hosted on mLab.

## Package installed: 
    "body-parser": "^1.18.3",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.1",
    "express": "^4.16.3",
    "express-session": "^1.15.6",
    "method-override": "^2.3.10",
    "mongoose": "^5.1.2",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.0",
    "request": "^2.87.0"
    
## Folders Description:
models: Consists of Mongoose Schema data objects for campgrounds, users, and comments. These are imported in the app.js and associated files in the route folder
routes: Consists of RESTful routes definition for campgrounds and comments. The index.js file contains the logic handling user register, login, and logoff routes using functions from passport.js
public/stylesheets: custom CSS style sheets
middleware: constructs middleware object used in routes file to determine whether user has logged in and whether the specific camground/comment belongs to the current user in session
views: contain the .ejs file generating HTML for each pages. These are called by the res.render() function in the route files
views/partial: common header and footer ejs file shared among all .ejs file


## RESTful Routes: 
### Campgrounds:
| Name   | Path                | HTTP Verb | Purpose                                |
| ---    |  ---                |   ---     |   ---                                  |
| Index  | /campgrounds        | GET       | List all campgrounds                   |
| NEW    | /campgrounds/new    | GET       | Show new campground form               | 
| CREATE | /campgrounds        | POST      | Create a new campground, then redirect |
| SHOW   | /campgrounds/:id    | GET       | Show details of a specific campgrounds |
| EDIT   | /campgrounds:id/edit| GET       | Show edit form of a specific campground|
| UPDATE | /campgrounds/:id    | PUT       | Update the campground and redirect     |
| DESTROY| /campgrounds/:id    | DELETE    | Delete the campground and redirect     |

### Comments: 
| Name   | Path                                      | HTTP Verb | Purpose                                |
| ---    |  ---                                      |   ---     |   ---                                  |
| NEW    | /campgrounds/:id/comments/new             | GET       | Show new comment form                  | 
| CREATE | /campgrounds/:id/comments/                | POST      | Create a new campground, then redirect |
| EDIT   | /campgrounds/:id/comments/:comment_id/edit| GET       | Show edit form of a specific comment   |
| UPDATE | /campgrounds/:id/comments/:comment_id/    | PUT       | Update the comments and redirect       |
| DESTROY| /campgrounds/:id/comments/:comment_id/    | DELETE    | Delete the campground and redirect     |

* Users needs to be signed in and requires to be the author of campgrounds/comments to edit and delete. These are handled by middleware via passport.js