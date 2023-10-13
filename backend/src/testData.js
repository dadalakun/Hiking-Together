import db from "./models/index.js"
import { newUser, newPost } from './utils.js';

const initposts = [
    {
        title: "奇萊主北",
        genre: ["百岳"],
        startTime: new Date("2024-02-12T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-14T00:00:00.000Z").getTime(),
        peopleOrigin: 1,
        peopleWant: 1,
        detail: "Day0\n台北出發 >> 住合歡山滑雪山莊\n\nDay1\n8:00 奇萊登山口出發 >> 奇萊稜線山屋 >>\n" +
        "輕裝上北峰 >> 住稜線山屋" + "\n\nDay2\n4:00 出發往主峰看日出 >> 回稜線山屋拿背包 >>\n" +
        "15:00 左右回登山口 >> 埔里吃飯回台北\n",
        otherInfo: "從台北出發經過埔里上合歡山，沿途高速公路附近可以順便撿，" + 
        "油錢隨意付，有興趣的山友可以透過下面方式找到我 :\n\nLine: xxxxxxxx\n臉書名稱: Zaren\n",
        author: "Zaren",
        postTime: new Date("2024-01-14T00:00:00.000Z").getTime(),
    },
    {
        title: "東卯山東南稜德芙蘭上",
        genre: ["單攻", "中級山", "共乘"],
        startTime: new Date("2024-02-03T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-03T00:00:00.000Z").getTime(),
        peopleOrigin: 3,
        peopleWant: 1,
        detail: "(非傳統路線)\n" +
        "06：00 台北車站集合\n08：30 達台中谷關\n09：00 登山口起登\n16：30下山回台北\n晚餐視情況要不要進行\n",
        otherInfo: "主揪為車手\n缺1-2位\n車資2.5元/km\n希望是七八年級生為主\n因時間考量限台北集合出發\n\n" +
        "有興趣者私\n請主動告知登山經歷\n\nLine: 09xxxxxxxx\nPTT: Zaren\n",
        author: "Zaren",
        postTime: new Date("2024-01-13T00:00:00.000Z").getTime(),
    },
    {
        title: "白姑共乘",
        genre: ["共乘"],
        startTime: new Date("2024-02-22T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-24T00:00:00.000Z").getTime(),
        peopleOrigin: 3,
        peopleWant: 4,
        detail: "無\n",
        otherInfo: "FB: 馬克人\n",
        author: "Mark",
        postTime: new Date("2024-01-10T00:00:00.000Z").getTime(),
    },
    {
        title: "南三段7日",
        genre: ["縱走", "揪人"],
        startTime: new Date("2024-02-10T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-17T00:00:00.000Z").getTime(),
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
        postTime: new Date("2024-01-15T00:00:00.000Z").getTime(),
    },
    {
        title: "北大武1/16-1/17共乘",
        genre: ["百岳", "單攻", "共乘"],
        startTime: new Date("2024-02-18T00:00:00.000Z").getTime(),
        endTime: new Date("2024-01-19T00:00:00.000Z").getTime(),
        peopleOrigin: 4,
        peopleWant: 3,
        detail: "時間：去程1/16 04:00 (此為台北出發時間, 高雄集合時間另議)；回程1/17 16:00左右。",
        otherInfo: "地點：台北市區-北大武登山口來回 or 左營高鐵站-北大武登山口來回。\n" +
        "費用：視最後人數討論，台北出發的應該會比搭高鐵+包車省。\n" + 
        "人數：目前內建4人(2人台北上車、2人高雄上車），徵1-3人（台北或高雄出發都可)。\n" +
        "車型：可坐7名乘客。\n備註：純揪共乘不組團，謝謝！\n意者私 Line: xxxxxxxx",
        author: "David",
        postTime: new Date("2024-01-10T00:00:00.000Z").getTime(),
    },
    {
        title: "一日西巒一日郡大",
        genre: ["百岳", "單攻"],
        startTime: new Date("2024-02-13T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-15T00:00:00.000Z").getTime(),
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
        postTime: new Date("2024-01-03T00:00:00.000Z").getTime(),
    },
];

const initposts_en = [
    {
        title: "Qilai Main Peak and North Peak",
        genre: ["3000m+"],
        startTime: new Date("2024-02-12T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-14T00:00:00.000Z").getTime(),
        peopleOrigin: 1,
        peopleWant: 1,
        detail: "Day0\nDepart from Taipei >> Stay at Hehuan Mountain Ski Resort\n\nDay1\n8:00 Depart from Qilai Trailhead >> Qilai Ridge Mountain Hut >>\nLight trek to the North Peak >> Stay at Ridge Mountain Hut\n\nDay2\n4:00 Depart for the main peak to watch the sunrise >> Return to Ridge Mountain Hut to retrieve backpack >>\nAround 15:00 return to the trailhead >> Eat in Puli and return to Taipei.",
        otherInfo: "Departing from Taipei, passing through Puli to Hehuan Mountain. Can pick up anyone near the highway along the way; fuel money is up to you. Fellow mountain enthusiasts interested can contact me through the following methods:\n\nLine: xxxxxxxx\nFacebook Name: Zaren",
        author: "Zaren",
        postTime: new Date("2024-01-14T00:00:00.000Z").getTime(),
    },
    {
        title: "Dongmao Mountain Southeast Ridge",
        genre: ["One Day", "1500m+", "Carpool"],
        startTime: new Date("2024-02-03T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-03T00:00:00.000Z").getTime(),
        peopleOrigin: 3,
        peopleWant: 1,
        detail: "(Non-traditional route)\n06:00 Gather at Taipei Station\n08:30 Arrive at Guguan, Taichung\n09:00 Start ascent from trailhead\n16:30 Descend and return to Taipei\nDinner depends on the situation.",
        otherInfo: "The main organizer will be the driver.\nLooking for 1-2 participants.\nTransportation fee is 2.5 yuan/km.\nPreferably participants in 7th or 8th grade.\nDue to time constraints, gathering and departing from Taipei only.\n\nThose interested, please message privately.\nKindly share your mountain climbing experience.\n\nLine: 09xxxxxxxx\nPTT: Zaren",
        author: "Zaren",
        postTime: new Date("2024-01-13T00:00:00.000Z").getTime(),
    },
    {
        title: "Carpool to Baigu Dashan (3 Days)",
        genre: ["Carpool"],
        startTime: new Date("2024-02-22T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-24T00:00:00.000Z").getTime(),
        peopleOrigin: 3,
        peopleWant: 4,
        detail: "N/A\n",
        otherInfo: "FB: Mark\n",
        author: "Mark",
        postTime: new Date("2024-01-10T00:00:00.000Z").getTime(),
    },
    {
        title: "Southern Section Three 7-day trek",
        genre: ["Several Days"],
        startTime: new Date("2024-02-10T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-17T00:00:00.000Z").getTime(),
        peopleOrigin: 4,
        peopleWant: 2,
        detail: "Planned as follows:\n\nDay 1 Ruisui Forest Road 19 k Cement Bridge > Shawu Mountain Prairie > West Source of Taiping River Campsite (overnight stay)\n\nDay 2 West Source of Taiping River Campsite > Taiping River Campsite > Danda Mountain > Taiping River Campsite (overnight stay)\n\nDay 3 Taiping River Campsite > Neilinge Mountain > Yixi Qing Horse Mountain > Danda River Source Campsite (overnight stay)\n\nDay 4 Danda River Source Campsite > Northeast Saddle of Dongjun Mountain Campsite (overnight stay)\n\nDay 5 Northeast Saddle Campsite > Dongluan Mountain > Dongjun Mountain > Zhushan North Saddle Campsite (overnight stay)\n\nDay 6 Zhushan North Saddle Campsite > Wushuang Mountain > Wuwalarbi Campsite (overnight stay)\n\nDay 7 Wuwalarbi Campsite > Jun Forest Road 33 k (shuttle bus)",
        otherInfo: "D0 (1/29) Will first head down to stay at a B&B in Ruisui, Hualien.\nCurrently 4 people (intermediate-level climbers). Recruiting another 2-3 people.\nWill roughly review mountain climbing experience and pace.\nLine:Markman",
        author: "Mark",
        postTime: new Date("2024-01-15T00:00:00.000Z").getTime(),
    },
    {
        title: "Carpool for Beidawu from 1/16 to 1/17.",
        genre: ["3000+", "One Day", "Carpool"],
        startTime: new Date("2024-02-18T00:00:00.000Z").getTime(),
        endTime: new Date("2024-01-19T00:00:00.000Z").getTime(),
        peopleOrigin: 4,
        peopleWant: 3,
        detail: "Time: Departure on 1/16 at 04:00 (This is the departure time from Taipei; gathering time in Kaohsiung to be discussed separately). Return on 1/17 around 16:00.",
        otherInfo: "Location: Round trip from Taipei City to Beidawu trailhead OR from Zuoying HSR Station to Beidawu trailhead.\nCost: Depends on the final number of participants. Departing from Taipei should be cheaper than taking the HSR and chartering a vehicle.\nNumber of people: Currently 4 confirmed (2 boarding in Taipei, 2 boarding in Kaohsiung). Recruiting 1-3 more people (can depart from either Taipei or Kaohsiung).\nVehicle type: Can accommodate 7 passengers.\nNote: Only organizing carpooling, not forming a group. Thank you!\nInterested parties, please message on Line: xxxxxxxx.",
        author: "David",
        postTime: new Date("2024-01-10T00:00:00.000Z").getTime(),
    },
    {
        title: "One day at Xiluan Mountain, one day at Jun Mountain.",
        genre: ["3000+", "One Day"],
        startTime: new Date("2024-02-13T00:00:00.000Z").getTime(),
        endTime: new Date("2024-02-15T00:00:00.000Z").getTime(),
        peopleOrigin: 2,
        peopleWant: 5,
        detail: "Day0 1/28 Wangxiang Tribe (Aidu B&B)\nDay1 1/29 Xiluan Mountain (Renlun Control Station)\nDay2 1/30 Jun Mountain\n\n===============================\n\nDay1 3:00 departure - 4:30 trailhead - 10:30 triangulation point - return to trailhead before 15:00\nDay2 6:00 departure - 8:00 trailhead - 11:00 triangulation point - return to trailhead before 15:00.",
        otherInfo: "Number of People:\nShared shuttle costs for 7 people, with 2 spots already taken (Grade 8 hikers). Looking for 5 more, regardless of age or gender.\n\nPrice:\nShuttle to Xiluan Mountain: $4000/trip\nShuttle to Jun Mountain: $5000/trip\nAidu B&B: $400/person per night\nCosts divided among 7 people.\n\nPoints to Note:\n1. This is a group for mountain climbing beginners. Two of the members have recent experience climbing snowy mountain peaks. Both newcomers and experienced climbers are welcome, but evaluate your own physical stamina.\n2. The group will stick together throughout. It's not a 'fast-walkers' group, so members can wait for each other.\n3. If the weather is unfavorable, the trip will be canceled.\n4. This isn't a nanny-led group. You should be able to take care of yourself. Handle your own insurance, equipment, and food. We can jointly apply for mountain entry permits.\n5. On Day0, meet up at Aidu B&B on your own. If you're on our route, we can pick you up. Dinner on Day1 can be discussed and ordered from the B&B.",
        author: "David",
        postTime: new Date("2024-01-03T00:00:00.000Z").getTime(),
    },
];

const initusers = [
    {
        name: "Zaren",
        email: "zaren@gmail.com",
        password: "zarenzaren"
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
        await newPost(db, mumi.id, initposts_en[0]);
        await newPost(db, mumi.id, initposts_en[1]);
        await newPost(db, mark.id, initposts_en[2]);
        await newPost(db, mark.id, initposts_en[3]);
        await newPost(db, david.id, initposts_en[4]);
        await newPost(db, david.id, initposts_en[5]);
        
        console.log("Database(posts) initialized!");
    }
};

export { postInit };