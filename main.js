const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


const img = document.querySelector('.image img')
const projectlinks = document.querySelector('#project-link')
const projecttitle = document.querySelector('#project-title')

const modalcontents = document.querySelectorAll('[data-modal-content]')

const message = document.querySelector('#emailmsg');
// for loader
const loader = document.querySelector('#loader');


// for response message
const responseMsg = document.querySelector('#response-msg');


const hamberger = document.querySelector('#hamburger-menu')

const navlinks = document.querySelector('#nav-links')

const links = document.querySelectorAll('#nav-links li')


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email) && email != '' ) {
        message.style.display = 'block';
        message.textContent = 'Valid email';
        message.style.color = 'green';
        // after 3 seconds, remove the message
        
        sendMail();

    } else {
        message.style.display = 'block';
        message.textContent = 'Invalid email';
        message.style.color = 'red';
        console.log('Invalid email');
    }
    
    setTimeout(() => message.remove(), 3000);
});


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        const selectedImage = event.currentTarget.getAttribute('data-modal-content');
        const link = event.currentTarget.getAttribute('data-modal-link');
        const title = event.currentTarget.getAttribute('data-modal-title');
        projecttitle.textContent = title
        projectlinks.href = link
        img.src = selectedImage
        openModal(modal)


    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})


function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// close modal when clicking outside of it
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

//close modal when pressing escape
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    }
})





//send email
function sendMail() {

    var tempParams = {
        from_name: document.getElementById("name").value,
        to_name: 'Tuyishime',
        message: document.getElementById("message").value,
    };

    showLoader();


    emailjs.init('SYOx3J--zNwUwsQg-');

    emailjs.send('service_jzc7jbg', 'template_50n1yer', tempParams)
         .then(function (res) {
            console.log("success", res.status);
            responseMsg.style.display = 'block';
            responseMsg.classList.add('success');
            responseMsg.innerHTML = 'Your message is sent';
            setTimeout(() => responseMsg.remove(), 3000);


            hideLoader();
        }, function (error) {
            console.log("failed", error);
            hideLoader();
        });


}


function showLoader() {
    loader.style.display = 'block';
  }
  
  function hideLoader() {
    loader.style.display = 'none';
  }
  