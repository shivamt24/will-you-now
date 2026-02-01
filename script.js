const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const celebration = document.getElementById('celebration');
const container = document.querySelector('.container');


// Ensure No button is right next to Yes on load (no absolute positioning)
noBtn.style.position = '';
noBtn.style.left = '';
noBtn.style.top = '';

function moveNoBtn(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const btnRect = noBtn.getBoundingClientRect();
  const btnX = btnRect.left + btnRect.width / 2;
  const btnY = btnRect.top + btnRect.height / 2;
  const dist = Math.hypot(mouseX - btnX, mouseY - btnY);
  if (dist < 120) {
    // Move No button away from cursor
    let angle = Math.atan2(btnY - mouseY, btnX - mouseX);
    let newX = btnRect.left + Math.cos(angle) * 120;
    let newY = btnRect.top + Math.sin(angle) * 120;
    // Keep within window
    newX = Math.max(0, Math.min(window.innerWidth - btnRect.width, newX));
    newY = Math.max(0, Math.min(window.innerHeight - btnRect.height, newY));
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
  }
}
document.addEventListener('mousemove', moveNoBtn);

noBtn.addEventListener('click', (e) => {
  // Never allow click
  moveNoBtn(e);
});

yesBtn.addEventListener('click', () => {
  celebration.classList.remove('hidden');
  // Confetti effect
  confetti();
  setTimeout(() => {
    celebration.classList.add('hidden');
  }, 3500);
});

// Simple confetti effect
function confetti() {
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    conf.style.position = 'fixed';
    conf.style.left = Math.random() * window.innerWidth + 'px';
    conf.style.top = '-30px';
    conf.style.width = '12px';
    conf.style.height = '12px';
    conf.style.background = `hsl(${Math.random()*360},80%,70%)`;
    conf.style.borderRadius = '50%';
    conf.style.zIndex = 20;
    conf.style.opacity = 0.8;
    conf.style.transition = 'top 2.5s linear';
    document.body.appendChild(conf);
    setTimeout(() => {
      conf.style.top = window.innerHeight + 'px';
    }, 50);
    setTimeout(() => {
      conf.remove();
    }, 2700);
  }
}
