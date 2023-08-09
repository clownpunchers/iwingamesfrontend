window.addEventListener('load', () => {
    const rightElements = document.getElementsByClassName('right');
    const leftElements = document.getElementsByClassName('left');
    const pageHeight = document.documentElement.scrollHeight + 'px';

    for (let i = 0; i < rightElements.length; i++) {
        rightElements[i].style.height = pageHeight;
    }

    for (let j = 0; j < leftElements.length; j++) {
        leftElements[j].style.height = pageHeight;
    }
});

window.addEventListener('resize', () => {
    const rightElements = document.getElementsByClassName('right');
    const leftElements = document.getElementsByClassName('left');
    const pageHeight = document.documentElement.scrollHeight + 'px';

    for (let i = 0; i < rightElements.length; i++) {
        rightElements[i].style.height = pageHeight;
    }

    for (let j = 0; j < leftElements.length; j++) {
        leftElements[j].style.height = pageHeight;
    }
});