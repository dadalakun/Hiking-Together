import db from "./models/index.js"
import { newUser, newPost } from './utils.js';

const initposts = [
    {
        title: "奇萊主北",
        genre: ["百岳"],
        startTime: new Date("2022-02-12T00:00:00.000Z").getTime(),
        endTime: new Date("2022-02-14T00:00:00.000Z").getTime(),
        peopleOrigin: 1,
        peopleWant: 1,
        detail: "Day0\n台北出發 >> 住合歡山滑雪山莊\n\nDay1\n8:00 奇萊登山口出發 >> 奇萊稜線山屋 >>\n" +
        "輕裝上北峰 >> 住稜線山屋" + "\n\nDay2\n4:00 出發往主峰看日出 >> 回稜線山屋拿背包 >>\n" +
        "15:00 左右回登山口 >> 埔里吃飯回台北\n",
        otherInfo: "從台北出發經過埔里上合歡山，沿途高速公路附近可以順便撿，" + 
        "油錢隨意付，有興趣的山友可以透過下面方式找到我 :\n\nLine: xxxxxxxx\n臉書名稱: 母咪人\n",
        author: "Mumi",
        postTime: new Date("2022-01-14T00:00:00.000Z").getTime(),
    },
    {
        title: "東卯山東南稜德芙蘭上",
        genre: ["單攻", "中級山", "共乘"],
        startTime: new Date("2022-02-03T00:00:00.000Z").getTime(),
        endTime: new Date("2022-02-03T00:00:00.000Z").getTime(),
        peopleOrigin: 3,
        peopleWant: 1,
        detail: "(非傳統路線)\n" +
        "06：00 台北車站集合\n08：30 達台中谷關\n09：00 登山口起登\n16：30下山回台北\n晚餐視情況要不要進行\n",
        otherInfo: "主揪為車手\n缺1-2位\n車資2.5元/km\n希望是七八年級生為主\n因時間考量限台北集合出發\n\n" +
        "有興趣者私\n請主動告知登山經歷\n\nLine: 09xxxxxxxx\nPTT: mumiman\n",
        author: "Mumi",
        postTime: new Date("2022-01-13T00:00:00.000Z").getTime(),
    },
    {
        title: "白姑共乘",
        genre: ["共乘"],
        startTime: new Date("2022-02-22T00:00:00.000Z").getTime(),
        endTime: new Date("2022-02-24T00:00:00.000Z").getTime(),
        peopleOrigin: 3,
        peopleWant: 4,
        detail: "無\n",
        otherInfo: "FB: 馬克人\n",
        author: "Mark",
        postTime: new Date("2022-01-10T00:00:00.000Z").getTime(),
    },
    {
        title: "南三段7日",
        genre: ["縱走", "揪人"],
        startTime: new Date("2022-02-10T00:00:00.000Z").getTime(),
        endTime: new Date("2022-02-17T00:00:00.000Z").getTime(),
        peopleOrigin: 4,
        peopleWant: 2,
        detail: "規劃如下\n\nDay 1  瑞穗林道19 k 水泥橋 > 沙武巒草原 > 太平溪西源營地(宿)\n" +
        "Day 2  太平溪西源營地 > 太平溪營地 > 丹大山 > 太平溪營地(宿)\n" +
        "Day 3  太平溪營地 > 內嶺爾山 >義西請馬至山 > 丹大溪源營地(宿)\n" +
        "Day 4  丹大溪源營地 > 東郡大山東北鞍營地(宿)\n" +
        "Day 5  東北鞍營地 >東巒大山 >東郡大山 >櫧山北鞍營地(宿)\n" +
        "Day 6  櫧山北鞍營地 > 無雙山 >烏瓦拉鼻營地(宿)\n" +
        "Day 7  烏瓦拉鼻營地 >郡大林道 33 k(接駁車)\n",
        otherInfo: "D0（1/29）會先下去花蓮瑞穗住民宿\n" +
        "目前4人（八年級生） 再徵2～3人\n會大概審一下登山經歷跟速度\nLine: 馬克人",
        author: "Mark",
        postTime: new Date("2022-01-15T00:00:00.000Z").getTime(),
    },
    {
        title: "北大武1/16-1/17共乘",
        genre: ["百岳", "單攻", "共乘"],
        startTime: new Date("2022-02-18T00:00:00.000Z").getTime(),
        endTime: new Date("2022-01-19T00:00:00.000Z").getTime(),
        peopleOrigin: 4,
        peopleWant: 3,
        detail: "時間：去程1/16 04:00 (此為台北出發時間, 高雄集合時間另議)；回程1/17 16:00左右。",
        otherInfo: "地點：台北市區-北大武登山口來回 or 左營高鐵站-北大武登山口來回。\n" +
        "費用：視最後人數討論，台北出發的應該會比搭高鐵+包車省。\n" + 
        "人數：目前內建4人(2人台北上車、2人高雄上車），徵1-3人（台北或高雄出發都可)。\n" +
        "車型：可坐7名乘客。\n備註：純揪共乘不組團，謝謝！\n意者私 Line: xxxxxxxx",
        author: "David",
        postTime: new Date("2022-01-10T00:00:00.000Z").getTime(),
    },
    {
        title: "一日西巒一日郡大",
        genre: ["百岳", "單攻"],
        startTime: new Date("2022-02-13T00:00:00.000Z").getTime(),
        endTime: new Date("2022-02-15T00:00:00.000Z").getTime(),
        peopleOrigin: 2,
        peopleWant: 5,
        detail: "Day0  1/28望鄉部落(艾度民宿)\n" +
        "Day1  1/29西巒大山(人倫管制站)\nDay2  1/30郡大山\n\n===============================\n\n" +
        "Day1 3:00出發-4:30登山口-10:30三角點-15:00前回登山口\nDay2 6:00出發-8:00登山口-11:00三角點-15:00前回登山口\n",
        otherInfo: "人數：\n接駁7人分攤費用，內建2人(8年級)，再找5人，年齡性別不拘\n\n價錢：\n西巒大山接駁$4000/一趟\n" +
        "郡大山接駁$5000/一趟\n艾度民宿$400/一人一晚\n7人分攤\n\n注意事項：\n" +
        "1.百岳新手團，內建兩人近期有雪主東單攻經驗，不介意新舊手加入，須衡量自身體力。\n" +
        "2.團進團出，非健腳團故可以互相等彼此。\n3.若天氣不佳，則取消行程。\n" + 
        "4.揪團非褓母，希望你有自己照顧自己的能力，保險、裝備、行動糧等自行處理。入山許可可一起辦理。\n" +
        "5.Day0自行到艾度民宿集合，沿途有經過可以順路載。Day1晚餐可再討論跟民宿訂。",
        author: "David",
        postTime: new Date("2022-01-03T00:00:00.000Z").getTime(),
    },
];

const initusers = [
    {
        name: "Mumi",
        email: "mumi@gmail.com",
        password: "mumimumi"
    },
    {
        name: "Mark",
        email: "mark@gmail.com",
        password: "markmark"
    },
    {
        name: "David",
        email: "david@gmail.com",
        password: "daviddavid"
    }
];

const postInit = async (salt) => {
    const users = await db.User.find();
    const posts = await db.Post.find();
    
    if (users.length !== 3 || posts.length !== 6) {
        await db.User.deleteMany({});
        const { user: mumi } = await newUser(
            db, initusers[0].name, initusers[0].email, initusers[0].password, salt);
        const { user: mark } = await newUser(
            db, initusers[1].name, initusers[1].email, initusers[1].password, salt);
        const { user: david } = await newUser(
            db, initusers[2].name, initusers[2].email, initusers[2].password, salt);

        console.log("Database(users) initialized!");

        await db.Post.deleteMany({});
        await newPost(db, mumi.id, initposts[0]);
        await newPost(db, mumi.id, initposts[1]);
        await newPost(db, mark.id, initposts[2]);
        await newPost(db, mark.id, initposts[3]);
        await newPost(db, david.id, initposts[4]);
        await newPost(db, david.id, initposts[5]);
        
        console.log("Database(posts) initialized!");
    }
};

export { postInit };