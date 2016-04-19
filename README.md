![](./public/images/joinme.png)

##Developer: Adrian Nuyda

##Description: 
Join Me is an application for users who would want to watch youtube cideos at the same time while inside a chatroom. Users will be able to either to <i>join</i> a chatroom or create a chatroom, which will also give them the choice to select a youtube video to watch by pasting the youtube ID onto the chatroom form.  The user who created the chatroom will become an admin of the chatroom, giving them the authorization to be the only person to kick out other users or change video and chatroom description. While inside the chatroom, users while have the ability to send messages to everyone inside the chatroom to discuss anything to their desire. 

##Planning

Trello: [Join Me - Trello](https://trello.com/b/fUf80dDX/joinme)

Application: [Join Me - Application](https://agile-cove-29324.herokuapp.com/#/)

###Wireframes

![](./public/assets/readme1.png)
![](./public/assets/readme2.png)
![](./public/assets/readme3.png)

###Models
- <b>User</b>
	- <b>email:</b> String
	- <b>username:</b> String
	- <b>picture_url:</b> String
- <b>Chatroom</b>
	- <b>title:</b> String
	- <b>creator:</b> [referencing Users]
	- <b>creatorName:</b> String
	- <b>video:</b> String
	- <b>description:</b> String
	- <b>userCapacity:</b> Number
	- <b>users:</b> [referencing Users]

##Languages, Technologies, and Frameworks

###Development:
- HTML
- CSS
- Bootstrap
- JavaScript

###Technologies:
- MongooseDB
- Express
- Angular.js
- Node.js
- Socket.io
- JWTs (Jason Web Tokens)

###Deployment:
- Heroku

###Other:
- Trello
- Balsamiq (Wireframes)

##Unsolved Problems/Future Features to Implement

1. Redirecting a user to public chatroom pages when kicked out of current chatroom.
2. Every chatroom should have their own set of users and specific messages being sent only to users inside that <b> specific</b> chatroom.
3. How to play a new video after the current one has finished.
4. Implement Youtube's API to search for videos instead of pasting youtube ID onto chatroom form.
5. Finding an alternative to using <b>$apply or $digest</b> from preventing page refreshes in order to render list of users and messages in chatroom.
6. How to save information of specific chatroom data if you refresh the page.