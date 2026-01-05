// ==== ГЛАВНЫЙ СКРИПТ — 2012: РАЗЛОМ ====
let userName = "", userTime = "";
let fearLevel = 0;
let audioCtx, masterGain, analyser;
let whisperAudioElem, whisperSource, whisperGain, whisperPanner;
let melodyAudio, glitchSound, tickAudio, chaosAudio, screamAudio;

// Элементы
const timeScreen = document.getElementById("timeScreen");
const nameScreen = document.getElementById("nameScreen");
const content = document.getElementById("content");
const welcome = document.getElementById("welcome");
const corruptBlock = document.getElementById("corrupt2012");
const videoOverlay = document.getElementById("videoOverlay");
const sleditVideo = document.getElementById("sleditVideo");
const glitchEnd = document.getElementById("glitchEnd");
const bloodyTimer = document.getElementById("bloodyTimer");
const timerDisplay = document.getElementById("timerDisplay");
const crackEffect = document.getElementById("crackEffect");
const suddenFlash = document.getElementById("suddenFlash");
const flashMessage = document.getElementById("flashMessage");

// Скримеры
const scareImages = [
    'scary1.jpg', 'scary2.jpg', 'scary3.jpg',
    'scary4.jpg', 'scary5.jpg', 'scary6.jpg',
    'scary7.jpg', 'scary8.jpg'
];

// Символы для искажения
const corruptChars = "█▓▒░#@$%&?/\\|<>[]{}01";
const letters = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ";

// Фразы
const hiddenMessages = [
    "ТЫ УЖЕ БЫЛ ЗДЕСЬ",
    "НЕ ОГЛЯДЫВАЙСЯ",
    "ВРЕМЯ НЕ СУЩЕСТВУЕТ",
    "ЭТО НЕ ПЕРВЫЙ ВХОД",
    "ОН ЗА СПИНОЙ",
    "ТЫ НЕ ВЫБЕРЁШЬСЯ",
    "СМОТРИ",
    "ОН ВИДИТ ТЕБЯ"
];

// ==== ПРЕДЗАГРУЗКА ЗВУКОВ ====
function preloadSounds() {
    whisperAudioElem = new Audio("strashnyi-shepot.mp3");
    whisperAudioElem.loop = true;
    whisperAudioElem.volume = 0.08;

    melodyAudio = new Audio("melody.mp3");
    melodyAudio.loop = true;
    melodyAudio.volume = 0.1;

    tickAudio = new Audio("tick.mp3");
    tickAudio.loop = true;
    tickAudio.volume = 0.1;

    glitchSound = new Audio("glitch.mp3");
    glitchSound.volume = 0.5;

    chaosAudio = new Audio("af6738ba210e593.mp3");
    chaosAudio.volume = 1.0;

    screamAudio = new Audio("scream.mp3");
    screamAudio.volume = 0.8;

    // Разблокировка аудио
    document.addEventListener("click", unlockAudio, { once: true });
}

function unlockAudio() {
    if (audioCtx) audioCtx.resume();
    whisperAudioElem.play().catch(() => {});
    melodyAudio.play().catch(() => {});
    tickAudio.play().catch(() => {});
    initAudio();
}

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);
    connectWhisper();
}

function connectWhisper() {
    if (!audioCtx || whisperSource) return;
    whisperSource = audioCtx.createMediaElementSource(whisperAudioElem);
    whisperPanner = audioCtx.createStereoPanner();
    whisperGain = audioCtx.createGain();
    whisperGain.gain.value = 0.06;
    whisperSource.connect(whisperPanner).connect(whisperGain).connect(masterGain);
}

// ==== ЭФФЕКТЫ ====
function flashScreen() {
    const flash = document.getElementById("flashEffect");
    flash.style.opacity = 0.5 + fearLevel * 0.005;
    setTimeout(() => { flash.style.opacity = 0; }, 50 + fearLevel);
}

function screenShake() {
    document.body.style.animation = `shake 0.1s infinite`;
    setTimeout(() => { document.body.style.animation = ""; }, 100 + fearLevel);
}

function playGlitchBurst() {
    if (glitchSound) {
        glitchSound.currentTime = 0;
        glitchSound.play().catch(() => {});
    }
    flashScreen();
    screenShake();
    document.body.classList.add("bw-flash");
    setTimeout(() => document.body.classList.remove("bw-flash"), 80 + fearLevel);
}

// ==== ПОЛНОЭКРАННЫЙ СКРИМЕР (гарантированно!) ====
function showFullscreenScare() {
    const scare = document.createElement("div");
    scare.style.position = "fixed";
    scare.style.top = "0";
    scare.style.left = "0";
    scare.style.width = "100vw";
    scare.style.height = "100vh";
    scare.style.zIndex = "999999";
    scare.style.pointerEvents = "none";
    scare.style.backgroundImage = `url('${scareImages[Math.floor(Math.random() * scareImages.length)]}')`;
    scare.style.backgroundSize = "cover";
    scare.style.backgroundPosition = "center";
    scare.style.backgroundRepeat = "no-repeat";
    scare.style.filter = "contrast(1.4) brightness(0.8) saturate(1.2)";
    scare.style.border = "3px solid #ff3b3b";
    scare.style.boxShadow = "0 0 40px rgba(255, 59, 59, 0.8)";
    scare.style.opacity = "0";
    scare.style.transition = "opacity 0.1s";

    document.body.appendChild(scare);

    setTimeout(() => { scare.style.opacity = "1"; }, 10);
    playGlitchBurst();

    setTimeout(() => {
        scare.style.opacity = "0";
        setTimeout(() => {
            if (scare && scare.parentNode) scare.remove();
        }, 300);
    }, 300 + Math.random() * 300);
}

// ==== БЕЛАЯ ВСПЫШКА С ИСКАЖЁННЫМ ТЕКСТОМ ====
function flashSuddenMessage() {
    const messages = [
        "МЫ ТЕБЯ ВИДИМ",
        "ОН СМОТРИТ ЧЕРЕЗ ЭКРАН",
        "ТЫ НЕ ВЫЙДЕШЬ ЖИВЫМ",
        "ЗАКРОЙ ГЛАЗА",
        "ТЫ УМРЁШЬ В 03:47",
        "ТЫ НЕ ПЕРВЫЙ"
    ];

    const text = suddenFlash.querySelector(".text");
    const msg = messages[Math.floor(Math.random() * messages.length)];

    text.innerHTML = '';
    for (let char of msg) {
        const span = document.createElement('span');
        span.innerText = char;
        if (Math.random() < 0.3) {
            span.style.position = 'relative';
            span.style.top = (Math.random() > 0.5 ? '-' : '') + Math.random() * 15 + 'px';
            span.style.left = (Math.random() > 0.5 ? '-' : '') + Math.random() * 10 + 'px';
            span.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
            span.style.display = 'inline-block';
        }
        text.appendChild(span);
    }

    suddenFlash.classList.add("show");
    playGlitchBurst();
    screenShake();

    setTimeout(() => {
        suddenFlash.classList.remove("show");
    }, 500);
}

// ==== РАЗЛОМЫ (ТРЩИНЫ) ====
function playCrack() {
    crackEffect.classList.remove("active");
    void crackEffect.offsetWidth;
    crackEffect.classList.add("active");

    const crackSound = new Audio("crack.mp3");
    crackSound.volume = 0.6;
    crackSound.play().catch(() => {});

    playGlitchBurst();

    setTimeout(() => {
        crackEffect.classList.remove("active");
    }, 1500);
}

// ==== ВИДЕО "СЛЕДИТ" ====
function playSleditVideo() {
    if (Math.random() > 0.4 + fearLevel * 0.006) return;
    videoOverlay.classList.add("show");
    sleditVideo.currentTime = 0;
    sleditVideo.play().catch(() => {});
    playGlitchBurst();
    setTimeout(() => { videoOverlay.classList.remove("show"); }, 3000);
}

// ==== ИСКАЖЁННЫЙ ТЕКСТ ====
function generateCorruptText() {
    let result = "";
    for (let i = 0; i < 4; i++) {
        let line = "";
        const freq = 0.02 + fearLevel * 0.001;
        for (let j = 0; j < 42; j++) {
            if (Math.random() < freq) {
                line += letters[Math.floor(Math.random() * letters.length)];
            } else {
                line += corruptChars[Math.floor(Math.random() * corruptChars.length)];
            }
        }
        result += line + "\n";
    }
    return result;
}

// ==== НАРАСТАНИЕ СТРАХА КАЖДЫЕ 10 СЕКУНД ====
function increaseHostility() {
    fearLevel = Math.min(100, fearLevel + 5);

    // Громкость
    if (melodyAudio) melodyAudio.volume = 0.1 + (fearLevel / 100) * 0.3;
    if (tickAudio) tickAudio.volume = 0.1 + (fearLevel / 100) * 0.2;

    // Частота эффектов
    clearInterval(window.fullScareInterval);
    window.fullScareInterval = setInterval(showFullscreenScare, 12000 - fearLevel * 100);

    clearInterval(window.flashInterval);
    window.flashInterval = setInterval(flashSuddenMessage, 15000 - fearLevel * 120);

    clearInterval(window.crackInterval);
    window.crackInterval = setInterval(playCrack, 25000 - fearLevel * 150);

    clearInterval(window.videoInterval);
    window.videoInterval = setInterval(playSleditVideo, 50000 - fearLevel * 250);

    clearInterval(window.corruptInterval);
    window.corruptInterval = setInterval(() => {
        corruptBlock.innerText = generateCorruptText();
    }, 2500 - fearLevel * 10);
}

// ==== ТАЙМЕР 1.5 МИНУТЫ ====
function startBloodyTimer() {
    let timeLeft = 90;
    bloodyTimer.style.opacity = 1;

    const timer = setInterval(() => {
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        timerDisplay.innerText = `${minutes}:${seconds}`;

        if (timeLeft <= 10) {
            timerDisplay.style.color = "#ff0000";
            timerDisplay.style.textShadow = "0 0 10px #ff0000, 0 0 20px red";
            timerDisplay.style.animation = "flicker 0.1s infinite";
            playGlitchBurst();
            if (timeLeft % 2 === 0) screenShake();
        }

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            bloodyTimer.style.opacity = 0;
            stopAllAudio();
            setTimeout(askTruth, 1000);
        }
    }, 1000);
}

function stopAllAudio() {
    if (whisperAudioElem) whisperAudioElem.pause();
    if (melodyAudio) melodyAudio.pause();
    if (tickAudio) tickAudio.pause();
}

// ==== ПЛАШКА: "ХОТИТЕ УЗНАТЬ ПРАВДУ?" ====
function askTruth() {
    playGlitchBurst();
    screenShake();

    const truthModal = document.createElement("div");
    truthModal.id = "truthModal";
    truthModal.style = `
        position: fixed; inset: 0; background: #000; display: flex;
        align-items: center; justify-content: center; z-index: 100000;
        color: #ff3b3b; font-family: "Courier New", monospace;
        font-size: 56px; font-weight: bold; text-align: center;
        letter-spacing: 5px; opacity: 0; animation: appear 1s forwards;
    `;
    truthModal.innerHTML = `
        <div>
            <p style="margin-bottom: 40px;">ХОТИТЕ УЗНАТЬ ВСЮ ПРАВДУ?</p>
            <div>
                <button onclick="askSure()" style="
                    margin: 0 30px; padding: 20px 50px; font-size: 32px;
                    background: #000; border: 2px solid #ff3b3b; color: #ff3b3b;
                ">ДА</button>
                <button onclick="closeSite()" style="
                    margin: 0 30px; padding: 20px 50px; font-size: 32px;
                    background: #000; border: 2px solid #ff3b3b; color: #ff3b3b;
                ">НЕТ</button>
            </div>
        </div>
    `;
    document.body.appendChild(truthModal);
}

function askSure() {
    const modal = document.getElementById("truthModal");
    if (modal) modal.remove();
    playGlitchBurst();

    const sureModal = document.createElement("div");
    sureModal.style = `
        position: fixed; inset: 0; background: #000; display: flex;
        align-items: center; justify-content: center; z-index: 100000;
        color: #ff3b3b; font-size: 56px; font-family: "Courier New", monospace;
        font-weight: bold; text-align: center; opacity: 0; animation: appear 1s forwards;
    `;
    sureModal.innerHTML = `
        <div>
            <p style="margin-bottom: 40px;">ВЫ УВЕРЕНЫ?</p>
            <div>
                <button onclick="confirmFinal()" style="
                    margin: 0 30px; padding: 20px 50px; font-size: 32px;
                    background: #000; border: 2px solid #ff3b3b; color: #ff3b3b;
                ">ДА</button>
                <button onclick="closeSite()" style="
                    margin: 0 30px; padding: 20px 50px; font-size: 32px;
                    background: #000; border: 2px solid #ff3b3b; color: #ff3b3b;
                ">НЕТ</button>
            </div>
        </div>
    `;
    document.body.appendChild(sureModal);
}

function confirmFinal() {
    const modal = document.getElementById("truthModal") || document.querySelector(".final-modal");
    if (modal) modal.remove();

    playGlitchBurst();

    const noReturn = document.createElement("div");
    noReturn.id = "noReturn";
    noReturn.style = `
        position: fixed; inset: 0; background: #000; color: #ff0000;
        display: flex; flex-direction: column; align-items: center;
        justify-content: center; z-index: 100000; font-family: "Courier New";
        font-size: 72px; font-weight: bold; letter-spacing: 8px;
        opacity: 0; animation: appear 1s forwards;
    `;
    noReturn.innerHTML = `
        <div>НАЗАД ПУТИ НЕТ</div>
        <div style="font-size: 32px; margin-top: 20px; animation: flicker 0.3s infinite;">⚠️</div>
    `;
    document.body.appendChild(noReturn);

    setTimeout(() => {
        noReturn.remove();
        startChaos();
    }, 2500);
}

// ==== ПОЛНЫЙ ХАОТИЧЕСКИЙ ФИНАЛ ====
function startChaos() {
    const errors = [
        "SYSTEM FAILED",
        "REALITY BREACH",
        "ENTITY IN PROXIMITY",
        "ACCESS DENIED",
        "RETURN PROHIBITED"
    ];

    let index = 0;

    const showNextError = () => {
        if (index >= errors.length) {
            showBSOD();
            return;
        }

        const div = document.createElement("div");
        div.style = `
            position: fixed; inset: 0; background: #000; color: #ff0000;
            display: flex; align-items: center; justify-content: center;
            font-family: "Courier New"; font-size: 64px; font-weight: bold;
            z-index: 100000; opacity: 0;
        `;
        div.innerText = errors[index];
        document.body.appendChild(div);

        setTimeout(() => { div.style.opacity = 1; }, 50);
        playGlitchBurst();
        screenShake();

        setTimeout(() => {
            div.style.opacity = 0;
            setTimeout(() => { div.remove(); }, 300);
            index++;
            setTimeout(showNextError, 300 + Math.random() * 300);
        }, 600 + Math.random() * 200);
    };

    function showBSOD() {
        const bsod = document.createElement("div");
        bsod.id = "bsodScreen";
        bsod.style = `
            position: fixed; inset: 0; background: #000080; color: #fff;
            font-family: "Consolas", "Courier New"; font-size: 24px;
            padding: 100px 60px; z-index: 100000;
        `;
        bsod.innerHTML = `
            <h1 style="color:#fff;font-size:60px;margin-bottom:30px;">:(</h1>
            <p>К сожалению, ваше устройство столкнулось с проблемой и необходимо перезагрузиться.</p>
            <p>Мы собираем информацию об ошибке, а затем выполним перезагрузку.</p>
            <pre style="color:#cfcfcf;line-height:1.4;">
Ошибка: 0x0000007F
CRITICAL_PROCESS_DIED
Разрыв реальности
Сущность приближается
Вы уже были здесь
            </pre>
            <p>Не выключайте питание.</p>
        `;
        document.body.appendChild(bsod);

        screenShake();
        setInterval(playGlitchBurst, 200);

        setTimeout(() => {
            try {
                window.open('', '_self', '').close();
                window.close();
            } catch (e) {
                alert("Система не отвечает. Вас больше нет.");
            }
        }, 7000);
    }

    chaosAudio.play().catch(() => {});
    setInterval(() => {
        screamAudio.currentTime = 0;
        screamAudio.play().catch(() => {});
    }, 900);

    showNextError();
}

// ==== ЗАПУСК ПОСЛЕ ВВОДА ====
document.getElementById("timeBtn").addEventListener("click", () => {
    userTime = document.getElementById("timeInput").value || "НЕИЗВЕСТНО";
    timeScreen.style.display = "none";
    nameScreen.style.display = "flex";
    preloadSounds();
});

document.getElementById("nameBtn").addEventListener("click", () => {
    userName = document.getElementById("nameInput").value || "СУБЪЕКТ";
    nameScreen.style.display = "none";
    content.style.display = "block";

    welcome.innerHTML = `${userName}, в ${userTime} всё началось.`;

    // Замена имени в тексте
    document.body.innerHTML = document.body.innerHTML.replace(/\${userName}/g, userName);

    // Запуск
    startBloodyTimer();
    startFlashWarnings();
    increaseHostility();
    setInterval(increaseHostility, 10000);

    corruptBlock.innerText = generateCorruptText();
    setInterval(() => {
        if (Math.random() > 0.92) {
            const msg = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
            corruptBlock.innerHTML = `<span class="hint">${msg}</span>`;
            playGlitchBurst();
            setTimeout(() => {
                corruptBlock.innerText = generateCorruptText();
            }, 800);
        } else {
            corruptBlock.innerText = generateCorruptText();
        }
    }, 2500);
});

// ==== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ====
function startFlashWarnings() {
    setTimeout(() => {
        flashSuddenMessage();
        setInterval(flashSuddenMessage, Math.random() * 40000 + 20000);
    }, Math.random() * 15000 + 15000);
}

function closeSite() {
    try {
        window.open('', '_self', '').close();
        window.close();
    } catch (e) {
        alert("Вы не можете уйти. Он уже знает, что вы были здесь.");
    }
}

function nextModal(num) {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
    document.getElementById("modal" + num).style.display = "block";
}

function finalStep() {
    document.getElementById("overlay").style.display = "none";
    setTimeout(askTruth, 500);
}

function closeAll() {
    document.getElementById("overlay").style.display = "none";
}
