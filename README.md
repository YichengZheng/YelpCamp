# YelpCamp website

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
    
## RESTful Routes: 
### Campground:
| Name   | Path                | HTTP Verb | Purpose                                |
| ---    |  ---                |   ---     |   ---                                  |
| Index  | /campgrounds        | GET       | List all campgrounds                   |
| NEW    | /campgrounds/new    | GET       | Show new campground form               | 
| CREATE | /campgrounds        | POST      | Create a new campground, then redirect |
| SHOW   | /campgrounds/:id    | GET       | Show details of a specific campgrounds |
| EDIT   | /campgrounds:id/edit| GET       | Show edit form of a specific campground|
| UPDATE | /campgrounds/:id    | PUT       | Update the campground and redirect     |
| DESTROY| /campgrounds/:id    | DELETE    | Delete the campground and redirect     |