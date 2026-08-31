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
