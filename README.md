## Guftugu 
(Urdu word for conversation)

## Description
it is edited
An online, virtual community for elderly South Asian (Urdu-speaking) individuals. There should already be some pre-existing groups/forums they can join after becoming a member. Members can make their own subgroups. Creators of subgroups default to being admins, they can add other users who have joined the group to become admins. Admins will have access to editing the group’s calendars of events. Admins can create calendar events to notify all members of the group—the event will basically hold a zoom link where everyone can meet and talk (kinda like clubhouse)

This app will be built using the MERN Stack

Models:

- Users (id: String, name: String, password: String, groups: Array of strings (strings will be the groupId))
- Groups (name: String, members: Array of strings (strings will be userIds), events: Array of strings (strings will be eventIds)
- Events (id: String, name: String, description: String, url: String)

Routes: 


URL | HTTP Verb | Action
-- | -- | --
/ | GET | landing page (if logged in--shows welcome page)
/login | GET | login route (if logged in, then redirect to /) that allows users to sign in/up
/groups | GET | groups route that shows list of all groups
/myGroups | GET | myGroups route that shows list of all groups user is a part of
/:id | GET/POST/PUT | specific group route (shows calendar of events in this group), announcements, and list of all the threads. Route where subgroups will be posted to and where edits can be made.
/:id/:threadId | GET/POST/PUT/DELETE | specific thread route (shows calendar of events in this thread), announcements, and messages. Route where the threads/subgroup messages/calendar events are posted and edits can be made, and where the thread can be deleted
/:id/:threadId/newEvent | GET | new calendar event route where you can create an event for this subgroup
/:id/:threadId/:eventId | GET/POST/PUT/DELETE | specific calendar event route where you can view the event and its details, and post/put the edits and delete the event also
/:id/:threadId/:eventId/edit | GET | edit route for the calendar event where you can edit the event and its details
/:id/:threadId/:eventId/delete | GET | delete route for the calendar event where you can delete the event and its details


## Wireframes
Need to spend time fleshing out design. I feel like the more I develop the app, I'll get a better feel of the design.

![Screenshot 2022-11-01 at 10 01 13 PM](https://media.git.generalassemb.ly/user/43690/files/97969410-2c94-43b2-8b1f-8a9c5dbdde5b)
![Screenshot 2022-11-01 at 10 03 32 PM](https://media.git.generalassemb.ly/user/43690/files/5a274b63-5a44-46f5-af35-e51a989f30a9)
![Screenshot 2022-11-01 at 10 05 35 PM](https://media.git.generalassemb.ly/user/43690/files/0c05dbd6-36a4-498e-86dd-a75f839a2e37)
![Screenshot 2022-11-01 at 10 06 17 PM](https://media.git.generalassemb.ly/user/43690/files/b897de12-47f0-440a-b864-1540f8650757)
![Screenshot 2022-11-01 at 10 07 28 PM](https://media.git.generalassemb.ly/user/43690/files/c4921029-bb71-4901-83dd-80343bbca581)
![Screenshot 2022-11-01 at 10 08 27 PM](https://media.git.generalassemb.ly/user/43690/files/52fac865-9ab9-4e0d-b3fb-d8d3ff073be4)



## User Stories

- As a user, I want to be able to hit the main website link and be told to login/sign up as a member
- As a member, after logging in, I want to see just a personalized welcome page--any messages I missed in a thread, upcoming events
- As a member, I want to enter into a group and be able to join any of the subgroups/threads/discussions so I stay notified
- As a member I want to be able to make a subgroup/thread 
- As a creator of a subgroup, I want to be able to make other people admins of the subgroup
- As an admin of a subgroup, I want to be able to schedule calendar events for discussions (these calendar events will be basically zoom meetings where everyone can meet and greet)
- As creator of a calendar event, I want to be able to edit the event

### MVP Goals
- Responsive Website
- login successfully
- Perform full CRUD with calendar events

### Stretch Goals
- Add a chatroom/box to the subgroups/threads for members to post messages
- Use google oauth to create users
- Use cookies and jwt for keeping in a logged session for a user (currently using useContext)
- Connect to Zoom API and be able to make zoom meetings right there on the fly

