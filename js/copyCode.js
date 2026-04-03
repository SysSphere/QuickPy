async function copyCode(code) {
    return navigator.clipboard.writeText(code).then(()=> {
        alert("Code copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy!");
    });
}