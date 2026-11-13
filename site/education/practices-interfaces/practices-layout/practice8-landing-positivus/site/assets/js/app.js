'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && window.bootstrap) {
        mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', () => {
                const menu = window.bootstrap.Offcanvas.getInstance(mobileMenu);
                if (menu) menu.hide();
            });
        });
    }

    // Bootstrap accordion: reflect the expanded state in the surrounding card.
    const processAccordion = document.getElementById('processAccordion');
    if (processAccordion) {
        processAccordion.querySelectorAll('.accordion-collapse').forEach((panel) => {
            panel.addEventListener('shown.bs.collapse', () => {
                processAccordion.querySelectorAll('.process-item').forEach((item) => item.classList.remove('is-open'));
                panel.closest('.process-item')?.classList.add('is-open');
            });
            panel.addEventListener('hidden.bs.collapse', () => {
                panel.closest('.process-item')?.classList.remove('is-open');
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formToastElement = document.getElementById('formToast');
    const toastMessage = document.getElementById('toastMessage');

    if (contactForm) {
        const contactTypeRadios = contactForm.querySelectorAll('input[name="contactType"]');
        const fullName = document.getElementById('fullName');
        const nameContainer = fullName?.closest('.mb-3');
        contactTypeRadios.forEach((radio) => {
            radio.addEventListener('change', () => {
                const anonymous = radio.checked && radio.value === 'anonymous';
                if (nameContainer) nameContainer.hidden = anonymous;
                if (fullName) {
                    fullName.required = !anonymous;
                    fullName.disabled = anonymous;
                    fullName.value = anonymous ? '' : fullName.value;
                    fullName.classList.remove('is-invalid', 'is-valid');
                }
            });
        });

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            contactForm.classList.add('was-validated');
            if (!contactForm.checkValidity()) {
                if (formStatus) formStatus.textContent = 'Проверьте поля, отмеченные сообщениями об ошибке.';
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton?.innerHTML;
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Заявка подготовлена';
            }
            if (formStatus) formStatus.textContent = 'Демонстрационный режим: данные не отправляются на сервер.';
            if (toastMessage) toastMessage.textContent = 'Спасибо! Форма успешно проверена. Это учебный макет — отправка на сервер не настроена.';
            if (formToastElement && window.bootstrap) {
                window.bootstrap.Toast.getOrCreateInstance(formToastElement, {delay: 5000}).show();
            }
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            if (nameContainer) nameContainer.hidden = false;
            if (fullName) {
                fullName.disabled = false;
                fullName.required = true;
            }
            window.setTimeout(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText || 'Отправить заявку';
                }
            }, 1200);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterStatus = document.getElementById('newsletterStatus');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            if (!newsletterForm.checkValidity()) {
                newsletterForm.classList.add('was-validated');
                emailInput?.focus();
                return;
            }
            if (newsletterStatus) newsletterStatus.textContent = 'Спасибо! В демо-версии подписка не сохраняется.';
            newsletterForm.reset();
        });
    }
});
