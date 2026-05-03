document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");
    const catalogLink = document.getElementById("catalog-link");

    // Функція для завантаження JSON
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error("Помилка завантаження:", error);
            mainContent.innerHTML = "<p class='text-danger'>Помилка завантаження даних.</p>";
        }
    }

    // Відображення списку категорій
    window.showCategories = async function() {
        const categories = await fetchData('data/categories.json');
        if (!categories) return;

        let html = "<h2 class='mb-4'>Категорії товарів</h2><div class='list-group mb-3'>";
        
        categories.forEach(cat => {
            html += `
                <a href="#" class="list-group-item list-group-item-action" onclick="showItems('${cat.shortname}')">
                    <strong>${cat.name}</strong> <br>
                    <small class="text-muted">${cat.notes || 'Опис відсутній'}</small>
                </a>`;
        });

        html += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-warning" id="specials-link">
                <strong>Specials (Випадкова категорія)</strong>
            </a>
        </div>`;

        mainContent.innerHTML = html;

        // Логіка для Specials
        document.getElementById("specials-link").onclick = function() {
            const randomCat = categories[Math.floor(Math.random() * categories.length)];
            showItems(randomCat.shortname);
        };
    }

    // Відображення товарів конкретної категорії
    window.showItems = async function(shortname) {
        const data = await fetchData(`data/${shortname}.json`);
        if (!data) return;

        let html = `<button class="btn btn-secondary mb-3" onclick="showCategories()">← Назад до категорій</button>`;
        html += `<h2 class="mb-4">${data.category_name}</h2>`;
        html += `<div class="row">`;

        data.items.forEach(item => {
            html += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="https://placehold.co/200x200?text=${item.shortname}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="fw-bold text-primary">${item.price}</p>
                        </div>
                    </div>
                </div>`;
        });

        html += `</div>`;
        mainContent.innerHTML = html;
    };

    catalogLink.addEventListener("click", (e) => {
        e.preventDefault();
        showCategories();
    });
});