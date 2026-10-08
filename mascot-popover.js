(() => {
  const messages = [
    "How's your day?",
    "Everything's good? I'm here if you need a little study break.",
    "I bet I could beat you in every mode! Hahaha! Ready to challenge me?",
    "You've made it this far, and that's already something to feel proud of.",
    "Want to try one quick question together? I promise to cheer you on.",
    "Remember to stretch, sip some water, and give your clever brain a rest.",
    "Small steps count too. A little practice today makes tomorrow feel easier.",
    "What's something interesting you learned today? Tell me when you figure it out!",
    "Pick your favorite game and let's see if you can beat your best score.",
    "Getting an answer wrong is just your brain finding another way to learn.",
    "Take a breath, choose a topic, and let's make this a good study session.",
    "I'm rooting for you! Every new thing you practice helps your skills grow.",
    "Need a tiny challenge? Find one new fact and teach it to me later.",
    "You're doing great. Keep being curious, keep asking questions, and keep having fun."
  ];
  const minDelay = 4 * 60 * 1000;
  const maxDelay = 5 * 60 * 1000;
  const visibleDuration = 16000;
  let messageIndex = -1;
  let showTimer;
  let hideTimer;
  let hideAnimationTimer;

  const popover = document.createElement('aside');
  popover.className = 'mascot-popover';
  popover.setAttribute('aria-label', 'Pesan dari maskot BAEUDA');
  popover.setAttribute('aria-live', 'polite');

  const character = document.createElement('button');
  character.className = 'mascot-popover__character';
  character.type = 'button';
  character.setAttribute('aria-label', 'Balas pesan maskot BAEUDA');

  const image = document.createElement('img');
  image.src = 'logo.png';
  image.alt = '';
  character.append(image);

  const bubble = document.createElement('div');
  bubble.className = 'mascot-popover__bubble';

  const text = document.createElement('span');
  text.textContent = messages[messageIndex];

  const close = document.createElement('button');
  close.className = 'mascot-popover__close';
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Tutup pesan maskot');

  bubble.append(text, close);
  popover.append(character, bubble);

  const launcher = document.createElement('button');
  launcher.className = 'mascot-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Panggil maskot BAEUDA');
  launcher.title = 'Sapa Baeuda';
  const launcherImage = document.createElement('img');
  launcherImage.src = 'logo.png';
  launcherImage.alt = '';
  launcher.append(launcherImage);

  function scheduleNext() {
    window.clearTimeout(showTimer);
    showTimer = window.setTimeout(() => {
      if (document.hidden) {
        scheduleNext();
        return;
      }
      show();
    }, minDelay + Math.random() * (maxDelay - minDelay));
  }

  function dismiss() {
    window.clearTimeout(hideTimer);
    window.clearTimeout(hideAnimationTimer);
    popover.classList.remove('is-visible');
    popover.classList.add('is-hiding');
    hideAnimationTimer = window.setTimeout(() => popover.classList.remove('is-hiding'), 700);
    document.body.classList.remove('mascot-visible');
    scheduleNext();
  }

  function show() {
    window.clearTimeout(showTimer);
    messageIndex = (messageIndex + 1) % messages.length;
    text.textContent = messages[messageIndex];
    popover.classList.remove('is-hiding');
    popover.classList.add('is-visible');
    document.body.classList.add('mascot-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(dismiss, visibleDuration);
  }

  character.addEventListener('click', () => {
    messageIndex = (messageIndex + 1) % messages.length;
    text.textContent = messages[messageIndex];
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(dismiss, visibleDuration);
  });
  close.addEventListener('click', dismiss);
  launcher.addEventListener('click', show);
  document.body.append(popover);
  document.body.append(launcher);
  window.BAEUDAMascot = { show, dismiss };
  scheduleNext();
})();