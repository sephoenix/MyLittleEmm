# Project's name

My little eM

## Description

This app is a the first diary for a baby. The fathers can save their experiencies with their baby.

User details:
-Username
-Parent’s name
-Baby
-Baby name
-Birthday
-Page ate
-Page Type
-Who writes
-Page Type: Info, special date, anecdote
-Page photo
-Baby info
-Page public/private


## USER STORIES

**404** - As a user I want to see 404 page when I go to a page that doesn’t exist

**500** - As a user I want to see a error page when the server doesn't work

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and register buttons

**Register** - As a user I want to register on the webpage

**Login** - As a user I want to be able to log in on the webpage

**Logout** - As a user I want to be able to log out from the webpage

**User profile** - As a user I want to be able to see my profile and edit it

**Diary profile** - As a user I want to be able to see my diary and edit it

**Others diaries** - As a user I want to be able to see all the diaries of all the users

**Add a page** - As a user I want to be able to add a page to my diary

**See pages** - As a user I want to be able to see my diary

**Delete page** - As a user I want to be able to delete page from my diary

**Update page** - As a user I want to be able to update the page of my diary


## BACKLOG

**Like** - As a user I want to be able to give a like to pages of other diaries.

**Photo** - As a user I want to be able to upload images in my pages.

**Page filter** - As a user I want to be able to filter the pages by the type.



## Models

Page model

```js
{
    date: Date,
    type: Enum[Info, Special Date, Anecdote],
    Owner: { type: Schema.Types.ObjectId, ref: 'User' },
    whoWrites: Enum [Dad, Mom],
    babyWeight: Number,
    babyHeight: Number,
    photo: String,
    isPublic: Enum[ Yes, No],
}
```


User model

```js
{
    userName: String,
    userEmail: String,
    hashedPassword: String,
    dadName: String,
    momName: String,
    babyName: String,
    babyBirthday: Date,
}
```



### setup .env

you need to setup the `.env` like `.env.sample`
​

### Install the app

```
npm install
```

​

### Run the app

```
npm run start
```

​

## REST API endpoints

​
| Name                 | Method | Endpoint                      | Description                                      | Body                                  | Redirects               |
| -------------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | ----------------------- |
| Homepage             | GET    | /                             | See the main page                                |                                       |                         |
| Register form        | GET    | /auth/register                | See the form to register                         |                                       |                         |
| Register             | POST   | /auth/register                | Register a user                                  | { mail, password }                    | /user-profile           |
| Log in form          | GET    | /auth/login                   | See the form to log in                           |                                       |                         |
| Log in               | POST   | /auth/login                   | Log in the user                                  | { mail, password }                    | /zoo                    |
| Log out              | POST   | /auth/logout                  | Log out a user                                   |                                       | /                       |
| User profile         | GET    | /user-profile                 | See the profile page with editable form          |                                       |                         |
| User profile edited  | POST   | /user-profile/edit            | Send user's data changed                         | { user_email, password }              | /user-profile           |
| User page list       | GET    | /user-pages-list               | See user's pages                                  |                                       |                         |
| Other diaries                 | GET    | /otherdiaries                          | See all the diaries of all users                    |                                       |                         |
| Page add form         | GET    | /page/add                      | See form to upload a new page                     |                                       |                         |
| Page add              | POST   | /page/add                      | Upload a page to user’s diary                | { date, what, etc. }      | /user-pages-list/{pageid} |
| Page profile          | GET    | /diary/{pageid}                  | See the profile page with editable form          |                                       |                         |
| Page edit form        | GET    | /diary/{pageid}/edit             | See edit form with page's information   |                                       |                         |
| Page edit             | POST   | /{userid}/diaries/{pageid}/edit    | Add page's new information                        | { date, what, etc. }      | /user-pages-list/{pageid} |
| Page delete           | POST   | /{userid}/diaries/{pageid}/delete  | Delete page from user's diary                |                                       | /user-pages-list         |                       |
​
​

## Links

### MyLittleeM project

[Deployed project](...)

### Wireframes

[Balsamiq with Wireframes](https://balsamiq.cloud/s9ju8cz/pdg1zwn/r947B)                 

### Slides

[Project slides](...)
![image]()

This repository is the REST API for the [frontend repository XXX](link). It allows users to...
