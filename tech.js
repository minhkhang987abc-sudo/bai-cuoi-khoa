const articlesEl = document.querySelector("#articles");

async function getData() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=04eaf6e84ed14b06979b2ec7c5b8f509`
    );

    const data = await response.json();

    for (let i = 0; i <= data.articles.length; i++) {
      console.log(data.articles[i]);
      articlesEl.innerHTML += `<a
        href="${data.articles[i].url}"
        class="single-article"
      >
        <img src="${data.articles[i].urlToImage}" alt="" />
        <h3>${data.articles[i].title}</h3>
        <p>
          ${data.articles[i].description}
        </p>
      </a>`;
    }
  } catch (error) {
    console.error("Lỗi rồi ====>", error);
  }
}

getData();
