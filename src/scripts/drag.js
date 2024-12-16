function makeDraggable(element, handle = element) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    handle.addEventListener("mousedown", (event) => {
        // Prevent text selection
        event.preventDefault();

        // Capture initial cursor position relative to the element
        offsetX = event.clientX - element.offsetLeft;
        offsetY = event.clientY - element.offsetTop;
        isDragging = true;
    });

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        // Calculate the new position
        const newLeft = event.clientX - offsetX;
        const newTop = event.clientY - offsetY;

        // Restrict within viewport bounds
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Get the navbar height
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        // Ensure the element doesn't go out of bounds
        const clampedLeft = Math.max(0, Math.min(newLeft, viewportWidth - elementWidth));
        const clampedTop = Math.max(navbarHeight, Math.min(newTop, viewportHeight - elementHeight));

        // Apply the clamped positions
        element.style.left = `${clampedLeft}px`;
        element.style.top = `${clampedTop}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false; // Stop dragging
    });
}

export { makeDraggable }
