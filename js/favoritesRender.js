const favoriteSnippet = document.getElementById("favoriteSnippet");
const storedFavorites = localStorage.getItem("favoritesCodes");
let codes = storedFavorites ? JSON.parse(storedFavorites) : [];

function renderFavorites() {
    if (codes.length === 0) {
        favoriteSnippet.innerHTML = "<p>No favorites yet. Add some from the search page!</p>";
        return;
    }

    favoriteSnippet.innerHTML = `
        <div class="cards-container">
            ${codes.map((item, i) => {
        return `
                <div class="card">
                    <div class="card-header">
                        <p>${item.title || "Untitled"}</p>
                        <div>
                            <i class="fas fa-copy" onclick="copyCodeByIndex(${i})" style="cursor:pointer"></i>
                <i class="fas fa-trash" onclick="removeFavoriteByIndex(${i})" style="cursor:pointer; margin-left:10px;"></i>
                        </div>
                    </div>
                    <pre><code>${item.code}</code></pre>
                </div>`;
    }).join("")}
        </div>
    `;
}

function copyCodeByIndex(i) {
    copyCode(codes[i].code);
}

function removeFavoriteByIndex(i) {
    codes.splice(i, 1);
    localStorage.setItem("favoritesCodes", JSON.stringify(codes));
    renderFavorites();
}

renderFavorites();