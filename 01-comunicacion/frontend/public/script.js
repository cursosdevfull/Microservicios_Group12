const tbody = document.querySelector("tbody");

function showRows(rows) {
  const html = rows.reduce((accum, row) => {
    const item = `
            <tr>
                <td>${row.id}</td>
                <td>${row.category}</td>
                <td>${row.product}</td>
                <td>${row.price}</td>
                <td>${row.stock}</td>
            </tr>
        `;

    return accum + item;
  }, "");

  tbody.innerHTML = html;
}

function fetchProducts() {
  fetch("/api/config")
    .then((res) => res.json())
    .then((results) => fetch(results.backend1Url))
    .then((res) => res.json())
    .then((results) => showRows(results));
}

fetchProducts();
