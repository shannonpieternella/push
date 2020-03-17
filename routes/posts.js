const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
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


router.post('/affiliateregister', async (request, response) => {
      
    
        const analytics = new Affiliate({
        
            clicks: request.body.clicks,
            naam: request.body.naam,
            affiliateID: request.body.affiliateID,
            date: request.body.date
    
        });
        try{
        const savedAnalytics = await analytics.save();
        response.json(savedAnalytics);
    
    }catch(err){
        response.json({message: err});

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
    console.log(request.body.text);

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

router.delete('/:postId', async (req, res) => {
    try{
const removedPost = await Post.remove({ _id: req.params.postId});
res.json(removedPost);
    }catch(err){
        res.json({message: err});

    }
});

//Update a post

router.patch('/:postId', async (req, res) => {
try {
    const updatedPost = await Post.updateOne(
        { _id: req.params.postId },
        {$set: {naam: req.body.naam }
    });
res.json(updatedPost);

}catch(err){
    res.json({message: err});

}
});

  module.exports = router;
