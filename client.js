const publicVapidKey = 'BOfJ7V6sB3Sm0lF5MH-wKp1RCOsz7qQPtb4Pt18PXorGELjZ5k7eDpsDyzrKTaKuPT1Xf9ZF5wwS6wHwu7vAEXw';
 
//Check for serviceworker
if('serviceWorker' in navigator) {
send().catch(err => console.error(err));
}

     addEventListener('load', async () => {
       let sw = await navigator.serviceWorker.register('./sw.js', {
scope: '/'
});
       console.log(sw)
   })
   async function subscribe() {
       let segment = 'Levi all';
       let naam = 'Levi';
       let sw = await navigator.serviceWorker.ready;
       let pushkey = await sw.pushManager.subscribe({
           userVisibleOnly: true,
           applicationServerKey: urlBase64ToUint8Array(publicVapidKey)

       });
       let data = { pushkey, naam, segment };

       document.getElementById("demo").textContent = (JSON.stringify(data));

       console.log(JSON.stringify(data))

               fetch('http://localhost:5000/posts/', {
                   method: "POST",
                   headers: {
                       "Content-type": "application/json"
                       
                   },
                   body: (JSON.stringify(data))
               });
               const response = await fetch('http://localhost:5000/posts/');
       const json = await response.json();
       console.log(json);
   };