# Hiking Together

- [Demo](#Demo)
- [Introduction](#Introduction)
- [Getting Started](#Getting-Started)
- [Tools Used](#Tools-Used)
- [Structure](#Structure)

## Demo
<img src="https://i.imgur.com/ByNxoou.png">

Check out the live demo (The link is currently unavailable):
[**Hiking Together Live Demo**](http://3.143.106.247)

#### Test User:
- **Zaren**: 
  - Email: zaren@gmail.com 
  - Password: zarenzaren

- **Mark**:
  - Email: mark@gmail.com
  - Password: markmark
  
- **David**:
  - Email: david@gmail.com
  - Password: daviddavid

## Introduction

With the popularity of hiking activities and the increasing difficulty of traveling abroad in recent years, more and more people are venturing into the mountains. However, if you're alone, you may encounter various inconveniences such as high fuel costs, difficulty in finding enough people to share transportation costs, or the lack of assistance in case of accidents while hiking.

As a result, whether it's to find companions, share transportation expenses, or ensure one's safety, many people turn to social media platforms. For instance, they post hiking invitations on platforms like [PTT Hiking](https://www.ptt.cc/bbs/Hiking/index.html), use text messages in Line, or make posts in Facebook groups. However, these existing methods are not specifically designed for "grouping" or "hiking", each has its own drawbacks, and they attract different user demographics.

Therefore, the original intention behind **Hiking Together** is that, at least in Taiwan, there still isn't a dedicated group-finding platform specifically designed for hiking that serves everyone. Additionally, given my personal involvement in hiking activities, I wanted to approach this from the perspective of a fellow hiker who often struggles to find companions. Ultimately, the goal was to design a user-friendly online platform.

## Getting Started

These instructions will help you set up a local instance of Hiking Together for development and testing purposes.

### Prerequisites

- Node.js v18.18.0
- MongoDB Atlas account
- Docker and Docker-Compose (optional)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dadalakun/Hiking-Together.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Hiking-Together
    ```

3. Set up environment variables in a `.env` file in the **`backend/`** directory. Use the following template:
    ```
    MONGO_URL=mongodb+srv://YOUR_MONGO_URL_HERE
    SECRET=SECRET_KEY
    SALT_ROUNDS=8
    ```

### Running the Project

You can run the project either using Docker or using the scripts provided in the `package.json`.

**Using Docker** (if you have Docker and Docker-Compose installed):
1. Start the frontend and backend services using Docker Compose:
    ```bash
    docker-compose up -d
    ```
   
2. Open your browser and navigate to `http://localhost:80` to view the frontend application.

3. The backend API will be accessible at `http://localhost:5001`.

**Using Yarn Scripts**:

0. Modify `frontend/src/index.js:21`, replace the uri with `http://localhost:5001/`

1. Install the frontend dependencies:
    ```bash
    cd frontend && yarn install
    ```

2. Install the backend dependencies:
    ```bash
    cd backend && yarn install
    ```

3. Start the frontend application:
    ```bash
    yarn start
    ```

4. In another terminal, start the backend service:
    ```bash
    yarn server
    ```

5. After starting both the frontend and backend, open your browser and navigate to `http://localhost:3000` to view the application.

6. The backend API will be available at `http://localhost:5001`.

### Test Cases
There are test cases provided in `backend/src/testData.js`. To utilize these, navigate to `backend/src/mongo.js` and uncomment the `postInit(...);` line.

After this step, remember to comment back `postInit(...);` to prevent resetting data on every launch. Reboot the frontend process with yarn start to view the test cases.

#### Test User Credentials:
For testing purposes, the following users can be utilized:
- **Zaren**: 
  - Email: zaren@gmail.com 
  - Password: zarenzaren

- **Mark**:
  - Email: mark@gmail.com
  - Password: markmark
  
- **David**:
  - Email: david@gmail.com
  - Password: daviddavid

> **Note**: Each time the test cases are used to create a new user, the `userid` will differ. Ensure to sign out and sign back in to update the browser token with the new `userid`.

## Tools Used

#### **Backend**
1. **Node.js**: The backend server runtime environment.
2. **Apollo Server**: An open-source, spec-compliant GraphQL server.
3. **bcryptjs**: A library to help hash passwords.
4. **jsonwebtoken**: Implementation of JSON Web Tokens.
5. **dotenv-defaults**: Loading and merging default .env variables.
6. **mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

#### **Frontend**
1. **React**: A JavaScript library for building user interfaces.
2. **Apollo Client**: State management library that enables interaction with GraphQL server.
3. **i18next**: Internationalization-framework for translating the application.
4. **moment**: A JavaScript library to parse, validate, manipulate, and display dates and times.
5. **styled-components**: Tool to write CSS code for styling React components.

#### **General**
1. **Docker**: Used for containerizing the application ensuring consistency across different environments.
2. **AWS EC2**: Deployed on AWS's Elastic Compute Cloud.

## Structure

### Backend
<img src="https://i.imgur.com/olPuI7L.png" width="600" >

### Frontend
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
│   ├── locales
│   │   ├── en
│   │   │   └── translation.js
│   │   └── zh
│   │   │   └── translation.js
│   └── index.js
```

### Not Signed In

User can browse posts posted by other users without logging into the platform

<img src="https://i.imgur.com/CYpXdi1.png" width="600" >
<img src="https://i.imgur.com/qAhWzVA.png">

Support basic RWD

<img src="https://i.imgur.com/CWB3fcT.png">

### After Signin

<img src="https://i.imgur.com/KL94k0H.png" width="600" >

<img src="https://i.imgur.com/AMRGHc5.png">

#### Search post

<img src="https://i.imgur.com/YShssuA.png" width="700">

#### Add post

<img src="https://i.imgur.com/j2zdjWU.png" width="600">

#### Modify & remove post

<img src="https://i.imgur.com/hwBpXkj.png" width="600">