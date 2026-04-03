const container = document.getElementById("scriptsData")
class ScriptLoader {
    constructor(url, batchSize = 50) {
        this.url = url;
        this.data = null;
        this.batchSize = batchSize;
        this.currentIndex = 0;
    }

    async load() {
        if (!this.data) {
            const res = await fetch(this.url);
            this.data = await res.json();
        }
        this.renderNextBatch();
    }

    renderNextBatch() {
        const nextBatch = this.data.scripts.slice(this.currentIndex, this.currentIndex + this.batchSize);

        container.insertAdjacentHTML("beforeend",
            nextBatch.map((script, index) => `
<div class='card'>
  <div class='card-header'>
    <p>${script.name.charAt(0).toUpperCase() + script.name.slice(1)}</p>
    <div>
      <i class='fas fa-copy copy-btn'
         data-code="${encodeURIComponent(script.code)}"
         data-index="${this.currentIndex + index}"
         title='Copy code'
         style='cursor:pointer'></i>
      <i class='fas fa-book desc-btn'
         data-desc="${encodeURIComponent(script.description)}"
         title='Description'
         style='cursor:pointer'></i>
      <i class='fas fa-play-circle run-btn'
         data-code="${encodeURIComponent(script.code)}"
         title='Run code'
         style='cursor:pointer'></i>
      <i class='fas fa-heart heart-btn' 
         data-code="${encodeURIComponent(script.code)}"
         data-title="${encodeURIComponent(script.name.charAt(0).toUpperCase() + script.name.slice(1))}"
         title='Add to favorites'
         style='cursor:pointer'></i>
    </div>
  </div>

  <pre><code>${script.code}</code></pre>
</div>
`).join("")
        );

        this.currentIndex += this.batchSize;

        if (this.currentIndex < this.data.scripts.length) {
            const buttonContainer = document.getElementById("buttonContainer"); const btn = document.createElement("button");
            btn.id = "loadMoreBtn";
            btn.textContent = "Load More Scripts";
            btn.onclick = () => {
                this.renderNextBatch();
                btn.remove();
            };
            buttonContainer.appendChild(btn);
        }
    }
}

const loader = new ScriptLoader("./data/scripts.json", 10);
loader.load();

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        const code = decodeURIComponent(e.target.getAttribute("data-code"));
        copyCode(code);
    } else if (e.target.classList.contains("desc-btn")) {
        const desc = decodeURIComponent(e.target.getAttribute("data-desc"));
        alert(desc);
    } else if (e.target.classList.contains("run-btn")) {
        const code = decodeURIComponent(e.target.getAttribute("data-code"));
        runCode(code);
    } else if (e.target.classList.contains("heart-btn")) {
        const code = decodeURIComponent(e.target.getAttribute("data-code"));
        const title = decodeURIComponent(e.target.getAttribute("data-title"));
        setAsFavorite(code, title);
    }
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        const title = card.querySelector(".card-header").textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});