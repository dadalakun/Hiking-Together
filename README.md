# Hiking Together

## 1. Introduction

With the popularity of hiking activities and the increasing difficulty of traveling abroad in recent years, more and more people are venturing into the mountains. However, if you're alone, you may encounter various inconveniences such as high fuel costs, difficulty in finding enough people to share transportation costs, or the lack of assistance in case of accidents while hiking.

As a result, whether it's to find companions, share transportation expenses, or ensure one's safety, many people turn to social media platforms. For instance, they post hiking invitations on platforms like [PTT Hiking](https://www.ptt.cc/bbs/Hiking/index.html), use text messages in Line, or make posts in Facebook groups. However, these existing methods are not specifically designed for "grouping" or "hiking", each has its own drawbacks, and they attract different user demographics.

Therefore, the original intention behind developing Hiking Together is that, at least in Taiwan, there still isn't a dedicated group-finding platform specifically designed for hiking that serves everyone. Additionally, given my personal involvement in hiking activities, I wanted to approach this from the perspective of a fellow hiker who often struggles to find companions. Ultimately, the goal was to design a user-friendly online platform.

## 2. Run locally
<img src="https://i.imgur.com/FqhjKIF.png" width="400" >

#### Install dependencies
``` bash
> cd frontend
> yarn install
> cd ../backend
> yarn install
```
#### Set up env variables file under backend/
``` bash
> cd backend
> mkdir .env
```
*`.env`*：
``` bash=
# Database url
MONGO_URL = '${mongoose link}'
# Salt 
SECRET = 'MumiShinDonDon'
SALT_ROUNDS = 8
```
#### Leave backend/, launch backend program
``` bash
> yarn server
```
<img src="https://i.imgur.com/0IU0rH2.png" width="400" >

#### Use anotehr terminal, launch frontend program
``` bash
> yarn start
```
#### If success, the main panel will open
<img src="https://i.imgur.com/med8Bhs.png" width="600" >

#### There are some text cases written in *`backend/src/testData.js`*, you can go to *`backend/src/mongo.js`* and uncomment the last `postInit(...);`. Backend process will launch again automatically.
<img src="https://i.imgur.com/oeVKeKf.png" width="400" >

#### Comment back `postInit(...);` if you don't want your data to be reset every time.
#### Don't forget to use *`$ yarn start`* to reboot the frontend process, then you can see the test cases:
<img src="https://i.imgur.com/7kvodhy.png" width="600" >

#### The test cases will create three users for you, you can login to test every feature：
``` json
users = [
    {
        email: "mumi@gmail.com",
        password: "mumimumi"
    },
    {
        email: "mark@gmail.com",
        password: "markmark"
    },
    {
        email: "david@gmail.com",
        password: "daviddavid"
    },
]
```
* p.s. Every time we use the test cases to create a new user, its userid will be different, so you may want to sign out and sign in again, making sure your browser getting the new token generated from new userid.

## 3. Backend introduction
### Main structure
#### Use graphql-yoga to launch a GraphQLServer, taking care of frontend requests, and transferring data with MongoDB.

<img src="https://i.imgur.com/olPuI7L.png" width="600" >

##
* index.js

    Entry point of backend process, it will set up a connection with DB and run a server which is listening requests on 5001 port

* server.js

    Include most of the server configurations:graphql schema, resolvers, database model, JWT

* mongo.js

    Define the connection with Database
    
* models/index.js

    Define the Schema of Database. We generate the Model of User and Post here
    
* resolvers/ *.js & schema.graphql

    Define how graphql process data

##
### Framworks, plugins, modules
#### graphql-yoga, bcryptjs(encrypt password), jsonwebtoken(user authentication), nodemon, mongoose, babel, dotenv-defaults
#### 資料庫: MongoDB
##

### ref
* #### JWT
    * https://www.howtographql.com/graphql-js/6-authentication/
    * https://ithelp.ithome.com.tw/articles/10205426
* #### put environmental variables into `.env` ( like SECRET, SALT, etc. )
    * https://ithelp.ithome.com.tw/articles/10205786

## 4. Frontend Introduction
#### Use React.js to build frontend pages, and use Apollo Client to communicate with graphql at backend server.
##
### Frontend file structure
```
frontend
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── EditDial.js
│   │   ├── Post.js
│   │   └── SelectGenre.js
│   ├── containers
│   │   ├── App.js
│   │   ├── LogInModal.js
│   │   ├── MainBoard
│   │   │   ├── EditPost
│   │   │   │   ├── StepOne.js
│   │   │   │   ├── StepThree.js
│   │   │   │   ├── StepTwo.js
│   │   │   │   └── index.js
│   │   │   ├── PostDetail
│   │   │   │   └── index.js
│   │   │   ├── SearchBlock
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── SignUpModal.js
│   │   └── TopBar.js
│   ├── graphql
│   │   ├── index.js
│   │   ├── mutations.js
│   │   └── queries.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   ├── useDraft.js
│   │   └── usePost.js
│   └── index.js
```
##
### Not signed in
People can join and see posts posted by other people without logging in

<img src="https://i.imgur.com/CYpXdi1.png" width="600" >
<img src="https://i.imgur.com/qAhWzVA.png">


( * Support basic RWD )

<img src="https://i.imgur.com/CWB3fcT.png">

### Sign in
Sign in to use all features, including: post a hiking invitation, add post

#### Sign in / Sign up panel

<img src="https://i.imgur.com/ZHj2LDr.png">

#### Main panel after sign in

<img src="https://i.imgur.com/KL94k0H.png" width="600" >

<img src="https://i.imgur.com/AMRGHc5.png">

#### Search post

<img src="https://i.imgur.com/YShssuA.png" width="700">

### Add post

<img src="https://i.imgur.com/j2zdjWU.png" width="600">

### Modify & remove post

<img src="https://i.imgur.com/hwBpXkj.png" width="600">

##
### Framworks, plugins, modules
#### Reactjs, Apollo Client, material ui, moment, styled-components
##

### ref
* #### Chang chinese font
    * [customization font](https://mui.com/customization/typography/)
    * [mui theme provider](https://mui.com/customization/theming/#theme-provider)
    * https://blog.greenroots.info/3-quick-ways-to-add-fonts-to-your-react-app
    * [google font](https://fonts.google.com/noto/specimen/Noto+Serif+TC?subset=chinese-traditional)
* #### client side useToken & localStorage
    * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

* #### use localstorage to store login info.
    *  [How to add token header at client side](https://www.apollographql.com/docs/react/networking/authentication/)
    * [How to store token into localstorage](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)
    * [remove specific localstorage](https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript)
* #### Apollo Client query refetching
    * https://www.apollographql.com/docs/react/data/queries/#refetching
* #### material ui
    * https://mui.com/
* #### others
    * Duplicate **hide/show password icon**：
    <img src="https://i.imgur.com/ZLVPBjy.jpg" width=300 />
    
        Solution([stackoverflow](https://stackoverflow.com/questions/66703625/double-endadornments-when-using-self-defined-endadornment-in-material-ui-input)): Add following configuration into index.css

        ``` css
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }

        ```
    * [Disable CardActionArea ripple animation and onClick listener](https://stackoverflow.com/questions/61590919/material-ui-button-in-cardactionarea)
    * [Let MUI Typography identify newline](https://github.com/mui-org/material-ui/issues/9189)