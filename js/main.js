// --- Cambiar de index a juego con animación de abeja ---
const btnJugar = document.getElementById('btn-jugar');
const indexView = document.getElementById('index-view');
const juegoView = document.getElementById('juego-view');
const beeAnim = document.getElementById('bee-anim');

btnJugar.addEventListener('click', function () {
    // Mostrar la abeja animada
    beeAnim.classList.remove('oculto');
    beeAnim.style.left = '50%';
    beeAnim.style.top = '60%';

    // Fade out del index
    indexView.classList.add('fade-out');

    // Cuando termina la animación de la abeja, mostrar el juego
    setTimeout(() => {
        indexView.classList.add('oculto');
        juegoView.classList.remove('oculto');
        juegoView.classList.add('fade-in');
        beeAnim.classList.add('oculto');
    }, 1400); // debe coincidir con la duración de la animación bee-fly-anim
});

// También puedes hacer que los otros botones "JUGAR" de la historia activen el cambio
document.querySelectorAll('.botones button:first-child').forEach(btn => {
    btn.addEventListener('click', () => btnJugar.click());
});