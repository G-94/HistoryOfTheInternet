document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Элементы навигации (верхняя панель)
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Все события таймлайна (элементы .timeline-item)
    const timelineItems = document.querySelectorAll('.timeline-item');
    // Все кнопки "К следующему" внутри элементов
    const nextButtons = document.querySelectorAll('.next-event-btn');
    
    let currentIndex = 0; // Индекс текущего активного элемента (для навигации)

    // --- Функция скролла к определённому событию ---
    function scrollToItem(index) {
        if (timelineItems.length === 0) return;
        
        // Зацикливаем индекс (если нужно)
        if (index < 0) index = timelineItems.length - 1;
        if (index >= timelineItems.length) index = 0;
        
        const targetItem = timelineItems[index];
        if (targetItem) {
            targetItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            // Небольшая подсветка активного элемента
            timelineItems.forEach(item => item.style.borderColor = 'var(--steel-blue)');
            targetItem.style.borderColor = '#2563eb';
            targetItem.style.transition = 'border-color 0.3s';
        }
        currentIndex = index;
    }

    // --- Обработчики для верхней навигации ---
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            scrollToItem(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            scrollToItem(currentIndex + 1);
        });
    }

    // --- Обработчики для кнопок "К следующему" внутри таймлайна ---
    nextButtons.forEach((btn, idx) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Переход к следующему элементу (если есть)
            scrollToItem(idx + 1);
        });
    });

    // --- Дополнительно: при загрузке выделяем первый элемент ---
    if (timelineItems.length > 0) {
        timelineItems[0].style.borderColor = '#2563eb';
    }

    // --- Небольшая магия: плавное появление стрелок сверху (CSS уже сделал) ---
    console.log('Тёмный таймлайн активирован');
});
