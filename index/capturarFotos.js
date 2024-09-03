const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startCameraButton = document.getElementById('startCameraButton');
// const captureButton = document.getElementById('captureButton');
const stopCameraButton = document.getElementById('closeCamera');
const photos = [
    document.getElementById('photo1'),
    document.getElementById('photo2'),
    document.getElementById('photo3')
];
let currentPhotoIndex = 0;

const ineButton = document.getElementById('ine_button');
const reversoButton = document.getElementById('reverso_button');
const domicilioButton = document.getElementById('domicilio_button');

async function uploadPhoto(PhotoData, buttonType) {
    const byteString = atob(PhotoData.split(',')[1]);
    const buffer = new Uint8Array(new ArrayBuffer(byteString.length));
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([buffer], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('file', blob, `${buttonType}.jpeg`);

    const response = await axios.post('https://installations-calendar-back.vercel.app/drive/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Response received:', response);
    return response.data;
  }

// Acceder a la cámara cuando se presiona el botón "Activar Cámara"
startCameraButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.style.display = 'block';
            // captureButton.style.display = 'block';
            startCameraButton.style.display = 'none';
            stopCameraButton.style.display = 'block';
        })
        .catch(err => {
            console.error("Error al acceder a la cámara: ", err);
            alert("Error al acceder a la cámara");
        });
});

stopCameraButton.addEventListener('click', ()=>{
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.style.display = 'none';
        startCameraButton.style.display = 'block';
        stopCameraButton.style.display = 'none';
    })
    .catch(err => {
        console.error("Error al desactivar a la cámara: ", err);
        alert("Error al desactivar a la cámara");
    });
});

// Capturar la imagen cuando se hace clic en el botón "Tomar Foto"
// captureButton.addEventListener('click', () => {
//     const ctx = canvas.getContext('2d');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convertir la imagen a Base64 y mostrarla en la <img> correspondiente
//     const dataURL = canvas.toDataURL('image/jpeg');
//     photos[currentPhotoIndex].src = dataURL;
//     currentPhotoIndex++;
// });

ineButton.addEventListener('click', async() => {
        var inputNombre = document.getElementById('nombre');

        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convertir la imagen a Base64 y mostrarla en la <img> correspondiente
        const dataURL = canvas.toDataURL('image/jpeg');
        photos[0].src = dataURL;

        const respuesta = await uploadPhoto(dataURL, 'INE' + inputNombre.value);
        console.log("RESPUESTA INE", respuesta);

        if (respuesta.status == "ok") {
            const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
            const urlDisplay = document.getElementById('urlDisplayINE'); // Asegúrate de tener un elemento con este ID en tu HTML
                if (urlDisplay) {
                 //   urlDisplay.textContent = newSrc; // Mostrar la URL en texto
                }
        }
});

reversoButton.addEventListener('click', async() => {
    var inputNombre = document.getElementById('nombre');

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir la imagen a Base64 y mostrarla en la <img> correspondiente
    const dataURL = canvas.toDataURL('image/jpeg');
    photos[1].src = dataURL;

    const respuesta = await uploadPhoto(dataURL, 'REEVERSO' + inputNombre.value);
    console.log("RESPUESTA INE", respuesta);

    if (respuesta.status == "ok") {
        const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
        const urlDisplay = document.getElementById('urlDisplayREVERSO'); // Asegúrate de tener un elemento con este ID en tu HTML
            if (urlDisplay) {
             //   urlDisplay.textContent = newSrc; // Mostrar la URL en texto
            }
        }
});

domicilioButton.addEventListener('click', async() => {
    var inputNombre = document.getElementById('nombre');

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir la imagen a Base64 y mostrarla en la <img> correspondiente
    const dataURL = canvas.toDataURL('image/jpeg');
    photos[2].src = dataURL;

    const respuesta = await uploadPhoto(dataURL, 'DOMICILIO' + inputNombre.value);
    console.log("RESPUESTA INE", respuesta);

    if (respuesta.status == "ok") {
        const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
        const urlDisplay = document.getElementById('urlDisplayDOMICILIO'); // Asegúrate de tener un elemento con este ID en tu HTML
            if (urlDisplay) {
             //   urlDisplay.textContent = newSrc; // Mostrar la URL en texto
            }
        }
});
