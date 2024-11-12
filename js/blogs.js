{
    // <article class="blog-post">
    //     <h2>Exploring Vietnam's Rich Literary Heritage</h2>
    //     <div class="blog-post-meta">
    //         <img src="/images/user.png" alt="Minh Nguyen">
    //         <span class="blog-post-author">Minh Nguyen</span>
    //     </div>
    //     <p class="blog-post-preview">Vietnam's literature is a treasure trove of poetic beauty and historical depth. From classic works like 'The Tale of Kieu' to contemporary novels that capture the essence of modern Vietnam...</p>
    //     <a href="#" class="read-more">Read More</a>
    // </article>
}

document.addEventListener('DOMContentLoaded', () => {
    insertHeader();
    insertFooter();
    insertHead();
});

const postsPerPage = 5;
let currentPage = 1;
let posts = [
    {
        title: 'The Art of Slow Reading in a Fast-Paced World',
        author: 'Sarah Johnson',
        description:
            'In our rapidly moving digital age, the practice of slow reading has become a radical act. This post explores the benefits of immersing yourself in a book, savoring each word, and how it can...',
    },
    {
        title: "Exploring Vietnam's Rich Literary Heritage",
        author: 'Minh Nguyen',
        description:
            "Vietnam's literature is a treasure trove of poetic beauty and historical depth. From classic works like 'The Tale of Kieu' to contemporary novels that capture the essence of modern Vietnam...",
    },
    {
        title: 'The Rise of Audiobooks: A New Chapter in Reading',
        author: 'Lily Pham',
        description:
            'Audiobooks have transformed the way we consume literature, offering a hands-free, immersive reading experience. This post delves into the growing popularity of audiobooks, their impact on...',
    },
    {
        title: 'Building a Home Library: Tips and Tricks',
        author: 'Alex Tran',
        description:
            'Creating a personal library is a dream for many book lovers. This guide walks you through the process of curating your collection, organizing your space, and creating a cozy reading nook that...',
    },
];




function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (!title || !content) {
        alert('Please fill out both title and content fields.');
        return;
    }

    const newPost = {
        title: title,
        author: 'VuzLe',
        description: content,
        // date: new Date().toLocaleDateString(),
    };
    posts.unshift(newPost);

    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';

    renderPosts();
}



const publicRoutes = ['/sign-in', '/sign-up'];
document.getElementById('createPost').addEventListener('click', async() => {
    const user = getKey('user');

    // Chuẩn hóa pathname để loại bỏ dấu '/' cuối cùng nếu có
    const currentPath = window.location.pathname.replace(/\/+$/, '');

    // Nếu người dùng chưa đăng nhập
    if (!user) {
        if (!publicRoutes.includes(currentPath)) {
            window.location.href = '/sign-in';
        }
        return; // Kết thúc nếu không có user
    }

    const userData = JSON.parse(user);

    const verifyUser = async () => {
        try {
            const response = await axiosInstance.post('/api/auth/verify', { user: userData });
            return response.data;
        } catch (error) {
            return null;
        }
    };

    // Xác thực người dùng
    const verifyResult = await verifyUser();

    // Nếu xác thực không thành công hoặc không có phản hồi hợp lệ, chuyển hướng đến trang đăng nhập
    if (!verifyResult || verifyResult.message !== 'Authorized') {
        window.location.href = '/sign-in';
        return;
    }

    // Nếu xác thực thành công và người dùng đang ở trang công khai (sign-in hoặc sign-up)
    if (publicRoutes.includes(currentPath)) {
        window.location.href = '/blogs';
        createPost();
    }
});





function renderPosts() {
    const NewestPost = document.getElementById('NewestPost');
    NewestPost.innerHTML = '';

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    posts.slice(start, end).forEach((post) => {
        NewestPost.innerHTML += `    
            <article class="blog-post">
                <h2>${post.title}</h2>
                <div class="blog-post-meta">
                    <img src="/images/user.png" alt="${post.author}">
                    <span class="blog-post-author">${post.author}</span>
                </div>
                <p class="blog-post-preview">${post.description}</p>
                <a href="#" class="read-more">Read More</a>
            </article>
     `;
    });

    updatePagination();
}





function updatePagination() {
    const pageIndicator = document.getElementById('pageIndicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    pageIndicator.innerText = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(posts.length / postsPerPage);
}
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
    }
}
function nextPage() {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
        currentPage++;
        renderPosts();
    }
}
renderPosts();