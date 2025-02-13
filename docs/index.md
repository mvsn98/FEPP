This is a MERN full stack based website that I created to make it easier to share details of my projects, qualifications and work experience with potential employers. One can download my whole Resume from this website. Further, a person is also able to send me a personal message / feedback by clicking on the "Contact US" button.

This Application also comes with an Admin Control Panel in which members of "Team Manish Varma", who are responsible for maintenance of this project, can log in to view all the feedback messages that people may leave on my profile over time. Accounts cannot be registered by anonymous users and the only a way person can get their account created on this portal is by contacting me personally. This is because, new accounts can only be created from inside of Admin Control Panel using a pre-registered account. 

The Public Profile has the following features:

1. Uses semi-transparent Navbar with Smooth Scroll & Scroll Spy enabled for every segment of page that it enlists.
2. Provides links to my social media accounts in a bar that sticks to the left border of screen.
3. A Visitor can download my full Resume by clicking a button in "Introduction" section.
4. Visitors can also leave their respective feedbacks on my Profile, by clicking on "Contact Us" button and specifying their name, e-mail address
   and message.
5. Public Profile consists of 4 sections - Introduction, Qualifications, Work Experience and Contact Details.

The Admin Control Panel (ACP) has the following features: 

1. Access through Login screen that requires user to enter their username and password.
2. If user doesn't remember their password, they can click on "Forgot your password?" feature at Login Screen to get their password reset and sent 
   to them over their registered e-mail address.
3. Inside ACP, the Navbar features various menu items such as "Edit A Profile", "Create New Account" and "Logout".
4. E-mail ID, Password and Username of a user-account can be edited inside "Edit A Profile" component.
5. New User Account can be created by the Logged in user as well.
6. A table enlists all the Feedback messages that people may leave on my profile over-time.
7. It is possible to search using names of visitors and rank the Feedback messages accordingly.
8. It is also possible to Reply to these Feedbacks, by clicking on "Reply" button on each of them. This pops open a Modal where we can specify
   details of reply and send that as an e-mail to that visitor.
9. Messages to which any Logged in user replies, are turned Green. Otherwise, they're considered to be "Pending" and have a background color of 
   "red".
10. Therefore, there exist 2 checkboxes, that allow one to see all "Pending" and "Answered" Feedback messages respectively, and results of these      lists reflect upon the original list returned by Search option.
11. Only 3 feedback messages appear on each page. Pagination is taken care of so that it integrates well with searching & filtering mechanism.
12. Feedbacks are added and deleted in real time using SocketIO.
13. User is always "Welcomed" when they Log into the ACP. 

At the backend, this application uses JSON Web Tokens to initiate user logins and validate user requests and an Express server to host the front-end of project and for server-side routing. MongoDB has been used as the database to store feedback messages and user accounts. The main Profile page has been created with the help of Bootstrap, CSS and Vanilla Javascript. The front-end of Admin Control Panel has been created using React, React-Router (for client-side routing), Redux (for state management) and CSS. 
