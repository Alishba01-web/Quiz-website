const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('nav-links');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('appear');
        console.log("clicked!")
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('appear');
    })
}