document.addEventListener('DOMContentLoaded', () => {
    // ===== ЭЛЕМЕНТЫ =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    const dateNavButtons = document.querySelectorAll('.date-nav-btn');
    const nextButtons = document.querySelectorAll('.next-event-btn');
    const prevNav = document.getElementById('navPrevBtn');
    const nextNav = document.getElementById('navNextBtn');
    
    // ===== ЭЛЕМЕНТЫ ДЛЯ СВОРАЧИВАНИЯ =====
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navTitle = document.querySelector('.nav-title');
    const navDateButtons = document.getElementById('navDateButtons');
    const navArrows = document.querySelector('.nav-arrows');

    let currentIndex = 0;
    let isNavCollapsed = false;

    // ===== СОЗДАЕМ КНОПКУ СВОРАЧИВАНИЯ =====
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'collapse-nav-btn';
    collapseBtn.innerHTML = '▲';
    collapseBtn.setAttribute('aria-label', 'Свернуть навигацию');
    
    // Вставляем кнопку в навбар
    if (navbar) {
        navbar.appendChild(collapseBtn);
    }

    // ===== ФУНКЦИЯ СВОРАЧИВАНИЯ/РАЗВОРАЧИВАНИЯ =====
    function toggleNavCollapse() {
        isNavCollapsed = !isNavCollapsed;
        
        if (isNavCollapsed) {
            // Сворачиваем
            navbar.classList.add('collapsed');
            collapseBtn.innerHTML = '▼';
            collapseBtn.setAttribute('aria-label', 'Развернуть навигацию');
            
            // Скрываем кнопки дат и стрелки
            if (navDateButtons) navDateButtons.style.display = 'none';
            if (navArrows) navArrows.style.display = 'none';
            
            // Уменьшаем отступ для контента
            document.querySelector('.timeline-wrapper').style.marginTop = '70px';
        } else {
            // Разворачиваем
            navbar.classList.remove('collapsed');
            collapseBtn.innerHTML = '▲';
            collapseBtn.setAttribute('aria-label', 'Свернуть навигацию');
            
            // Показываем кнопки дат и стрелки
            if (navDateButtons) navDateButtons.style.display = 'flex';
            if (navArrows) navArrows.style.display = 'flex';
            
            // Возвращаем отступ
            document.querySelector('.timeline-wrapper').style.marginTop = '90px';
        }
    }

    // ===== ОБРАБОТЧИК КНОПКИ СВОРАЧИВАНИЯ =====
    collapseBtn.addEventListener('click', toggleNavCollapse);

    // ===== ФУНКЦИЯ ПРОКРУТКИ К ЭЛЕМЕНТУ =====
    function scrollToItem(index) {
        if (!timelineItems.length) return;

        // Зацикливание
        if (index < 0) index = timelineItems.length - 1;
        if (index >= timelineItems.length) index = 0;

        const target = timelineItems[index];
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Подсветка активной кнопки даты
        dateNavButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Подсветка элемента таймлайна
        timelineItems.forEach(item => item.style.borderColor = '#1f405e');
        target.style.borderColor = '#3291ff';
        target.style.transition = 'border-color 0.25s';

        currentIndex = index;
    }

    // ===== ОБРАБОТЧИКИ КНОПОК ДАТ =====
    dateNavButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            scrollToItem(idx);
        });
    });

    // ===== КНОПКИ "ПРЕД." / "СЛЕД." =====
    if (prevNav) {
        prevNav.addEventListener('click', () => scrollToItem(currentIndex - 1));
    }
    if (nextNav) {
        nextNav.addEventListener('click', () => scrollToItem(currentIndex + 1));
    }

    // ===== КНОПКИ "К СЛЕДУЮЩЕМУ СОБЫТИЮ" =====
    nextButtons.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const nextIndex = parseInt(this.dataset.next, 10);
            if (!isNaN(nextIndex)) {
                scrollToItem(nextIndex);
            }
        });
    });

    // ===== ПРИ ЗАГРУЗКЕ АКТИВИРУЕМ ПЕРВЫЙ ЭЛЕМЕНТ =====
    if (timelineItems.length > 0) {
        scrollToItem(0);
    }

    // ===== АВТОМАТИЧЕСКОЕ СВОРАЧИВАНИЕ НА МОБИЛЬНЫХ =====
    function handleMobileCollapse() {
        if (window.innerWidth <= 768) {
            if (!isNavCollapsed) {
                toggleNavCollapse();
            }
        }
    }

    // Проверяем при загрузке
    handleMobileCollapse();

    // Проверяем при изменении размера окна
    window.addEventListener('resize', handleMobileCollapse);
});
