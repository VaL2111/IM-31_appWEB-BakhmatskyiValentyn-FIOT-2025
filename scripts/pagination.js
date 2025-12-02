document.addEventListener('DOMContentLoaded', () => {
    const shopConfig = {
        itemSelector: '.pro',
        containerSelector: '.pro-container',
        itemsPerPage: 8
    };

    const blogConfig = {
        itemSelector: '.blog-box',
        itemsPerPage: 3
    };

    const isShopPage = document.querySelector('.pro-container') !== null;
    const isBlogPage = document.querySelector('#blog') !== null;

    if (isShopPage) {
        initPagination(shopConfig.itemSelector, shopConfig.itemsPerPage);
    } else if (isBlogPage) {
        initPagination(blogConfig.itemSelector, blogConfig.itemsPerPage);
    }
});

function initPagination(itemSelector, itemsPerPage) {
    const items = document.querySelectorAll(itemSelector);
    const paginationContainer = document.getElementById('pagination');

    if (items.length === 0 || !paginationContainer) return;

    const pageCount = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;

    if (pageCount <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    function displayItems(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        items.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function setupPaginationBtn() {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('a');
            btn.innerText = i;
            btn.href = '#';

            if (i === currentPage) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayItems(currentPage);

                const currentBtn = paginationContainer.querySelector('.active');
                if(currentBtn) currentBtn.classList.remove('active');
                btn.classList.add('active');
            });

            paginationContainer.appendChild(btn);
        }

        if (pageCount > 1) {
            const nextBtn = document.createElement('a');
            nextBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            nextBtn.href = '#';

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < pageCount) {
                    currentPage++;
                    displayItems(currentPage);
                    setupPaginationBtn();

                    const listHeader = document.querySelector(itemSelector).parentElement.previousElementSibling;
                    if(listHeader) listHeader.scrollIntoView({behavior: 'smooth'});
                }
            });
            paginationContainer.appendChild(nextBtn);
        }
    }

    displayItems(currentPage);
    setupPaginationBtn();
}