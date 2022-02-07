# Wp1101 Final Project
### 登山健行揪團平台
[Deploy 網址](https://mountainfriend.herokuapp.com/)

## 1. 動機與題目敘述
隨著登山活動的盛行，加上這一兩年出國旅遊漸漸成為時代的眼淚，越來越多人開始嘗試往山裡走。然而，能夠找到同伴還好說，如果是一個人的話常會遇到許多不方便之處 (例如油錢貴酸酸、包車湊不到人數、摔下山沒人幫你叫直升機等)。

因此不管是為了尋找同伴、湊車錢又或者想確保自己的安全，許多人會上社群平台揪人，如在 [PTT Hiking](https://www.ptt.cc/bbs/Hiking/index.html) 發揪人文、在百人登山 Line 群以文字訊息的方式徵同伴、或是在 FB 登山社團中發文，然而上述現存方法皆不是專門為「揪團」或者是「登山健行」特別設計的，各自有各自的缺點，並且有各自的客群。

以 PTT Hiking 版來說，一個硬傷是使用者較少、年齡層較侷限，並且對發文的人來說也不好上手；臉書社團的情況則是資訊太雜，揪人文沒有統一格式容易被洗掉；至於 Line 群則不僅有人數上限，想要加入還要先認識裡面的成員。

故本次以**登山健行揪團平台**作為題目的原因，即是認為至少在台灣，仍然沒有一個專門為登山設計且服務於所有人的揪團平台，加上我本身對登山活動也有接觸，故希望以一個常找不到同伴的山友角度出發，最終設計出一個操作簡易的網路平台。
##
### 設計理念、方向
- 操作起來直覺簡單，讓各個年齡層的使用者都能夠輕易上手
- 介面簡潔，不至於眼花撩亂
- 面向台灣山友，以中文作為主要語言
- 使用者可以選擇註冊和登入去發布自己的行程，也能在不登入的情況下參加他人發布的行程

## 2. 本地版環境建置 & 執行
#### * 假設已將 project directory 拉到本地端
<img src="https://i.imgur.com/FqhjKIF.png" width="400" >

#### 安裝前後端各自所需套件
``` bash
> cd frontend
> yarn install
> cd ../backend
> yarn install
```
#### 於後端 backend/ 資料夾中新增環境變數設定檔: *`.env`*
``` bash
> cd backend
> mkdir .env
```
*`.env`*：
``` bash=
# 用來連上資料庫
MONGO_URL = '${mongoose link}'
# 用來加解密 token
SECRET = 'MumiShinDonDon'
# 用來加解密使用者密碼，設太大會跑很久
SALT_ROUNDS = 8
```
#### 回到 project 目錄，執行指令開啟後端。
``` bash
> yarn server
```
<img src="https://i.imgur.com/0IU0rH2.png" width="400" >

#### 於另一 terminal，一樣在 project 目錄執行指令，開啟前端。
``` bash
> yarn start
```
#### 成功啟動的話可以看到主畫面，此時面板上還沒有任何行程。
<img src="https://i.imgur.com/med8Bhs.png" width="600" >

#### 我有預先將一些資料範本寫在 *`backend/src/testData.js`* 中，可以至 *`backend/src/mongo.js`* 將函式最後一行的 `postInit(...);` 註解拿掉，並重新執行前後端 (後端會自動重啟)。
<img src="https://i.imgur.com/oeVKeKf.png" width="400" >

#### 資料寫入後再將 `postInit(...);` 註解回去，以免每次後端重啟時將新加入的資料洗掉。
#### 最後再次使用 *`$ yarn start`* 重啟前端，可以看到剛剛寫入的範本出現在面板上。
<img src="https://i.imgur.com/7kvodhy.png" width="600" >

#### 以上為登山健行揪團平台在 local 端的開啟方式，測試時，可以使用在上一步預先註冊的三個使用者，每個使用者都有兩篇自己的 Post：
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
* 備註：由於每次 initialize 會將 user 也一起洗掉，userid 也會更新，故若是前端在登入狀態的話請先登出再登入，以獲得用新的 userid 加密出的新 token。  

## 3. 後端介紹
### 主要架構
#### 使用 graphql-yoga 套件開啟的 GraphQLServer 負責處理前端要求，並連結 MongoDB 作為資料庫。

<img src="https://i.imgur.com/olPuI7L.png" width="600" >

##
* index.js

    後端程式的進入點，在這裡呼叫連接資料庫的函式並開啟 server 監聽在固定 port 上(目前寫死在 5001 port)。

* server.js

    主要的 server 設定都在這邊，除了將 graphql schema、resolvers 和 database model 引入 server 外，在 context 的部分我額外新增了：
    
    * 將從前端收到的 token 解出的參數 *`userId`* ，token 的運作如下：
        
        1. 當一用戶登入時，後端會將該使用者的 id 藉由一個只有後端知道的字串加密成一長串的 token 並回傳。
        2. 前端收到 token 後會將它存至 localStorage 中直到該用戶登出。
        3. 從此以後由前端向後端發出的封包都會自帶該 token。
        4. 當後端在接收到 client 的封包時，若有附上 token，則會將之反解出使用者的 id。
        5. 這樣一來，任何涉及對資料庫內容進行更動的請求，都可以先檢查由 token 解出的使用者 id，看看該請求的主人 "夠不夠格" 進行更動，例如只有註冊的使用者能夠新增、更改、刪除 Post，也只有 Post 的主人能夠對 Post 進行更動。
        
    * 兩個環境變數： *`SECRET`*、*`SALTROUNDS`*

        *`SECRET`*：用來加密 token 的字串。

        *`SALTROUNDS`*：使用者密碼的加密程度。

* mongo.js

    定義了與資料庫的連線，可以在這裡呼叫初始化資料庫的函式。
    
* models/index.js

    定義了資料庫的 Schema，在這裡產生了 User 和 Post 的 Model。
    
* resolvers/ *.js & schema.graphql

    定義了與 graphql 有關的運作。
##
### 使用之框架、第三方套件、模組
#### 後端：graphql-yoga, bcryptjs(加密使用者密碼), jsonwebtoken(用戶驗證), nodemon, mongoose, babel, dotenv-defaults
#### 資料庫: MongoDB
##

### ref
* #### JWT
    * https://www.howtographql.com/graphql-js/6-authentication/
    * https://ithelp.ithome.com.tw/articles/10205426
* #### put environmental variables into `.env` ( like SECRET, SALT, etc. )
    * https://ithelp.ithome.com.tw/articles/10205786

## 4. 前端介紹
#### 使用 React.js 架構出前端畫面，並使用 Apollo Client 定義與發送 graphql 請求。以下分別展示與介紹登入/未登入所看到的介面。
##
### 前端檔案架構
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
### 未登入
不是所有使用者都會需要發布行程，有些人或許只是參與別人開設的行程，又或者單純隨便看看。對於這些使用者，他們仍然可以在主畫面看到所有的行程卡片，並能夠點開卡片閱讀行程細節。

<img src="https://i.imgur.com/CYpXdi1.png" width="600" >
<img src="https://i.imgur.com/qAhWzVA.png">


( *有做簡易的 RWD，一個 Row 的卡片數量會隨著頁面寬度有所改變 )

<img src="https://i.imgur.com/CWB3fcT.png">

### 登入
註冊並登入的使用者能夠執行本平台的所有功能，包括：建立自己的行程、將行程卡片加入關注行程、修改/刪除自己的行程、在主介面能夠使用 tab 切換於 "全部行程"、"關注行程"、"我的行程" 之間。

#### 登入/註冊介面
在主畫面右上角點擊 "登入" 按鈕即會彈出登入視窗，在登入視窗點擊 "註冊" 則會彈出註冊視窗，填入註冊資料送出後會回到登入視窗，並且預設會填入剛剛註冊使用的郵件。
登入/註冊要求送到後端後，會有四種情形會使前端跳出錯誤訊息通知：
1. 用戶 email 不存在
2. 用戶密碼錯誤
3. 註冊用戶名已存在
4. 註冊 email 已存在

除此之外，一旦用戶登入，他從後端收到的 token 即會被儲存在 localStroage 中，並且只要該 token 一直存在，每次用戶打開服務即會被視為自動登入，直到該用戶登出時前端才會將該 token 清除，關於前端處裡 token 的程式碼在 *`src/hooks/useAuth.js`* 和 *`src/index.js`* 中。

<img src="https://i.imgur.com/ZHj2LDr.png">

#### 登入後主畫面
用戶登入後主畫面會有幾個不同的地方：
1. 右上角的按鈕變成以用戶名第一個字母渲染的 Avatar
2. "關注行程" 與 "我的行程" 兩個 Tab 變成可以點擊
3. 每個 Post 卡片的右上角出現類似於書籤的 icon，點擊後可以將該行程加入用戶的書籤清單中，再次點擊後可以解除。
4. 右下角新增了一個懸浮的功能列，hover 後展開 "發布行程" 選項。

<img src="https://i.imgur.com/KL94k0H.png" width="600" >

分別點擊 "關注行程"、"我的行程"：

<img src="https://i.imgur.com/AMRGHc5.png">

#### 搜尋行程
透過在右上方的搜尋欄輸入查詢字串，和選擇想要搜尋的類型，使用者(不須登入)能夠查詢自己有興趣的 Post。並且在搜尋完後，若是想看到搜尋前的所有 Post，可以點擊 "全部" 按鈕，這樣前端就會向後端執行一次 refetch。

<img src="https://i.imgur.com/YShssuA.png" width="700">

### 發布行程
用戶在登入後 hover 右下角懸浮的 "+" 號按鈕並點擊 "發布行程" 選項即可叫出編輯草稿的視窗。編輯視窗由三個步驟所組成，照著順序填完資料後按下在第三步的 "送出" 按鈕即可新建行程卡片。關於建立行程所需填寫的資料，除了行程名稱為必填之外，其他必填的資料都已經有預設值，並且限制出發時間不能在當下的時間之前，且結束時間也必須晚於出發時間。

<img src="https://i.imgur.com/j2zdjWU.png" width="600">

### 修改 & 刪除行程
當用戶登入平台後點擊主畫面的行程卡片，畫面會彈出該行程的詳細資料，此時若用戶剛好是該行程的作者，則會在詳細資料的視窗下方多看到一個 "刪除行程" 按鈕和一個 "修改行程案紐"。

按下 "刪除行程" 會將行程直接刪除；按下 "修改行程" 則會將該行程的資料載入剛剛用來 "發布行程" 的三步編輯視窗，方便使用者針對已有的資料進行編輯並送出更改。

<img src="https://i.imgur.com/hwBpXkj.png" width="600">

##
### 使用之框架、第三方套件、模組
#### Reactjs, Apollo Client, material ui, moment, styled-components
##

### ref
* #### 更改中文字體
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
    * Edge 瀏覽器會在特定情形之下顯示兩個 material ui 的**隱藏/顯示密碼 icon**，如下圖：
    <img src="https://i.imgur.com/ZLVPBjy.jpg" width=300 />
    
        解法([stackoverflow](https://stackoverflow.com/questions/66703625/double-endadornments-when-using-self-defined-endadornment-in-material-ui-input)): 在 index.css 加上以下程式碼

        ``` css
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }

        ```
    * [在特定按鈕消除 CardActionArea 的特效 (ripple) 與效果 (onClick)](https://stackoverflow.com/questions/61590919/material-ui-button-in-cardactionarea)
    * [如何讓 MUI Typography 識別換行字元](https://github.com/mui-org/material-ui/issues/9189)