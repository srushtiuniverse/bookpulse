async function searchBook() {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const book = await response.json();
    const resultsDiv = document.getElementById('results');
    
    if (book.error) {
        resultsDiv.innerHTML = `<p>${book.error}</p>`;
    } else {
        displayResults(book);
    }
    resultsDiv.style.display = 'block';
}

function displayResults(book) {
    const resultsDiv = document.getElementById('results');
    const popularityPercentage = (book.ratings_count / 100000) * 100;
    const positiveRatingPercentage = (book.average_rating / 5) * 100;

    resultsDiv.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Popularity:</strong> ${popularityPercentage.toFixed(2)}%</p>
        <p><strong>Positive Ratings:</strong> ${positiveRatingPercentage.toFixed(2)}%</p>
    `;
}