document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu');
    const hideMenu = document.querySelector('.hide-menu');
    if (menuBtn && hideMenu) {
        menuBtn.addEventListener('click', () => {
            hideMenu.classList.toggle('hide');
        });
    }

    const dropBtns = document.querySelectorAll('.dropbtn');
    dropBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = btn.closest('.dropdown');
            if (!parent) return;
            document.querySelectorAll('.dropdown.open').forEach(d => {
                if (d !== parent) d.classList.remove('open');
            });
            parent.classList.toggle('open');
        });
    });

    document.addEventListener('click', (e) => {
        const isInsideDropdown = e.target.closest('.dropdown');
        const isMenuBtn = e.target.closest('.menu');
        if (!isInsideDropdown && !isMenuBtn) {
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }
    });

    const images = document.querySelectorAll(".gallery-img");

    if (images.length) {
        fetch('../js/recipes.json')
            .then(res => res.json())
            .then(data => {
                const images = document.querySelectorAll(".gallery-img");
                const caption = document.querySelector(".caption");

                let index = 0;
                let isTransitioning = false;

                function showImage(i) {
                    if (isTransitioning) return;
                    isTransitioning = true;

                    const current = document.querySelector(".gallery-img.active") || images[0];
                    const nextImg = images[i];
                    current.classList.remove("active");
                    nextImg.classList.add("active");

                    const recipe = data.find(r => nextImg.src.includes(r.image));
                    if (caption && recipe) {
                        caption.innerHTML = `<strong>${recipe.title}</strong><br>
        <b>Potrebujeme:</b><ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <b>Postup:</b> ${recipe.instructions}`;
                    }

                    setTimeout(() => {
                        isTransitioning = false;
                    }, 1000);
                }

                document.querySelector(".prev")?.addEventListener("click", () => {
                    index = (index - 1 + images.length) % images.length;
                    showImage(index);
                });

                document.querySelector(".next")?.addEventListener("click", () => {
                    index = (index + 1) % images.length;
                    showImage(index);
                });

                showImage(index);
            });
    }
})
