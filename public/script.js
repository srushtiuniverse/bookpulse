async function searchBook() {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const book = await response.json();
    if (book.error) {
        alert(book.error);
    } else {
        displayResults(book);
    }
}

function displayResults(book) {
    const resultsDiv = document.getElementById('results');
    const popularityPercentage = (book.ratings_count / 100000) * 100;
    const positiveRatingPercentage = (book.average_rating / 5) * 100;

    resultsDiv.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Popularity: ${popularityPercentage.toFixed(2)}%</p>
        <p>Positive Ratings: ${positiveRatingPercentage.toFixed(2)}%</p>
    `;
}