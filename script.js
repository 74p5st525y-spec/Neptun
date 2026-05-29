// ========== ОПТИМИЗАЦИЯ ЗАГРУЗКИ ==========
// Используем requestAnimationFrame для анимаций
function optimizeAnimations() {
    // Проверяем, не на мобильном ли устройстве
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // На мобильных отключаем тяжёлые анимации фона
        const heavyElements = document.querySelectorAll('.bubble, .particle, .cloud, .light');
        heavyElements.forEach(el => el.style.display = 'none');
    }
}

// Запускаем оптимизацию после загрузки страницы
window.addEventListener('load', optimizeAnimations);

// Делаем обработчики событий пассивными для улучшения скролла
const passiveEvents = ['touchstart', 'touchmove', 'scroll'];
passiveEvents.forEach(event => {
    window.addEventListener(event, () => {}, { passive: true });
});

// Запускаем фоновые анимации только когда страница видима
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Страница неактивна - останавливаем тяжёлые анимации
        const animatedElements = document.querySelectorAll('.bubble, .particle, .cloud');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Страница активна - возобновляем анимации
        const animatedElements = document.querySelectorAll('.bubble, .particle, .cloud');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    // ========== НАВИГАЦИЯ ==========
    const navLinks = document.querySelectorAll('.nav > a:not(.dropbtn)');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    const sections = document.querySelectorAll('.content-section');
    const triggerButtons = document.querySelectorAll('.nav-trigger, .back-button');
    const serviceCards = document.querySelectorAll('.service-card');
    const carousel = document.getElementById('carouselContainer');
    const clickableItems = document.querySelectorAll('.clickable-item');
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleTriggers = document.querySelectorAll('.clickable-schedule');

    // Обработчики для категорий цен
    const categoryBtns = document.querySelectorAll('.price-category-btn');
    const priceTables = document.querySelectorAll('.price-table');
    
    if (categoryBtns.length) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                priceTables.forEach(table => table.classList.remove('active-table'));
                const activeTable = document.getElementById(category);
                if (activeTable) activeTable.classList.add('active-table');
            });
        });
    }

    
    
    // Функция показа секции с улучшенной анимацией
    function showSection(sectionId) {
        // Добавляем класс fade-out для текущей секции
        const currentActive = document.querySelector('.content-section.active-section');
        if (currentActive) {
            currentActive.style.animation = 'none';
            currentActive.offsetHeight; //トリガー再描画
            currentActive.classList.remove('active-section');
        }
        
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active-section');
            // Перезапускаем анимацию
            activeSection.style.animation = 'none';
            activeSection.offsetHeight;
            activeSection.style.animation = 'sectionFadeInUp 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards';
        }
        
        // Обновляем активный класс для обычных ссылок
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Проверяем, если sectionId соответствует одному из пунктов dropdown
        if (sectionId === 'info' || sectionId === 'trainers' || sectionId === 'info') {
            const dropbtn = document.querySelector('.dropbtn');
            if (dropbtn) dropbtn.classList.add('active');
        } else {
            const mainLink = document.querySelector(`.nav a[data-nav="${sectionId}"]`);
            if (mainLink) mainLink.classList.add('active');
        }
        
        // Управление видимостью карусели
        if (sectionId === 'kids-detail' || sectionId === 'adults-detail' || sectionId === 'personal-detail' || 
            sectionId === 'sport-detail' || sectionId === 'pool-detail' || sectionId === 'fitness-detail' || 
            sectionId === 'dance-detail' || sectionId === 'martial-detail' || sectionId === 'adults-fitness-detail' ||
            sectionId === 'adults-pool-detail' || sectionId === 'adults-martial-detail' || sectionId === 'adults-dance-detail' ||
            sectionId === 'prices' || sectionId === 'club-news' || sectionId === 'trainers' || sectionId === 'info' ||
            sectionId === 'club-cards' || sectionId === 'contact' ||
            sectionId === 'news1' || sectionId === 'news2' || sectionId === 'news3' || 
            sectionId === 'news4' || sectionId === 'news5' || sectionId === 'news6' || 
            sectionId === 'news7' || sectionId === 'news8' || sectionId === 'news9' ||
            sectionId === 'instagram-page' || sectionId === 'telegram-page' || sectionId === 'vk-page') {

            if (carousel) {
                carousel.classList.add('hidden');
            }
        } else {
            if (carousel) {
                carousel.classList.remove('hidden');
            }
        }
        
        if (activeSection) {
            activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Timeline анимация при скролле
    const fadeElements = document.querySelectorAll('.service-card, .news-card, .trainer-card, .club-card, .contact-card');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => {
    el.classList.add('fade-on-scroll');
    observer.observe(el);
    });

    // Функция показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'detail-notification';
        notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = 'rgba(0, 170, 255, 0.9)';
        notification.style.backdropFilter = 'blur(8px)';
        notification.style.padding = '12px 24px';
        notification.style.borderRadius = '40px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.fontSize = '0.9rem';
        notification.style.border = '1px solid cyan';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

// Скрыть прелоадер после загрузки
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 1500); // 1.5 секунды, чтобы увидеть анимацию
    }
});

    // Обработчики для обычных ссылок навигации
    document.querySelectorAll('.nav a[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-nav');
            if (targetId && document.getElementById(targetId)) {
                showSection(targetId);
            }
        });
    });

    // Обработчики для пунктов выпадающего меню
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetId = link.getAttribute('data-subnav');
            if (targetId && document.getElementById(targetId)) {
                showSection(targetId);
            }
        });
    });

    // Клик по карточкам услуг на главной странице
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.getAttribute('data-service');
            if (service === 'kids') {
                showSection('kids-detail');
            } else if (service === 'adults') {
                showSection('adults-detail');
            } else if (service === 'personal') {
                showSection('personal-detail');
            }
        });
    });

    // Клик по кликабельным пунктам в детальных страницах
    clickableItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const linkType = item.getAttribute('data-link');
            
            // Детские разделы
            if (linkType === 'football') {
                showSection('sport-detail');
            } else if (linkType === 'pool') {
                showSection('pool-detail');
            } else if (linkType === 'fitness') {
                showSection('fitness-detail');
            } else if (linkType === 'dance') {
                showSection('dance-detail');
            } else if (linkType === 'martial') {
                showSection('martial-detail');
            }
            // Взрослые разделы
            else if (linkType === 'adults-fitness') {
                showSection('adults-fitness-detail');
            } else if (linkType === 'adults-pool') {
                showSection('adults-pool-detail');
            } else if (linkType === 'adults-martial') {
                showSection('adults-martial-detail');
            } else if (linkType === 'adults-dance') {
                showSection('adults-dance-detail');
            } else if (linkType === 'individual' || linkType === 'program' || linkType === 'schedule' || linkType === 'trainers' || linkType === 'result') {
                showNotification('Страница "Персональные тренировки" в разработке');
            } else {
                showNotification(`Страница "${item.textContent.trim()}" в разработке`);
            }
        });
    });

    // Клик по элементам "Расписание" на страницах
    scheduleTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            showSection('schedule');
            showNotification(`Расписание занятий`);
        });
    });

    // Переключение вкладок расписания
    if (scheduleTabs.length) {
        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                scheduleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                showNotification(`Показаны ${tab.textContent} занятия`);
            });
        });
    }

    // Обработчики для кнопок "На главную" и "Назад"
    triggerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetNav = btn.getAttribute('data-nav');
            if (targetNav && document.getElementById(targetNav)) {
                showSection(targetNav);
            }
        });
    });

    // Показываем home по умолчанию
    if (!document.querySelector('.content-section.active-section')) {
        showSection('home');
    }

    // ========== ГЛАВНАЯ КАРУСЕЛЬ ==========
    const carouselSlide = document.getElementById('carouselSlide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    
    function updateCarousel() {
        if (!carouselSlide) return;
        const slideWidth = carouselSlide.clientWidth;
        carouselSlide.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);
    }
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel();
        }, 100);
    });
    
    setTimeout(() => {
        updateCarousel();
    }, 100);

    // ========== ФОРМА ОБРАТНОЙ СВЯЗИ ==========
    const submitBtnForm = document.getElementById('submitContactBtn');
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const msgInput = document.getElementById('msgInput');
    const feedbackDiv = document.getElementById('formFeedback');

    if (submitBtnForm) {
        submitBtnForm.addEventListener('click', (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();

            if (!name || !phone) {
                feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Пожалуйста, укажите имя и телефон!';
                feedbackDiv.style.color = '#ffaa88';
                setTimeout(() => {
                    feedbackDiv.innerHTML = '';
                }, 3000);
                return;
            }

            feedbackDiv.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка заявки...';
            setTimeout(() => {
                feedbackDiv.innerHTML = '<i class="fas fa-check-circle"></i> Спасибо! Мы свяжемся с вами.';
                feedbackDiv.style.color = '#7effb9';
                nameInput.value = '';
                phoneInput.value = '';
                msgInput.value = '';
                setTimeout(() => {
                    feedbackDiv.innerHTML = '';
                }, 4000);
            }, 1200);
        });
    }

    // ========== МОДАЛЬНОЕ ОКНО С КАРУСЕЛЬЮ ДЛЯ КАРТОЧЕК ==========
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');
    const facilityCards = document.querySelectorAll('.facility-card');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryDots = document.getElementById('galleryDots');

    // Данные для карусели (картинки для тренажерного зала)
    const gymImages = [
        { src: 'image/gym.jpg', desc: 'Современные тренажеры' },
        { src: 'image/gym2.jpg', desc: 'Зона свободных весов' },
        { src: 'image/gym3.jpg', desc: 'Просторный зал' },
        { src: 'image/gym4.jpg', desc: 'Кардио зона' }
    ];

    // Данные для карусели (картинки для бассейна 25 метров)
    const poolImages = [
        { src: 'image/pool.jpg', desc: 'Современный 25-метровый бассейн' },
        { src: 'image/pool2.jpg', desc: '5 плавательных дорожек' },
        { src: 'image/pool3.jpg', desc: 'Многоступенчатая система очистки воды' },
    ];

    // Данные для карусели (картинки для детского бассейна)
    const kidsPoolImages = [
        { src: 'image/kids_pool.jpg', desc: 'Теплый детский бассейн' },
        { src: 'image/kids_pool2.jpg', desc: 'Занятия с родителями' },
        { src: 'image/kids_pool3.jpg', desc: 'Игровая форма обучения' },
    ];

    // Данные для карусели (картинки для студии сайкла)
    const cycleImages = [
        { src: 'image/cycle_studio.jpg', desc: 'Современные велотренажеры' },
        { src: 'image/cycle_studio2.jpg', desc: 'Энергичные тренировки' },
        { src: 'image/cycle_studio3.jpg', desc: 'Групповые занятия' },
    ];

    // Данные для карусели (картинки для спортивных залов)
    const sportsHallImages = [
        { src: 'image/sports_hall.jpg', desc: 'Просторные залы' },
        { src: 'image/sports_hall2.jpg', desc: 'Баскетбольная площадка' },
    ];

    // Данные для карусели (картинки для залов единоборств)
    const martialHallImages = [
        { src: 'image/martial_hall.jpg', desc: 'Зал для единоборств' },
        { src: 'image/martial_hall2.jpg', desc: 'Татами покрытие' },
        { src: 'image/martial_hall3.jpg', desc: 'Груши и мешки' },
    ];

    // Данные для карусели (картинки для площадки Workout)
    const workoutImages = [
        { src: 'image/workout_zone.jpg', desc: 'Уличная воркаут-площадка' },
        { src: 'image/workout_zone2.jpg', desc: 'Турники и брусья' },
        { src: 'image/workout_zone3.jpg', desc: 'Тренировки на свежем воздухе' },
        { src: 'image/workout_zone4.jpg', desc: 'Зона для кроссфита' }
    ];

    // Данные для карусели (картинки для SPA зоны)
    const spaImages = [
        { src: 'image/spa_zone.jpg', desc: 'Расслабляющая SPA зона' },
        { src: 'image/spa_zone2.jpg', desc: 'Финская сауна' },
        { src: 'image/spa_zone3.jpg', desc: 'Хамам' },
        { src: 'image/spa_zone4.jpg', desc: 'Массажный кабинет' }
    ];

    let currentImageIndex = 0;
    let currentImages = [];
    let autoSlideInterval = null;
    let isModalOpen = false;
    let mainDescriptionText = '';

    function openModal(imgSrc, imgTitle, imgDesc, isGym = false, isPool = false, isKidsPool = false, isCycle = false, isSportsHall = false, isMartialHall = false, isWorkout = false, isSpa = false) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        mainDescriptionText = imgDesc;
        
        if (isGym) {
            currentImages = gymImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isPool) {
            currentImages = poolImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isKidsPool) {
            currentImages = kidsPoolImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isCycle) {
            currentImages = cycleImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isSportsHall) {
            currentImages = sportsHallImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isMartialHall) {
            currentImages = martialHallImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isWorkout) {
            currentImages = workoutImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else if (isSpa) {
            currentImages = spaImages;
            currentImageIndex = 0;
            updateModalGallery(false);
            startModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'flex';
            if (galleryNext) galleryNext.style.display = 'flex';
            if (galleryDots) galleryDots.style.display = 'flex';
        } else {
            modalImg.src = imgSrc;
            currentImages = [];
            stopModalAutoSlide();
            if (galleryPrev) galleryPrev.style.display = 'none';
            if (galleryNext) galleryNext.style.display = 'none';
            if (galleryDots) galleryDots.style.display = 'none';
        }
        
        modalCaption.textContent = imgTitle;
        modalDescription.innerHTML = `<p>${mainDescriptionText}</p>`;
        
        isModalOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function updateModalGallery(updateDesc = true) {
        if (currentImages.length > 0) {
            modalImg.classList.add('fade-out');
            
            setTimeout(() => {
                modalImg.src = currentImages[currentImageIndex].src;
                modalImg.classList.remove('fade-out');
                modalImg.classList.add('fade-in');
                
                if (updateDesc && document.getElementById('imageSubcaption')) {
                    document.getElementById('imageSubcaption').textContent = currentImages[currentImageIndex].desc;
                }
                
                setTimeout(() => {
                    modalImg.classList.remove('fade-in');
                }, 400);
            }, 400);
        }
        updateModalDots();
    }

    function updateModalDots() {
        if (!galleryDots) return;
        galleryDots.innerHTML = '';
        currentImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === currentImageIndex ? ' active' : '');
            dot.addEventListener('click', () => {
                currentImageIndex = index;
                updateModalGallery(true);
                resetModalAutoSlide();
            });
            galleryDots.appendChild(dot);
        });
    }

    function nextModalImage() {
        if (currentImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        updateModalGallery(true);
    }

    function prevModalImage() {
        if (currentImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        updateModalGallery(true);
    }

    function startModalAutoSlide() {
        stopModalAutoSlide();
        autoSlideInterval = setInterval(() => {
            nextModalImage();
        }, 4000);
    }

    function stopModalAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function resetModalAutoSlide() {
        stopModalAutoSlide();
        startModalAutoSlide();
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            stopModalAutoSlide();
            modalImg.src = '';
            modalCaption.textContent = '';
            modalDescription.textContent = '';
            mainDescriptionText = '';
            isModalOpen = false;
            document.body.style.overflow = 'auto';
        }, 300);
    }

    facilityCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = card.getAttribute('data-img');
            const imgTitle = card.getAttribute('data-title');
            const imgDesc = card.getAttribute('data-desc');
            
            const isGym = (imgTitle === 'Тренажерный зал');
            const isPool = (imgTitle === 'Бассейн 25 метров');
            const isKidsPool = (imgTitle === 'Детский бассейн');
            const isCycle = (imgTitle === 'Студия сайкла');
            const isSportsHall = (imgTitle === 'Спортивные залы');
            const isMartialHall = (imgTitle === 'Залы единоборств');
            const isWorkout = (imgTitle === 'Площадка Workout');
            const isSpa = (imgTitle === 'SPA зона');
            
            if (imgSrc) {
                openModal(imgSrc, imgTitle, imgDesc, isGym, isPool, isKidsPool, isCycle, isSportsHall, isMartialHall, isWorkout, isSpa);
            }
        });
    });

    if (galleryPrev) {
        galleryPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevModalImage();
            resetModalAutoSlide();
        });
    }
    
    if (galleryNext) {
        galleryNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextModalImage();
            resetModalAutoSlide();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
        if (e.key === 'ArrowLeft' && isModalOpen && currentImages.length > 0) {
            prevModalImage();
            resetModalAutoSlide();
        }
        if (e.key === 'ArrowRight' && isModalOpen && currentImages.length > 0) {
            nextModalImage();
            resetModalAutoSlide();
        }
    });

    // ========== ГАЛЕРЕЯ С РАСКРЫВАЮЩИМИСЯ КАТЕГОРИЯМИ ==========
    const clubModal = document.getElementById('clubGalleryModal');
    const clubModalCloseBtn = document.querySelector('.club-gallery-close');
    const openGalleryBtn = document.getElementById('openGalleryBtn');
    
    if (openGalleryBtn && clubModal) {
        // Данные изображений по категориям
        const galleryData = {
            club: [
                { src: 'image/gym_neptun.jpg' },
                { src: 'image/gym_neptun2.jpg' },
                { src: 'image/gym_neptun3.jpg' },
                { src: 'image/gym_neptun4.jpg' },
                { src: 'image/gym_neptun5.jpg' },
                { src: 'image/gym_neptun6.jpg' },
                { src: 'image/gym_neptun7.jpg' },
                { src: 'image/gym_neptun8.jpg' }
            ],
            gym: [
                { src: 'image/gym.jpg' },
                { src: 'image/gym2.jpg' },
                { src: 'image/gym3.jpg' },
                { src: 'image/gym4.jpg' },
                { src: 'image/neptun_gym_inside.jpg' },
                { src: 'image/gym5.jpg' },
                { src: 'image/gym6.jpg' },
                { src: 'image/gym7.jpg' },
                { src: 'image/gym8.jpg' },
                { src: 'image/gym9.jpg' },
                { src: 'image/gym10.jpg' },
                { src: 'image/gym11.jpg' }
            ],
            pools: [
                { src: 'image/neptun_pul.jpg' },
                { src: 'image/kids_pool.jpg'},
                { src: 'image/pool2.jpg'},
                { src: 'image/kids_pool2.jpg'}
            ],
            cycle: [
                { src: 'image/cycle_studio.jpg'},
                { src: 'image/cycle_studio2.jpg'},
                { src: 'image/cycle_studio3.jpg'},
                { src: 'image/cycle_studio4.jpg'}
            ],
            group: [
                { src: 'image/sports_hall.jpg'},
                { src: 'image/sports_hall2.jpg'},
                { src: 'image/martial_hall.jpg'},
                { src: 'image/martial_hall2.jpg'},
                { src: 'image/martial_hall3.jpg'},
                { src: 'image/martial_hall4.jpg'},
                { src: 'image/martial_hall5.jpg'},
                { src: 'image/martial_hall6.jpg'},
                { src: 'image/workout_zone.jpg'},
                { src: 'image/workout_zone2.jpg'},
                { src: 'image/workout_zone3.jpg'},
                { src: 'image/workout_zone4.jpg'}
            ]
        };

        // Функция для отображения изображений в контейнере
        function renderImages(containerId, images) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            images.forEach(img => {
                const card = document.createElement('div');
                card.className = 'category-image-card';
                card.innerHTML = `<img src="${img.src}" alt="${img.title}">`;
                // Убираем .image-title
                card.addEventListener('click', () => {
                    openImageModal(img.src, img.title);
                });
                container.appendChild(card);
            });
        }

        // Рендерим все категории
        renderImages('clubImages', galleryData.club);
        renderImages('gymImages', galleryData.gym);
        renderImages('poolsImages', galleryData.pools);
        renderImages('cycleImages', galleryData.cycle);
        renderImages('groupImages', galleryData.group);

        // Функция для открытия увеличенного изображения
        function openImageModal(imgSrc, imgTitle) {
            const tempModal = document.createElement('div');
            tempModal.className = 'temp-image-modal';
            tempModal.innerHTML = `
                <div class="temp-modal-content">
                    <span class="temp-modal-close">&times;</span>
                    <img src="${imgSrc}" alt="${imgTitle}">
                </div>
            `;
            document.body.appendChild(tempModal);
            document.body.style.overflow = 'hidden';
            
            tempModal.style.display = 'flex';
            setTimeout(() => {
                tempModal.classList.add('show');
            }, 10);
            
            const closeBtn = tempModal.querySelector('.temp-modal-close');
            closeBtn.addEventListener('click', () => {
                tempModal.classList.remove('show');
                setTimeout(() => {
                    tempModal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            tempModal.addEventListener('click', (e) => {
                if (e.target === tempModal) {
                    tempModal.classList.remove('show');
                    setTimeout(() => {
                        tempModal.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        }

        // Аккордеон: открытие/закрытие категорий
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const btn = item.querySelector('.accordion-btn');
            btn.addEventListener('click', () => {
                // Закрываем все другие категории
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Переключаем текущую
                item.classList.toggle('active');
            });
        });

        function openClubModal() {
            clubModal.style.display = 'block';
            setTimeout(() => {
                clubModal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeClubModal() {
            clubModal.classList.remove('show');
            setTimeout(() => {
                clubModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 400);
        }

        openGalleryBtn.addEventListener('click', openClubModal);
        if (clubModalCloseBtn) clubModalCloseBtn.addEventListener('click', closeClubModal);

        clubModal.addEventListener('click', (e) => {
            if (e.target === clubModal) {
                closeClubModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && clubModal.style.display === 'block') {
                closeClubModal();
            }
        });
    }

        // ========== АККОРДЕОН ДЛЯ ТРЕНЕРОВ ==========
    const trainerCategories = document.querySelectorAll('.trainer-category');
    
    trainerCategories.forEach(category => {
        const btn = category.querySelector('.trainer-category-btn');
        btn.addEventListener('click', () => {
            // Закрываем все другие категории
            trainerCategories.forEach(otherCategory => {
                if (otherCategory !== category && otherCategory.classList.contains('active')) {
                    otherCategory.classList.remove('active');
                }
            });
            // Переключаем текущую
            category.classList.toggle('active');
        });
    });

    // ========== НОВОСТИ - ПЕРЕХОД НА СТРАНИЦУ НОВОСТИ ==========
    const newsReadMoreBtns = document.querySelectorAll('.news-read-more');
    
    if (newsReadMoreBtns.length > 0) {
        newsReadMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const newsId = btn.getAttribute('data-news-id');
                if (newsId) {
                    showSection(`news${newsId}`);
                }
            });
        });
    }

        // ========== ПЕРЕКЛЮЧЕНИЕ ПЕРИОДОВ КЛУБНЫХ КАРТ ==========
    const periodBtns = document.querySelectorAll('.period-btn');
    
    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.club-card-item');
            const periodBtnsParent = parent.querySelectorAll('.period-btn');
            const priceSpan = parent.querySelector('.club-card-price');
            const newPrice = btn.getAttribute('data-price');
            
            periodBtnsParent.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (priceSpan && newPrice) {
                priceSpan.textContent = parseInt(newPrice).toLocaleString() + ' ₽';
            }
        });
    });

    // ========== ОБРАБОТЧИКИ ДЛЯ ИКОНОК СОЦСЕТЕЙ ==========
    const socialIcons = document.querySelectorAll('.social-icons i, .footer-social a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = icon.getAttribute('data-nav');
            if (targetId && document.getElementById(targetId)) {
                showSection(targetId);
            }
        });
    });

    // Функция показа секции
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active-section');
            activeSection.style.animation = 'none';
            activeSection.offsetHeight;
            activeSection.style.animation = 'sectionFadeInUp 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards';
        }
        
        // Обновляем активный класс для обычных ссылок
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Проверяем, если sectionId соответствует одному из пунктов dropdown
        if (sectionId === 'info' || sectionId === 'trainers' || sectionId === 'club-news') {
            const dropbtn = document.querySelector('.dropbtn');
            if (dropbtn) dropbtn.classList.add('active');
        } else {
            const mainLink = document.querySelector(`.nav a[data-nav="${sectionId}"]`);
            if (mainLink) mainLink.classList.add('active');
        }
        
        // ========== УПРАВЛЕНИЕ ВИДИМОСТЬЮ ФУТЕРА ==========
        const footer = document.querySelector('.footer');
        // Скрываем footer на страницах соцсетей
        if (sectionId === 'instagram-page' || sectionId === 'telegram-page' || sectionId === 'vk-page') {
            if (footer) {
                footer.style.display = 'none';
            }
        } else {
            if (footer) {
                footer.style.display = 'block';
            }
        }
        
        // Управление видимостью карусели
        const hiddenSections = [
            'kids-detail', 'adults-detail', 'personal-detail', 'sport-detail', 'pool-detail',
            'fitness-detail', 'dance-detail', 'martial-detail', 'adults-fitness-detail',
            'adults-pool-detail', 'adults-martial-detail', 'adults-dance-detail',
            'prices', 'club-news', 'trainers', 'info', 'club-cards',
            'news1', 'news2', 'news3', 'news4', 'news5', 'news6', 'news7', 'news8', 'news9',
            'instagram-page', 'telegram-page', 'vk-page', 'contact'
        ];
        
        if (hiddenSections.includes(sectionId)) {
            if (carousel) carousel.classList.add('hidden');
        } else {
            if (carousel) carousel.classList.remove('hidden');
        }
        
        if (activeSection) {
            activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ========== КРАСИВЫЙ ДИНАМИЧЕСКИЙ ФОН ==========
    function createBackgroundEffects() {

        // Создаём центральное свечение
        const glowCenter = document.createElement('div');
        glowCenter.className = 'glow-center';
        document.body.appendChild(glowCenter);
        
        // Создаём слой глубины
        const depthLayer = document.createElement('div');
        depthLayer.className = 'depth-layer';
        document.body.appendChild(depthLayer);
        
        // Создаём пузырьки (40 штук)
        for (let i = 0; i < 45; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 70 + 15;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = Math.random() * 15 + 12 + 's';
            bubble.style.animationDelay = Math.random() * 10 + 's';
            document.body.appendChild(bubble);
        }
        
        // Создаём светящиеся точки (50 штук)
        for (let i = 0; i < 60; i++) {
            const light = document.createElement('div');
            light.className = 'light';
            light.style.left = Math.random() * 100 + '%';
            light.style.top = Math.random() * 100 + '%';
            light.style.animationDelay = Math.random() * 3 + 's';
            light.style.animationDuration = Math.random() * 2 + 1.5 + 's';
            document.body.appendChild(light);
        }
        
        // Создаём парящие частицы (120 штук)
        for (let i = 0; i < 150; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 25 + 15 + 's';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            document.body.appendChild(particle);
        }
        
        // Создаём облака (25 штук, они будут проплывать всю страницу)
        const cloudSizes = ['small', 'medium', 'large'];
        for (let i = 0; i < 30; i++) {
            const cloud = document.createElement('div');
            const sizeType = cloudSizes[Math.floor(Math.random() * cloudSizes.length)];
            cloud.className = 'cloud ' + sizeType;
            
            // Разные размеры облаков
            let width, height;
            if (sizeType === 'small') {
                width = Math.random() * 80 + 50;
                height = Math.random() * 40 + 30;
            } else if (sizeType === 'medium') {
                width = Math.random() * 120 + 80;
                height = Math.random() * 60 + 45;
            } else {
                width = Math.random() * 180 + 120;
                height = Math.random() * 80 + 60;
            }
            
            cloud.style.width = width + 'px';
            cloud.style.height = height + 'px';
            cloud.style.top = Math.random() * 70 + 10 + '%';
            cloud.style.animationDuration = Math.random() * 30 + 20 + 's';
            cloud.style.animationDelay = Math.random() * 15 + 's';
            document.body.appendChild(cloud);
        }
        
        // Создаём звёзды (250 штук)
        for (let i = 0; i < 300; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 4 + 's';
            star.style.animationDuration = Math.random() * 2.5 + 1.5 + 's';
            document.body.appendChild(star);
        }
    }
    
    // Запускаем создание фоновых эффектов
    createBackgroundEffects();

        // ========== МОДАЛЬНОЕ ОКНО ДЛЯ ЗАЯВКИ ==========
    const requestModal = document.getElementById('requestModal');
    const requestBtn = document.getElementById('requestBtnNav');
    const requestModalClose = document.querySelector('.request-modal-close');
    const submitRequestBtn = document.getElementById('submitRequestBtn');
    const lastNameInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const phoneRequestInput = document.getElementById('phoneRequest');
    const emailRequestInput = document.getElementById('emailRequest');
    const requestFeedback = document.getElementById('requestFeedback');

    // Открытие модального окна
    if (requestBtn) {
        requestBtn.addEventListener('click', (e) => {
            e.preventDefault();
            requestModal.style.display = 'flex';
            setTimeout(() => {
                requestModal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    }

    // Закрытие модального окна
    function closeRequestModal() {
        requestModal.classList.remove('show');
        setTimeout(() => {
            requestModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Очищаем форму
            if (lastNameInput) lastNameInput.value = '';
            if (firstNameInput) firstNameInput.value = '';
            if (phoneRequestInput) phoneRequestInput.value = '';
            if (emailRequestInput) emailRequestInput.value = '';
            if (requestFeedback) requestFeedback.innerHTML = '';
        }, 300);
    }

    if (requestModalClose) {
        requestModalClose.addEventListener('click', closeRequestModal);
    }

    if (requestModal) {
        requestModal.addEventListener('click', (e) => {
            if (e.target === requestModal) {
                closeRequestModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && requestModal && requestModal.style.display === 'flex') {
            closeRequestModal();
        }
    });

    // Отправка заявки
    if (submitRequestBtn) {
        submitRequestBtn.addEventListener('click', () => {
            const lastName = lastNameInput ? lastNameInput.value.trim() : '';
            const firstName = firstNameInput ? firstNameInput.value.trim() : '';
            const phone = phoneRequestInput ? phoneRequestInput.value.trim() : '';
            const email = emailRequestInput ? emailRequestInput.value.trim() : '';

            if (!lastName || !firstName || !phone) {
                requestFeedback.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Пожалуйста, заполните все поля!';
                requestFeedback.style.color = '#ffaa88';
                setTimeout(() => {
                    if (requestFeedback) requestFeedback.innerHTML = '';
                }, 3000);
                return;
            }

            requestFeedback.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка заявки...';
            requestFeedback.style.color = '#0af';
            
            setTimeout(() => {
                requestFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Спасибо! Мы свяжемся с вами.';
                requestFeedback.style.color = '#7effb9';
                
                setTimeout(() => {
                    closeRequestModal();
                }, 2000);
            }, 1500);
        });
    }

    console.log('%c 🌊 NEPTUN | СПОРТИВНЫЙ КОМПЛЕКС | ВСЕ ФУНКЦИИ РАБОТАЮТ 🌊', 'color: #0af; font-size: 16px; font-weight: bold;');
});