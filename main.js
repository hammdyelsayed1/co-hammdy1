document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    let siteData = {};

    async function loadData() {
        const saved = localStorage.getItem('siteData');
        if (saved) {
            siteData = JSON.parse(saved);
        } else {
            try {
                const res = await fetch('data.json');
                siteData = await res.json();
            } catch (e) {
                console.error("Data load failed", e);
                return;
            }
        }
        renderData();
    }

    function renderData() {
        // Render Instructors
        const instructorsContainer = document.querySelector('.instractors-grid');
        if (instructorsContainer && siteData.instructors) {
            instructorsContainer.innerHTML = siteData.instructors.map((ins, i) => `
                <div class="instructor-card" data-aos="flip-right" data-aos-delay="${100 + (i * 100)}">
                    <img src="${ins.img}" alt="${ins.name}">
                </div>
            `).join('');
        }

        // Render Fields
        const fieldsContainer = document.querySelector('.fields-grid');
        if (fieldsContainer && siteData.fields) {
            fieldsContainer.innerHTML = siteData.fields.map((f, i) => `
                <div class="field-card" data-aos="fade-up" data-aos-delay="${150 + (i * 50)}">
                    <img src="${f.img}" alt="${f.title}">
                    <h3>${f.title}</h3>
                    <p>${f.desc}</p>
                </div>
            `).join('');
        }

        // Render FAQs
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer && siteData.faqs) {
            faqContainer.innerHTML = siteData.faqs.map((faq, i) => `
                <div class="faq-item" data-aos="fade-up" data-aos-delay="${100 + (i * 100)}">
                    <div class="faq-header">
                        <h4>${faq.q}</h4>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="faq-content">
                        <p>${faq.a}</p>
                    </div>
                </div>
            `).join('');
            
            // Re-attach FAQ logic after render
            attachFAQLogic();
        }
        
        // Re-initialize AOS for new elements
        AOS.refresh();
    }

    function attachFAQLogic() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const icon = faq.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-plus';
                });
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-minus';
                }
            });
        });
    }

    // Premium Form Feedback
    const inputs = document.querySelectorAll('.contact-form input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.transition = '0.3s';
        });
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
        });
    });

    loadData();
});












document.querySelectorAll(".faq-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const icon = header.querySelector("i");

    // اقفل الكل
    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) {
        faq.classList.remove("active");
        faq.querySelector("i").classList.replace("fa-minus", "fa-plus");
      }
    });

    // افتح / اقفل الحالي
    item.classList.toggle("active");
    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");
  });
});