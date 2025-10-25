const registerBtn = document.querySelector("#registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!name || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }


    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("Email này đã được đăng ký!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    window.location.href = "login.html";
  });
}

const loginBtn = document.querySelector("#loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Đăng nhập thành công!");
      window.location.href = "index.html";
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  });
}


const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const welcomeEl = document.querySelector("#welcome");
if (welcomeEl && currentUser) {
  welcomeEl.textContent = `Xin chào, ${currentUser.name}!`;
} else if (welcomeEl && !currentUser) {

  window.location.href = "login.html";
}

const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}
