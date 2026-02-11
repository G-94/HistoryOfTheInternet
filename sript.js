// Данные для таймлайна
const timelineData = [
    {
        date: "Январь 2020",
        titleLeft: "Начало проекта",
        descriptionLeft: "Инициация и планирование крупного технологического проекта с определением целей и сроков.",
        titleRight: "Команда",
        descriptionRight: "Формирование основной команды из 5 специалистов: архитектор, разработчики, дизайнер."
    },
    {
        date: "Июнь 2020",
        titleLeft: "Первый прототип",
        descriptionLeft: "Завершение работы над первым функциональным прототипом системы. Проведение внутреннего тестирования.",
        titleRight: "Технологии",
        descriptionRight: "Выбор стека технологий: React для фронтенда, Node.js для бэкенда, MongoDB для базы данных."
    },
    {
        date: "Декабрь 2020",
        titleLeft: "Бета-тестирование",
        descriptionLeft: "Запуск публичного бета-тестирования с привлечением первых 100 пользователей. Сбор обратной связи.",
        titleRight: "Партнерство",
        descriptionRight: "Заключение первого крупного партнерского соглашения с технологической компанией."
    },
    {
        date: "Май 2021",
        titleLeft: "Официальный запуск",
        descriptionLeft: "Публичный релиз продукта. Презентация на крупной отраслевой конференции.",
        titleRight: "Рост",
        descriptionRight: "Привлечение первых 1000 активных пользователей. Получение положительных отзывов в прессе."
    },
    {
        date: "Октябрь 2021",
        titleLeft: "Вторая версия",
        descriptionLeft: "Выпуск обновленной версии продукта с новыми функциями и улучшенным пользовательским интерфейсом.",
        titleRight: "Расширение команды",
        descriptionRight: "Увеличение команды до 15 человек. Открытие новых вакансий для поддержки растущего проекта."
    },
    {
        date: "Февраль 2022",
        titleLeft: "Международная экспансия",
        descriptionLeft: "Запуск поддержки трех новых языков и адаптация продукта для международного рынка.",
        titleRight: "Инвестиции",
        descriptionRight: "Привлечение инвестиций в размере $2 млн для дальнейшего развития и масштабирования проекта."
    }
];

// Текущий активный элемент
let currentItemIndex = 0;

// Инициализация таймлайна
function initTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    // Создание элементов таймлайна
    timelineData.forEach((item, index) => {
        // Элемент таймлайна
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index === currentItemIndex ? 'active' : ''}`;
        timelineItem.id = `timeline-item-${index}`;

        // Дата
        const dateElement = document.createElement('div');
        dateElement.className = 'timeline-date';
        dateElement.textContent = item.date;

        // Контент слева
        const contentLeft = document.createElement('div');
        contentLeft.className = 'timeline-content left';
        contentLeft.innerHTML = `
            <div class="content-title">${item.titleLeft}</div>
            <div class="content-description">${item.descriptionLeft}</div>
        `;

        // Контент справа
        const contentRight = document.createElement('div');
        contentRight.className = 'timeline-content right';
        contentRight.innerHTML = `
            <div class="content-title">${item.titleRight}</div>
            <div class="content-description">${item.descriptionRight}</div>
        `;

        // Добавление элементов
        timelineItem.appendChild(dateElement);
        timelineItem.appendChild(contentLeft);
        timelineItem.appendChild(contentRight);

        // Добавление в таймлайн
        timeline.appendChild(timelineItem);

        // Добавление кнопки перехода (кроме последнего элемента)
        if (index < timelineData.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.className = 'timeline-next-btn';
            nextButton.textContent = `Следующее событие: ${timelineData[index + 1].date}`;
            nextButton.dataset.target = index + 1;
            
            nextButton.addEventListener('click', () => {
                navigateToItem(index + 1);
            });
            
            timeline.appendChild(nextButton);
        }
    });

    updateNavButtons();
}

// Навигация по таймлайну
function navigateToItem(index) {
    if (index >= 0 && index < timelineData.length) {
        currentItemIndex = index;
        
        // Обновление активного элемента
        document.querySelectorAll('.timeline-item').forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Прокрутка к элементу
        const element = document.getElementById(`timeline-item-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        updateNavButtons();
    }
}

// Обновление состояния кнопок навигации
function updateNavButtons() {
    document.getElementById('prev-btn').disabled = currentItemIndex === 0;
    document.getElementById('next-btn').disabled = currentItemIndex === timelineData.length - 1;
    document.getElementById('first-btn').disabled = currentItemIndex === 0;
    document.getElementById('last-btn').disabled = currentItemIndex === timelineData.length - 1;
}

// Инициализация навигационных кнопок
function initNavButtons() {
    document.getElementById('prev-btn').addEventListener('click', () => {
        navigateToItem(currentItemIndex - 1);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        navigateToItem(currentItemIndex + 1);
    });

    document.getElementById('first-btn').addEventListener('click', () => {
        navigateToItem(0);
    });

    document.getElementById('last-btn').addEventListener('click', () => {
        navigateToItem(timelineData.length - 1);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initNavButtons();
    
    // Автоматическая прокрутка к первому элементу
    navigateToItem(0);
});

// Функция для добавления нового элемента в таймлайн (опционально)
function addTimelineItem(item) {
    timelineData.push(item);
    initTimeline();
    navigateToItem(timelineData.length - 1);
}
