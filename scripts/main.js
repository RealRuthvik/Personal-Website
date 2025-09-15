document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('blog.html')) {
        loadBlogPosts();
        setupSearch(); 
    } else if (path.endsWith('blog_template.html')) { // CORRECTED
        loadSinglePost();
    }

    setupThemeSwitcher(); 
});

async function loadBlogPosts() {
    const grid = document.getElementById('blog-grid');
    try {
        const response = await fetch('blogs.json');
        const posts = await response.json();

        grid.innerHTML = ''; 

        if (posts.length === 0) {
            grid.innerHTML = '<p>I\'ll remember to Write awesome blogs.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = `blog_template.html?slug=${post.slug}`; // CORRECTED
            postElement.className = 'grid-item';

            postElement.innerHTML = `
                <div class="grid-item-content">
                    <h5>${post.title}</h5>
                    <p class="grid-item-meta">${post.date}</p>
                    <p>${post.summary}</p>
                </div>
            `;
            grid.appendChild(postElement);
        });

    } catch (error) {
        grid.innerHTML = '<p>I\'ll remember to Write awesome blogs.</p>';
        console.error('Error fetching blog posts:', error);
    }
}

function setupSearch() {
    const searchForm = document.querySelector('.search-widget');
    if (!searchForm) return;

    const searchInput = searchForm.querySelector('input[type="search"]');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const keyword = searchInput.value.trim().toLowerCase();
        const blogItems = document.querySelectorAll('#blog-grid .grid-item');

        blogItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(keyword)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

async function loadSinglePost() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        window.location.href = 'blog.html';
        return;
    }

    try {
        const metaResponse = await fetch('blogs.json');
        const posts = await metaResponse.json();
        const postMeta = posts.find(p => p.slug === slug);

        if (!postMeta) throw new Error('Post not found');

        const contentResponse = await fetch(`blogs/${slug}.md`);
        const markdown = await contentResponse.text();
        const contentHtml = marked.parse(markdown); 

        document.title = `${postMeta.title} - Blog`;
        document.getElementById('post-header-title').textContent = postMeta.title;
        document.getElementById('post-header-summary').textContent = postMeta.summary;
        document.getElementById('post-body-title').textContent = postMeta.title;
        document.getElementById('post-meta').textContent = `Published on ${postMeta.date}`;
        document.getElementById('post-content').innerHTML = contentHtml;
        
        document.getElementById('author-info').innerHTML = `
             <p>Ruthvik Reddy Gade</p>
             <p><i class="fa-solid fa-calendar-days"></i> ${postMeta.date}</p>
             <p><i class="fa-brands fa-github"></i> <a href="https://github.com/RealRuthvik" target="_blank">GitHub</a></p>
        `;

    } catch (error) {
        document.getElementById('post-content').innerHTML = '<p>Error loading post. It might not exist.</p>';
        console.error('Error loading single post:', error);
    }
}

function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-button');
    if (themeButtons.length === 0) return;
    
    const body = document.body;
    const themeClasses = ['theme-green', 'theme-blue', 'theme-amber', 'theme-red', 'theme-black'];
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-black';
    
    body.classList.remove(...themeClasses);
    body.classList.add(savedTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            body.classList.remove(...themeClasses); // IMPROVED
            body.classList.add(theme);
            localStorage.setItem('selectedTheme', theme);
        });
    });
}