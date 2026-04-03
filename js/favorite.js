function setAsFavorite(code, title) {
    const storedFavorites = localStorage.getItem("favoritesCodes");
    let codes = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (codes.some(item => item.code === code)) {
        alert("This code is already in your favorites.");
        return;
    }

    codes.push({ code: code, title: title });

    localStorage.setItem("favoritesCodes", JSON.stringify(codes));
    console.log(codes);
}
