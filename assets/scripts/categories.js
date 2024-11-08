document.addEventListener('DOMContentLoaded', () => {
    const categoriesList = document.getElementById('category-buttons');
    const query = document.getElementById('query');
    const form = document.getElementById('categories');

    for (let key in data[0].categories) {
        let category = document.createElement('button');
        category.type = 'submit';
        category.className = 'category-button'; 
        category.textContent = key;
        categoriesList.appendChild(category);

        category.addEventListener('click', function (event) {
            event.preventDefault();
            query.value = this.textContent;
            form.submit();
        });
    }
});
