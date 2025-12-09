const card = document.getElementById("card");
const signupLink = document.querySelector(".signup-link");
const signinLink = document.querySelector(".signin-link");
const forgotBox = document.getElementById("forgot-box");
const wrapper = document.querySelector(".wrapper");

function closeCard() {
  wrapper.style.display = "none";
}

signupLink.addEventListener("click", () => {
  card.classList.add("active");
  forgotBox.classList.remove("show");
  wrapper.style.display = "block";
});   

signinLink.addEventListener("click", () => {
  card.classList.remove("active");
  forgotBox.classList.remove("show");
  wrapper.style.display = "block";
});

function showForgot() {
  forgotBox.classList.add("show");
}

function backToLogin() {
  forgotBox.classList.remove("show");
}