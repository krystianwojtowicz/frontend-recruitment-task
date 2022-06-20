const btn = document.querySelector(".dialog__reset-button");
const closeButton = document.querySelector(".dialog__close-button");
const p = document.querySelector(".dialog__p");
let value = localStorage.getItem("click") || 0;
// The <dialog> element itself
const dialog = document.querySelector("dialog");
// The modal's cancel button
const cancelButton = document.querySelector(".dialog__cancel-button");

(function () {
  window.addEventListener("click", function (e) {
    if (e.target.closest(".dialog__reset-button")) {
      value = -1;
    }
    value++;
    p.innerText = `You have clicked ${value} times to related button.`;
    localStorage.setItem("click", value);
    if (value > 5) {
      btn.classList.add("active");
    }
    if (
      dialog.open &&
      (e.target.isEqualNode(cancelButton) ||
        !e.target.closest(".dialog__content") || e.target.isEqualNode(closeButton))
    ) {
      dialog.close();
    } else {
      if (dialog.open) {
        return;
      } else {
        dialog.showModal();
      }
    }
  });
  // If we are using the polyfill, then initialize it
  if (window.dialogPolyfill) {
    dialogPolyfill.registerDialog(dialog);
  }
})();

let msg = new SpeechSynthesisUtterance();
let voices = speechSynthesis.getVoices();
msg.voice = voices[0];
let tags = document.querySelectorAll("button"); // add more tags for you project
tags.forEach((tag) => {
  tag.addEventListener("focus", (e) => {
    msg.text = e.target.innerText;
    tag.style.backgroundColor = "cyan";
    speechSynthesis.speak(msg);

    let interval = setInterval(() => {
      if (!speechSynthesis.speaking) {
        tag.style.removeProperty("background-color");
        clearInterval(interval);
      }
    }, 100);
  });
});
