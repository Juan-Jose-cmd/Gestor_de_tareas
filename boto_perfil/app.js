const profileBtn = document.querySelector('.profile-btn'); //Traigo el boton

setInterval(() => {
    const states = ['online', 'offline', 'away'];
    const currentStates = profileBtn.getAttribute('data-state');
    const currentIndex = status.indexOf(currentStates);
    const nextIndex = (currentIndex + 1) % states.length;

    profileBtn.setAttribute('dta-state', states[nextIndex]);

    const stateLabels = {
        'online': 'on-line',
        'offline': 'off-line',
        'away': 'away'
    };
    profileBtn.setAttribute('aria-label', `Menú de perfil de Juan Pérez - ${stateLabels[states[nextIndex]]}`);
},3000);

profileBtn.addEventListener('click', () => {
    console.log('Abrir menu de perfil aqui');
});
