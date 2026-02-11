document.addEventListener('DOMContentLoaded', () => {
    // ===== ЭЛЕМЕНТЫ =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    const dateNavButtons = document.querySelectorAll('.date-nav-btn');
    const nextButtons = document.querySelectorAll('.next-event-btn');
    const prevNav = document.getElementById('navPrevBtn');
    const nextNav = document.getElementById('navNextBtn');

    let currentIndex = 0;

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

        // Подсветка элемента таймлайна (опционально)
        timelineItems.forEach(item => item.style.borderColor = '#1f405e');
        target.style.borderColor = '#3291ff';
        target.style.transition = 'border-color 0.25s';

        currentIndex = index;
    }

    // ===== ОБРАБОТЧИКИ КНОПОК ДАТ (В НАВИГАЦИИ) =====
    dateNavButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            scrollToItem(idx);
        });
    });

    // ===== КНОПКИ "ПРЕД." / "СЛЕД." В НАВИГАЦИИ =====
    if (prevNav) {
        prevNav.addEventListener('click', () => scrollToItem(currentIndex - 1));
    }
    if (nextNav) {
        nextNav.addEventListener('click', () => scrollToItem(currentIndex + 1));
    }

    // ===== КНОПКИ "К СЛЕДУЮЩЕМУ СОБЫТИЮ" ВНУТРИ ТАЙМЛАЙНА =====
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

    // ===== ДИНАМИЧЕСКОЕ ОБНОВЛЕНИЕ КНОПОК ДАТ (ЕСЛИ НУЖНО) =====
    // Можно автоматически собрать даты из data-атрибутов
    function syncNavButtonsFromTimeline() {
        const navContainer = document.getElementById('navDateButtons');
        if (navContainer && timelineItems.length) {
            // Очищаем и создаём кнопки на основе дат из .timeline-item
            navContainer.innerHTML = '';
            timelineItems.forEach((item, i) => {
                const date = item.dataset.date || `Событие ${i+1}`;
                const btn = document.createElement('button');
                btn.className = 'date-nav-btn';
                btn.dataset.index = i;
                btn.textContent = date;
                btn.addEventListener('click', () => scrollToItem(i));
                navContainer.appendChild(btn);
            });
            // Обновляем коллекцию кнопок
            location.reload(); // Упрощённо: можно обновить ссылки, но мы перезагрузим коллекцию
        }
    }

    // Если вы хотите автоматически заполнить навигацию датами из data-date,
    // раскомментируйте строку ниже. Сейчас она закомментирована, т.к. кнопки уже есть в HTML.
    // syncNavButtonsFromTimeline();
});
