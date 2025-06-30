//  javascript realtime camera

let video = document.getElementById('video');
let stream = null;

async function accessCamera() {
    
   try {
    video.style.display = 'block';
    let stream = await navigator.mediaDevices.getUserMedia({video: true});
    video.srcObject = stream;
    video.play(); 
    alert('open camera');
   } catch (error) {
    console.error('Error accessing camera:', error)
   }



    
}

 function stopCamera(){
    if(stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
} 
