const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");
const phoneFrame = document.getElementById("phoneFrame");
const authScreens = new Set(["welcome", "login", "register"]);

const uploadFill = document.getElementById("uploadFill");
const uploadPercent = document.getElementById("uploadPercent");
const uploadStatusText = document.getElementById("uploadStatusText");
const uploadSuccess = document.getElementById("uploadSuccess");
const continueAiBtn = document.getElementById("continueAiBtn");
const scannerCard = document.getElementById("scannerCard");
const scanStatus = document.getElementById("scanStatus");
const aiResult = document.getElementById("aiResult");

let audioContext;
let uploadTimer;

function showScreen(screenId) {
  screens.forEach((screen) => {
    const active = screen.id === screenId;
    screen.classList.toggle("active", active);
    if (active) screen.scrollTop = 0;
  });

  phoneFrame.classList.toggle("no-nav", authScreens.has(screenId));

  const navMap = {
    home: "home",
    impact: "home",
    profile: "home",
    reportCapture: "reportCapture",
    reportDetails: "reportCapture",
    uploadStatus: "reportCapture",
    aiScan: "aiScan",
    manualCategory: "aiScan",
    heatmap: "heatmap",
    hotspotDetail: "heatmap",
    eventsList: "eventsList",
    eventDetail: "eventsList"
  };

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === navMap[screenId]);
  });
}

function getAudioContext() {
  // Web Audio API provides success, warning, confirmation, and reminder sounds.
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext;
}

function playTone(frequency, duration, type = "sine", gain = 0.06) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const volume = ctx.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  volume.gain.setValueAtTime(gain, ctx.currentTime);
  volume.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  oscillator.connect(volume);
  volume.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);
}

function playSuccessSound() {
  playTone(523, 0.12);
  setTimeout(() => playTone(659, 0.14), 130);
  setTimeout(() => playTone(784, 0.18), 270);
}

function playWarningSound() {
  playTone(220, 0.16, "sawtooth", 0.05);
  setTimeout(() => playTone(175, 0.18, "sawtooth", 0.05), 210);
}

function playReminderSound() {
  playTone(880, 0.1, "triangle", 0.05);
  setTimeout(() => playTone(1175, 0.16, "triangle", 0.05), 120);
}

function capturePhoto() {
  const preview = document.getElementById("photoPreview");
  preview.classList.add("captured");
  preview.innerHTML = `<span class="camera-mark">🧴</span><strong>Marine waste photo captured</strong><small>Preview: plastic bottle near Port Klang Beach</small>`;
  playSuccessSound();
}

function uploadReport() {
  clearInterval(uploadTimer);
  let progress = 0;
  uploadSuccess.classList.remove("visible");
  continueAiBtn.classList.add("hidden");
  uploadStatusText.textContent = "Uploading report and photo to cloud storage...";
  uploadFill.style.width = "0%";
  uploadPercent.textContent = "0%";

  uploadTimer = setInterval(() => {
    progress += 10;
    uploadFill.style.width = `${progress}%`;
    uploadPercent.textContent = `${progress}%`;
    if (progress >= 100) {
      clearInterval(uploadTimer);
      uploadStatusText.textContent = "Cloud upload completed.";
      uploadSuccess.classList.add("visible");
      continueAiBtn.classList.remove("hidden");
      playSuccessSound();
    }
  }, 120);
}

function startAiScan() {
  scannerCard.classList.add("scanning");
  aiResult.classList.add("hidden");
  scanStatus.textContent = "Scanning image with AI recognition model...";
  playTone(440, 0.12, "square", 0.035);

  setTimeout(() => {
    scannerCard.classList.remove("scanning");
    scanStatus.textContent = "AI scan completed. Please review the detected category.";
    aiResult.classList.remove("hidden");
    playSuccessSound();
  }, 2000);
}

function playVoiceGuide() {
  // Web Speech API provides voice guide for AI waste identification.
  if (!("speechSynthesis" in window)) {
    playWarningSound();
    return;
  }
  const utterance = new SpeechSynthesisUtterance("The detected waste is a plastic bottle. Please confirm the category before submitting the report.");
  utterance.rate = 0.92;
  utterance.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

document.querySelectorAll("[data-screen]").forEach((control) => {
  control.addEventListener("click", () => showScreen(control.dataset.screen));
});

document.getElementById("captureBtn").addEventListener("click", capturePhoto);
document.getElementById("uploadBtn").addEventListener("click", uploadReport);
continueAiBtn.addEventListener("click", () => showScreen("aiScan"));
document.getElementById("startScanBtn").addEventListener("click", startAiScan);
document.getElementById("voiceGuideBtn").addEventListener("click", playVoiceGuide);
document.getElementById("confirmCategoryBtn").addEventListener("click", () => {
  playSuccessSound();
  showScreen("aiScan");
});
document.getElementById("enableReminderBtn").addEventListener("click", () => {
  document.getElementById("reminderStatus").textContent = "Enabled";
  playReminderSound();
});
