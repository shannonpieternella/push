const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Affiliate = require('../models/Affiliate');
const push = require('web-push');


//count leads

router.post('/count', async (request, response) => {
    const filteren = request.body.body;
    console.log(filteren);
    const posts = await Post.find({naam:filteren});
    try{
    
    console.log(posts.length);
    response.json(posts.length)

}catch(err){
    response.json({message:err});

    }
});


router.post('/getstatistics', async (request, response) => {
   
        
try{
    const proPost = await Affiliate.find({ _id: request.body._id });
    console.log(proPost); 
    response.json(proPost);
}catch(err){
    response.json({message: err});
    response.json('het werkt niet');
}
});

router.post('/affiliateregister', async (request, response) => {
 
    
        const analytics = new Affiliate({
        
            clicks: request.body.clicks,
            naam: request.body.naam,
            affiliateID: request.body.affiliateID,
            nameclient: request.body.nameclient,
            registercount: request.body.registercount,
            special: request.body.special,
            standard: request.body.standard,
            pro: request.body.pro,
            free: request.body.free,
            date: request.body.date
    
        });
        try{
        const savedAnalytics = await analytics.save();
        response.json(savedAnalytics);
    
    }catch(err){
       // response.json({message: err});
        response.json('daymn');
    }
});


router.post('/broadcast', async (request, response) => {
    //console.log(request.body);
    const myFunc = async (param1) => {

    // console.log(param1.body.title);
    // console.log(param1.body.);
    // console.log(param1.body.title);
        
    const filteren = param1.body.body;
    const titel = param1.body.title;
    const text = param1.body.text;
    const plaatje = param1.body.pic;
    const link = param1.body.url;
    console.log(filteren);
    const posts = await Post.find({naam:filteren});
    for (i=0; i < posts.length; i++) {
    try{
    
    console.log(posts[i]);
    //Create payload
    const payload = JSON.stringify({title: titel, body: text, icon: plaatje, url:link});
   // const load = JSON.stringify({url: 'https://google.com'});

   
    let stuur = posts[i].endpoint.pushkey;
    push.sendNotification(stuur, payload).catch(err => console.error(err));
 //   notificationclick.sendNotification(stuur, payload).catch(err => console.error(err));
 clearTimeout(myFunc);

    //console.log(filteren);
    console.log(posts.length);
    console.log(request.body.title);
    console.log(request.body.text);
    
}catch(err){
    response.json({message:err});
}

    }



    }
setTimeout(myFunc, request.body.tijd, request);
});


router.post('/segment', async (request, response) => {
    //console.log(request.body);
    const filteren = request.body.body;
    const titel = request.body.title;
    const text = request.body.text;
    const plaatje = request.body.pic;
    const link = request.body.url;
    console.log(filteren);
    const posts = await Post.find({segment:filteren});
    for (i=0; i < posts.length; i++) {
    try{
    
    console.log(posts[i]);
    //Create payload
    const payload = JSON.stringify({title: titel, body: text, icon: plaatje, url:link});
   // const load = JSON.stringify({url: 'https://google.com'});

   
    let stuur = posts[i].endpoint.pushkey;
    push.sendNotification(stuur, payload).catch(err => console.error(err));
 //   notificationclick.sendNotification(stuur, payload).catch(err => console.error(err));


    //console.log(filteren);
    console.log(posts.length);
    console.log(request.body.title);
    console.log(request.body.text)

}catch(err){
    response.json({message:err});
}

    }
});

 

router.get('/', async (request, response) => {
    
    response.json("hey zie je dit");

});


//save to database

  router.post('/', async (request, response) => {
    try{

    const post = new Post({
        endpoint: request.body,
        naam: request.body.naam,
        segment: request.body.segment,
        date: request.body.date
    });

    response.json(post);
    response.json(analytics);
    
        const savedPost = await post.save();
        
       // response.json(savedPost);  
    
    }catch(err){
        response.json({message: err})

    }
});
    


    // Specific post
    router.get('/:postId', async (req, res) => {
        try{
        const post = await Post.findById(req.params.postId);
        res.json(post);

        }catch(err){
            res.json({message: err})

        }
    });
  
    //Delete Post

router.delete('/', async (req, res) => {
    try{
const removedPost = await Post.remove({});
res.json(removedPost);
    }catch(err){
        res.json({message: err});

    }
});

//Update a post

router.patch('/:postId', async (req, res) => {
    const count = req.body.clicks;
    const countFree = req.body.free; 
    const countSpecial = req.body.special;
    const countStandard = req.body.standard;
    const countPro = req.body.pro;
    const nameClient = req.body.nameclient;
    const vind = await Affiliate.find({_id:req.params.postId});

    const plus = vind[0].clicks;
    const plusNummer = Number(plus);

    const freeAccount = vind[0].free;
    const freeAccountNummer = Number(freeAccount);

    const specialAccount = vind[0].special;
    const specialAccountNummer = Number(specialAccount);

    const standardAccount = vind[0].standard;
    const standardAccountNummer = Number(standardAccount);

    const proAccount = vind[0].pro;
    const proAccountNummer = Number(proAccount);

   // Check of if (TRUE) statements kan helpen met het afscheiden van updates
    if (countFree === 1) {
    const freePost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {free: countFree + freeAccountNummer, nameclient: nameClient}});
    console.log('free');
}

    else if (countSpecial === 1) {
        const specialPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {special: countSpecial + specialAccountNummer, nameclient: nameClient}});
        console.log('special');
    }

    else if (countStandard === 1) {
        const standardPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {standard: countStandard + standardAccountNummer, nameclient: nameClient }});
        console.log('standard');
    }else if (countPro === 1){ 
        const proPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {pro: countPro + proAccountNummer, nameclient: nameClient }});
        console.log('pro');   
    }
        
    try {
        console.log('click');
    const clicksPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {clicks: count + plusNummer, nameclient: nameClient}});
    
    

res.json(vind);

}catch(err){
    res.json({message: err});

}
});

//update a post -

router.patch('/min/:postId', async (req, res) => {
    const count = req.body.clicks;
    const countFree = req.body.free; 
    const countSpecial = req.body.special;
    const countStandard = req.body.standard;
    const countPro = req.body.pro;
    const nameClient = req.body.nameclient;
    const vind = await Affiliate.find({_id:req.params.postId});

    const plus = vind[0].clicks;
    const plusNummer = Number(plus);

    const freeAccount = vind[0].free;
    const freeAccountNummer = Number(freeAccount);

    const specialAccount = vind[0].special;
    const specialAccountNummer = Number(specialAccount);

    const standardAccount = vind[0].standard;
    const standardAccountNummer = Number(standardAccount);

    const proAccount = vind[0].pro;
    const proAccountNummer = Number(proAccount);

   // Check of if (TRUE) statements kan helpen met het afscheiden van updates
    if (countFree === 1) {
    const freePost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {free: countFree - freeAccountNummer, nameclient: nameClient}});
    console.log('free min');
}

    else if (countSpecial === 1) {
        const specialPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {special: countSpecial - specialAccountNummer, nameclient: nameClient}});
        console.log('special min');
    }

    else if (countStandard === 1) {
        const standardPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {standard: countStandard - standardAccountNummer, nameclient: nameClient }});
        console.log('standard min');
    }else if (countPro === 1){ 
        const proPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {pro: countPro - proAccountNummer, nameclient: nameClient }});
        console.log('pro min');   
    }
        
    try {
        console.log('click');
    const clicksPost = await Affiliate.updateOne({ _id: req.params.postId }, {$set: {clicks: count + plusNummer, nameclient: nameClient}});
    
    

res.json(vind);

}catch(err){
    res.json({message: err});

}
});

  module.exports = router;
