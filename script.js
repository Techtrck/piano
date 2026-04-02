const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const keyFrequencies = {
    'Q': 261.63, // C4
    'W': 293.66, // D4
    'E': 329.63, // E4
    'R': 349.23, // F4
    'T': 392.00, // G4
    'Y': 440.00, // A4
    'U': 493.88, // B4
    'I': 523.25, // C5
    'O': 587.33, // D5
    'P': 659.25  // E5
};

const keys = document.querySelectorAll('.key');

function playNote(frequency) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (keyFrequencies[key]) {
        playNote(keyFrequencies[key]);
        const keyElement = document.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
        }
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`[data-key="${key}"]`);
    if (keyElement) {
        keyElement.classList.remove('active');
    }
});