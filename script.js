const articlesEl = document.querySelector("#articles");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

async function getData(query = "tesla") {
  try {
    articlesEl.innerHTML = "<p>Đang tải tin tức...</p>";

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&sortBy=publishedAt&apiKey=04eaf6e84ed14b06979b2ec7c5b8f509`
    );

    const data = await response.json();

    articlesEl.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      articlesEl.innerHTML = "<p>Không tìm thấy bài báo nào.</p>";
      return;
    }

    for (let i = 0; i < data.articles.length; i++) {
      const article = data.articles[i];
      if (!article.urlToImage || !article.title) continue;

      const date = new Date(article.publishedAt);
      const formattedDate = date.toLocaleDateString("vi-VN");

      articlesEl.innerHTML += `
        <a href="${article.url}" class="single-article" target="_blank">
          <img src="${article.urlToImage}" alt="">
          <h3>${article.title}</h3>
          <p>${article.description || "Không có mô tả"}</p>
          <small>🕒 ${formattedDate} | 📰 ${article.source.name}</small>
        </a>`;
    }
  } catch (error) {
    console.error("Lỗi rồi ====>", error);
    articlesEl.innerHTML = "<p>Đã xảy ra lỗi khi tải tin tức.</p>";
  }
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    getData(query);
  } else {
    alert("Vui lòng nhập từ khóa tìm kiếm!");
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

getData();
