document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');
    const blogsContainer = document.getElementById('blogs');

    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            const data = await response.json();
            displayBlog(data);
            blogForm.reset();
        } else {
            alert('Failed to submit blog.');
        }
    });

    const fetchBlogs = async () => {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        data.forEach(displayBlog);
    };

    const displayBlog = (blog) => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
        `;
        blogsContainer.prepend(blogItem);
    };

    fetchBlogs();
});
