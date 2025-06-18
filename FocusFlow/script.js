window.addEventListener('DOMContentLoaded', startTypingEffect);

function startTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const text = typingText.getAttribute('data-text') || 'Focus';
  typingText.innerHTML = ''; // Clear initial content

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    } else {
      // Optional: remove blinking cursor after typing is complete
      setTimeout(() => {
        typingText.style.borderRight = 'none';
      }, 1000);
    }
  };

  setTimeout(typeWriter, 500); // slight delay before starting
}

window.addEventListener('DOMContentLoaded', startTypingEffect);