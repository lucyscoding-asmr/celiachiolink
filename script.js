// Funzione per aprire i social link (app se disponibile, altrimenti web)
function openSocialLink(appUrl, webUrl) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS || isAndroid) {
        // Su mobile: prova ad aprire l'app
        window.location.href = appUrl;
        
        // Se l'app non è installata, dopo 2 secondi apri il sito web
        setTimeout(() => {
            window.location.href = webUrl;
        }, 2000);
    } else {
        // Su desktop: apri direttamente il sito web
        window.open(webUrl, '_blank');
    }
    
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const btnIos = document.getElementById('btn-ios');
    const btnAndroid = document.getElementById('btn-android');
    const downloadContainer = document.getElementById('download-container');

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

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