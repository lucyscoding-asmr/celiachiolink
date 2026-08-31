// Apre l'app social se installata; altrimenti lascia il collegamento web come fallback.
function openSocialLink(event) {
    const link = event.currentTarget;
    const appUrl = link.dataset.appUrl;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    // Gli URL HTTPS sono Universal/App Links e consentono comunque l'apertura
    // dell'app. Usiamo lo schema nativo solo come tentativo aggiuntivo su mobile.
    if (!appUrl || (!isIOS && !isAndroid)) return;

    event.preventDefault();
    let appOpened = false;
    const markAppOpened = () => {
        if (document.visibilityState === 'hidden') appOpened = true;
    };

    document.addEventListener('visibilitychange', markAppOpened, { once: true });
    window.addEventListener('pagehide', () => { appOpened = true; }, { once: true });
    window.location.assign(appUrl);

    // Se l'app non è disponibile, torna al profilo nel browser. Il timer viene
    // annullato quando il browser passa in background per l'apertura dell'app.
    window.setTimeout(() => {
        if (!appOpened && document.visibilityState === 'visible') {
            window.location.assign(link.href);
        }
    }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const btnIos = document.getElementById('btn-ios');
    const btnAndroid = document.getElementById('btn-android');
    const downloadContainer = document.getElementById('download-container');

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    document.querySelectorAll('.link-card[data-app-url]').forEach((link) => {
        link.addEventListener('click', openSocialLink);
    });

    // Gestione nativa dello store in base al dispositivo dell'utente
    if (isIOS) {
        // Su iOS: App Store in primo piano (Blu), Play Store secondario (Azzurro)
        btnAndroid.classList.remove('btn-primary');
        btnAndroid.classList.add('btn-secondary');
    } else if (isAndroid) {
        // Su Android: Sposta Google Play in alto e metti App Store come secondario
        downloadContainer.insertBefore(btnAndroid, btnIos);
        btnIos.classList.remove('btn-primary');
        btnIos.classList.add('btn-secondary');
    }
    // Su Desktop/Mac: entrambi i pulsanti rimangono con evidenza principale
});
