document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.menu').onclick = function(){
        document.querySelector('.hide-menu').classList.toggle('hide');
    }
});
