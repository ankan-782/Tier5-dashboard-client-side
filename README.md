Deployment instructions for this website:
* dashbord-client-side: https://tier5-dashboard.web.app/ (firebase)
  screenshots: ![image](https://user-images.githubusercontent.com/86654170/178763127-b31278e0-f27e-4831-8034-c3b0af376ea4.png)

* dashboard-server-side: https://frozen-thicket-45554.herokuapp.com/ (Heroku)
  screenshots: ![image](https://user-images.githubusercontent.com/86654170/178775672-084c5ac7-490e-483d-90bd-cec66bc9c0e2.png)

### **The System design approach of this website is given below:**

Functionality about this website:

* Here I have designed full website for desktop, tablet and for mobile screen also. Basically this site is fully responsive
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178783176-32e202f0-1d63-4108-bfd1-3e50e0361164.png)

* Here, I have created a dashboard system for managing users.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178746173-6985e13f-79f0-4bbe-a0b2-215963005567.png)

* Here, In dashboard, I have implemented pagination system. Here every page, user info loads with multiple rows. By selecting row number from dropdown menu Admin 
  can see multiple rows of user. 
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178750431-bff72a39-e61f-4c63-90b9-6207d7fa9693.png)

* Sorting system has been implemented in dashboard system with multiple parameters. Admin can see rows of user by name sorting, gender sorting, age sorting. Also
  Admin can see rows by ascending and descending order also.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178752554-b3ff8e9c-34bd-4957-abbc-8d54dd6baa62.png)

*** Has been implemented unique username checking functionality for brand new user registration, for 'add another user' via admin, for updating the already added users
    information. I handled every possible situation of checking unique username.
    screenshot: ![image](https://user-images.githubusercontent.com/86654170/178583879-867872c0-45ed-4281-952b-9137fb5f4604.png)
    screenshot: ![image](https://user-images.githubusercontent.com/86654170/178584148-c39571e3-95f6-4258-87cb-87c861a78fb8.png)

* I have created 30 dummy users and stored in mongo database.
  screenshot:

* I have implemented add, remove, update of user information for the dashboard.

* At first, I have created a authentication system where user can register themselves by providing some information.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178319551-5c8c26e9-b084-4649-addf-93d25d1ed9cc.png)

* User provides his name, username, age, gender email id, password, confirm password, country, device as his information. Here all the information stores
  in MongoDB except password.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178320655-a7118f2e-308d-4a32-afd8-85bc688bb275.png)

* Any user can signin in the website by providing just email id and password. Here the authentication functionality(login) is implemented by firebase.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178321408-8a0466b1-7bd9-454b-9bce-a529a589e84f.png)
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178321902-ea418df7-a6b7-4894-8445-9cb00905f372.png)

* So when a user provides his information for registration, just email id and password stored in firebase and as well as registration process completes with the 
  help of firebase. And rest of other user information stores in mongoDB.

* After registration or signin, an authenticated user redirects to the homepage.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178322568-aa249706-561a-4486-b9cf-da8bdccaa6ec.png)

* The user can browse only between homepage and profile page. 
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178322689-c45c60bf-7e32-4917-830d-76268d6715ac.png)

* The user can not go to the dashboard page. Because Dashboard should not be used by normal users. So providing admin route functionality I give restriction to 
  normal authenticated users to go to dashboard.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178322938-f2d73043-5b7b-432e-9487-f5cc4e862e84.png)

* Only an admin user can navigate all 3 pages including dashboard from navbar.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178323901-fffd7253-af41-4904-b08d-5a8e534796de.png)

* In Dashboard page, I have created 3 pages. An admin user can go all 3 pages. Here 3 pages are Add another user, Add another admin user, and main dashboard page.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178328621-c531a27b-4e40-4f51-91ce-ca3202652890.png)

* Firstly, I have created an authenticated admin user by providing role property in his information at mongoDb.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178330339-04c96588-f0b8-4d35-828c-92c894645900.png)

* An admin user can give another user to admin role by going to 'add admin user' page.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178330729-c12d9ec5-6ff0-47d1-8b85-a5dc95c8bb09.png)

* But when giving another user to admin role, Firebase will first check whether he is admin or not. It is implemented by Firebase JWT token.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178331526-e9cb0707-d1c1-49c7-8541-b7327d24a439.png)
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178331684-a7f3f41d-2176-47d1-9e25-4b41c48c3a52.png)

* An admin user can add another user by providing information which is the same when a normal user register himself.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178332054-9b991d9f-ecf4-4cdd-bc14-22cb3c562fcc.png)

* Here, also all the information stores in mongodb except password. Only email id and password stores in firebase by firebase authentication functionality.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178332347-7e4b1bcf-764e-413a-8c4c-6da9eb583a83.png)
  
* So by 2 ways, users information is stored on mongodb and firebase. One is via normal registration process and another is via dashboard add another user process.

* By "add another user" process when a user is registered on mongodb and firebase, that user also can signin to the website by firebase authentication.

* When any user login to the website, the user can not go to the login page again. It is done by authentication route.
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178332570-01467ef4-9aab-4556-8f11-aeb2e6ce296b.png)

* Users list in firebase authentication
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178757076-4c007721-6ab2-41ae-b8d2-267400ee7eb2.png)

* Users list in MongoDb
  screenshot: ![image](https://user-images.githubusercontent.com/86654170/178758705-9eba8cee-9bbd-4b36-8b33-3177ce15bca3.png)

* Here I could not implement DAU/WAU/MAU functionality for real time dashboard. I tried a lot by searching many websites and thinking by myself. I will definitely learn
  this functionality and will implement this of my another project. 