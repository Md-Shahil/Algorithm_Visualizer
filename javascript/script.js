document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('barContainer');
    const bgContainer = document.getElementById('bgBarContainer');
    
    const barWidth = 28; 
    const numberOfBars = Math.floor(window.innerWidth / barWidth);
    const bars = []; 

    // 1. Create Background Bars (Blurred)
    for (let i = 0; i < numberOfBars / 1.5; i++) {
        const bgBar = document.createElement('div');
        bgBar.classList.add('bg-bar');
        const bgHeight = Math.floor(Math.random() * 70) + 30;
        bgBar.style.height = `${bgHeight}%`;
        bgContainer.appendChild(bgBar);
        animateBgBar(bgBar);
    }

    // 2. Create Main Interactive Bars
    for (let i = 0; i < numberOfBars; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        //control height
        const randomHeight = Math.floor(Math.random() * 63) + 15;
        
        bar.style.height = "0%";
        mainContainer.appendChild(bar);
        bars.push(bar);

        setTimeout(() => {
            bar.style.height = `${randomHeight}%`;
        }, i * 10);

    }

    // NEW: Global Mouse Tracking on the whole container
    mainContainer.addEventListener('mousemove', (e) => {
        const rect = mainContainer.getBoundingClientRect();
        // Calculate mouse X position relative to the container
        const x = e.clientX - rect.left;
        
        // Determine the index of the bar based on X position
        const index = Math.floor((x / rect.width) * numberOfBars);
        
        handleHover(index, bars);
    });

    mainContainer.addEventListener('mouseleave', () => {
        bars.forEach(b => {
            b.style.transform = 'translateY(0)';
            b.style.filter = 'brightness(1)';
        });
    });
});

function animateBgBar(el) {
    const baseHeight = parseFloat(el.style.height);
    setInterval(() => {
        const drift = (Math.random() - 0.5) * 5; 
        el.style.height = `${baseHeight + drift}%`;
    }, 3000 + Math.random() * 2000);
}

function handleHover(index, bars) {
    bars.forEach((bar, i) => {
        const distance = Math.abs(index - i);
        let move = 0;
        let bright = 1;

        if (distance === 0) { move = -55; bright = 1.8; }
        else if (distance === 1) { move = -35; bright = 1.5; }
        else if (distance === 2) { move = -20; bright = 1.3; }
        else if (distance === 3) { move = -10; bright = 1.1; }
        else if (distance === 4) { move = -5; bright = 1.05; }

        bar.style.transform = `translateY(${move}px)`;
        bar.style.filter = `brightness(${bright})`;
    });
}








