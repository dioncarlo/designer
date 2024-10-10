const canvas = document.getElementById('designCanvas');
const ctx = canvas.getContext('2d');
let image = new Image();
let text = '';
let color = '#000';

// Handle image upload
document.getElementById('imageUpload').addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        image.src = event.target.result;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Handle text input
document.getElementById('addText').addEventListener('input', (e) => {
    text = e.target.value;
    renderCanvas();
});

// Handle color picker
document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
    renderCanvas();
});

// Render function
function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    ctx.fillStyle = color;
    ctx.font = '30px Arial';
    ctx.fillText(text, 50, 50); // Example text positioning
}

// Handle form submission and send design via email
document.getElementById('quoteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderQty = document.getElementById('orderQty').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contactNumber').value;

    // Convert canvas to image
    const designDataURL = canvas.toDataURL('image/png'); // PNG format

    // Send the request with the image and form data
    fetch('http://localhost:3000/submit-design', {
        method: 'POST',
        body: JSON.stringify({
            orderQty,
            email,
            contactNumber,
            designDataURL // The base64 image data
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    }).then(response => response.json())
      .then(data => {
          alert('Design submitted successfully! We will get back to you soon.');
      }).catch(error => {
          console.error('Error submitting design:', error);
      });
});
