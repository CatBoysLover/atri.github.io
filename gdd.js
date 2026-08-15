function toggleWin(id, show) {
    const win = document.getElementById(id);
    win.style.display = show ? 'block' : 'none';
    if (show) {
        document.getElementById('folder-win').style.zIndex = '100';
        document.getElementById('notepad-win').style.zIndex = '100';
        win.style.zIndex = '101';
    }
}

function toggleMenu() {
    const menu = document.getElementById('start-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    document.getElementById('clock').innerText = hours + ':' + minutes;
}
setInterval(updateClock, 1000);
updateClock();

// ЧИСТЫЙ ОКОННЫЙ ДВИЖОК БЕЗ СТРОКОВЫХ СДВИГОВ И БАГОВ КООРДИНАТ
let activeWin = null;
let startX = 0, startY = 0;
let initialX = 0, initialY = 0;

function dragStart(e) {
    if (e.target.tagName === 'BUTTON') return;

    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    activeWin = e.currentTarget.parentElement;
    
    document.getElementById('folder-win').style.zIndex = '100';
    document.getElementById('notepad-win').style.zIndex = '100';
    activeWin.style.zIndex = '101';
    
    startX = clientX;
    startY = clientY;
    initialX = activeWin.offsetLeft;
    initialY = activeWin.offsetTop;
    
    if (e.type === 'touchstart') {
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('touchend', dragEnd);
    } else {
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }
}

function dragMove(e) {
    if (!activeWin) return;
    if (e.type === 'touchmove') e.preventDefault();

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    activeWin.style.left = (initialX + dx) + 'px';
    activeWin.style.top = (initialY + dy) + 'px';
}

function dragEnd(e) {
    activeWin = null;
    if (e.type === 'touchend') {
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('touchend', dragEnd);
    } else {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
    }
}

// Первичное позиционирование под десктоп и мобилки
if (window.innerWidth < 700) {
    const fWin = document.getElementById('folder-win');
    const nWin = document.getElementById('notepad-win');
    fWin.style.width = '90vw'; fWin.style.left = '5vw'; fWin.style.top = '60px';
    nWin.style.width = '95vw'; nWin.style.left = '2.5vw'; nWin.style.top = '40px';
    document.querySelector('.notepad-textarea').style.height = '60vh';
} else {
    document.getElementById('notepad-win').style.left = (window.innerWidth / 2 - 290) + 'px';
    document.getElementById('notepad-win').style.top = '60px';
}
