
const data = [
    {
        title: "Intricate",
        para: `<p>We obsess over the micro to master the macro. We build products with intricate precision, delivering unmatched functionality, performance and reliability. Our intricate approach ensures every detail is perfected.</p>

        <p>Through meticulous attention to detail, we create solutions that showcase the perfect balance of form and function. Every component is carefully crafted to deliver optimal performance, ensuring seamless integration and flawless execution.</p>

        <p>Our intricate design philosophy means no detail is too small, no challenge too complex. We embrace complexity to deliver simplicity, transforming intricate systems into elegant solutions that work harmoniously.</p>

        <p>In our pursuit of perfection, we analyze every component, every connection, and every interaction. Our dedication to intricate craftsmanship sets new standards in engineering excellence and technological innovation.</p>

        <p>From the smallest circuit to the largest system, our intricate approach ensures that every element is optimized for maximum efficiency and reliability. We believe that true innovation lies in the details.</p>

        <p>By mastering the intricate interplay between form and function, we create solutions that not only meet but exceed expectations. Our commitment to precision engineering drives us to explore new possibilities.</p>

        <p>The intricate nature of our work reflects our passion for excellence. We continuously push boundaries, seeking new ways to improve and innovate, always with an eye for the finest details.</p>`
    },
    {
        title: "Elaborate",
        para: `<p>We transform complexity into clarity through elaborate engineering. Each solution is a testament to our commitment to excellence and innovation, showcasing the depth of our technical expertise.</p>

        <p>Our elaborate processes ensure that every product we create is not just functional, but revolutionary. We push boundaries and challenge conventions to deliver extraordinary results that set new industry standards.</p>

        <p>Through elaborate planning and execution, we turn ambitious visions into reality, creating solutions that exceed expectations and inspire future innovations.</p>

        <p>Every project undergoes an elaborate development process, where we carefully consider each aspect and possibility. This comprehensive approach allows us to create solutions that are both robust and sophisticated.</p>

        <p>Our elaborate methodology combines cutting-edge technology with proven engineering principles. We create systems that are not only powerful but also elegant in their execution.</p>

        <p>The elaborate nature of our design process ensures that every solution we deliver is thoroughly tested and validated. We leave no stone unturned in our quest for excellence.</p>

        <p>By embracing elaborate engineering practices, we create products that stand the test of time. Our solutions are built to evolve and adapt to changing needs while maintaining their core excellence.</p>`
    },
    {
        title: "Sophisticated",
        para: `<p>Sophistication is at the heart of everything we do. We blend cutting-edge technology with elegant design to create solutions that are both powerful and refined, setting new standards in engineering excellence.</p>

        <p>Our sophisticated approach combines innovation with elegance, delivering solutions that are as beautiful as they are functional. We create experiences that inspire and delight, while pushing the boundaries of what's possible.</p>

        <p>Through sophisticated engineering, we elevate everyday experiences into extraordinary moments of innovation. Our commitment to excellence drives us to develop solutions that are both advanced and intuitive.</p>

        <p>Every sophisticated solution we create represents the perfect balance of form and function. We believe that true innovation lies in creating systems that are both complex in capability and elegant in execution.</p>

        <p>Our sophisticated design philosophy ensures that every product we deliver is not just a tool, but a masterpiece of engineering. We combine advanced technology with refined aesthetics to create truly exceptional solutions.</p>

        <p>The sophistication of our work reflects our deep understanding of both technology and user needs. We create solutions that are powerful yet accessible, complex yet intuitive.</p>

        <p>By maintaining the highest standards of sophisticated engineering, we continue to push the boundaries of what's possible. Our solutions represent the perfect harmony of innovation and elegance.</p>`
    }
];

const images = document.querySelectorAll(".images img");
const title = document.querySelector(".text h3");
const allParagraphs = document.querySelectorAll(".text p"); // Changed to select all paragraphs

let imageSources = Array.from(images).map(img => img.getAttribute("src"));
let currentIndexes = [0, 1, 2];

function updateCarousel(clickedImageSrc) {
    const clickedSourceIndex = imageSources.findIndex(src => src === clickedImageSrc);
    
    // Add transition class for smooth text fade
    title.style.transition = 'opacity 0.3s ease-in-out';
    allParagraphs.forEach(p => {
        p.style.transition = 'opacity 0.3s ease-in-out';
    });
    
    // Fade out current content
    title.style.opacity = 0;
    allParagraphs.forEach(p => {
        p.style.opacity = 0;
    });
    
    // Rearrange currentIndexes to put clicked image in center
    if (clickedSourceIndex === 0) {
        currentIndexes = [2, 0, 1];
    } else if (clickedSourceIndex === 1) {
        currentIndexes = [0, 1, 2];
    } else if (clickedSourceIndex === 2) {
        currentIndexes = [1, 2, 0];
    }

    // Apply transitions to images
    images.forEach((img, i) => {
        img.style.transition = 'opacity 0.3s ease-in-out';
        img.style.opacity = '0';
        
        setTimeout(() => {
            img.setAttribute("src", imageSources[currentIndexes[i]]);
            if (i === 1) {
                img.style.opacity = '1';
                img.parentElement.classList.add('highlight');
            } else {
                img.style.opacity = '0.7';
                img.parentElement.classList.remove('highlight');
            }
        }, 300);
    });

    // Update text content
    setTimeout(() => {
        const centerIndex = currentIndexes[1];
        
        // Update content using the center image's index
        title.innerHTML = data[centerIndex].title;
        const newContent = data[centerIndex].para;
        
        // Create a temporary container to parse the HTML content
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = newContent;
        
        // Get all paragraphs from the new content
        const newParagraphs = tempContainer.querySelectorAll('p');
        
        // Update each paragraph in the DOM
        const textContainer = document.querySelector('.text');
        textContainer.innerHTML = ''; // Clear existing content
        
        // Add title
        const titleElement = document.createElement('h3');
        titleElement.innerHTML = data[centerIndex].title;
        textContainer.appendChild(titleElement);
        
        // Add paragraphs
        newParagraphs.forEach((p) => {
            const newP = document.createElement('p');
            newP.innerHTML = p.innerHTML;
            textContainer.appendChild(newP);
        });
        
        // Add Read More link if there are more than 4 paragraphs
        if (newParagraphs.length > 4) {
            const readMoreLink = document.createElement('a');
            readMoreLink.className = 'read-more';
            readMoreLink.innerHTML = 'Read More';
            textContainer.appendChild(readMoreLink);
            
            // Initialize collapsed state
            textContainer.classList.add('collapsed');
            
            // Add click event for Read More
            readMoreLink.addEventListener('click', () => {
                textContainer.classList.toggle('collapsed');
                readMoreLink.innerHTML = textContainer.classList.contains('collapsed') ? 'Read More' : 'Read Less';
            });
        }
        
        // Fade in new content
        requestAnimationFrame(() => {
            titleElement.style.opacity = 1;
            textContainer.querySelectorAll('p').forEach(p => {
                p.style.opacity = 1;
            });
        });
    }, 600);
}

images.forEach((img) => {
    img.addEventListener('click', () => updateCarousel(img.getAttribute("src")));
});



