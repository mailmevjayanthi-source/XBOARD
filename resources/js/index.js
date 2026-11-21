// Names for the 3 topics - in same order as magazines.js
const topicNames = ["Coronavirus", "Technology", "Sports"];

async function getNews(rssUrl) {
  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await res.json();
    return data.items || [];
  } catch (e) {
    return [];
  }
}

async function buildXBoard() {
  const accordion = document.getElementById("accordionExample");
  if (!accordion) return;

  for (let i = 0; i < magazines.length; i++) {
    // NOTE: magazines[i] is directly the URL string, not .rss
    const articles = await getNews(magazines[i]);

    let carouselItems = "";
    articles.forEach((article, index) => {
      carouselItems += `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <a href="${article.link}" target="_blank" style="text-decoration:none; color:black;">
          <div class="card mx-auto" style="max-width:600px;">
            <img src="${article.enclosure?.link}" class="card-img-top" alt="news image">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
            </div>
          </div>
        </a>
      </div>`;
    });

    accordion.innerHTML += `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button ${i !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}">
          ${topicNames[i]}
        </button>
      </h2>
      <div id="collapse${i}" class="accordion-collapse collapse ${i === 0 ? 'show' : ''}">
        <div class="accordion-body">
          <div id="carousel${i}" class="carousel slide">
            <div class="carousel-inner">${carouselItems}</div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel${i}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel${i}" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }
}

buildXBoard();