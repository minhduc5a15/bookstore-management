document.addEventListener('DOMContentLoaded', () => {
    insertHeader();
    insertFooter();
    insertHead();
    const postsPerPage = 5;
    let currentPage = 1;
    getBlogs().then((posts) => {
        function createPost() {
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            const userData = JSON.parse(getKey('user'));
            if (!title || !content) {
                alert('Please fill out both title and content fields.');
                return;
            }

            const newPost = {
                title: title,
                author: userData.username,
                content: content,
                // date: new Date().toLocaleDateString(),
            };
            posts.unshift(newPost);

            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';

            renderPosts();
        }

        const publicRoutes = ['/sign-in', '/sign-up'];
        document.getElementById('createPost').addEventListener('click', async () => {
            const user = getKey('user');

            // Chuẩn hóa pathname để loại bỏ dấu '/' cuối cùng nếu có
            const currentPath = window.location.pathname.replace(/\/+$/, '');

            // Nếu người dùng chưa đăng nhập
            if (!user) {
                if (!publicRoutes.includes(currentPath)) {
                    window.location.href = `/sign-in?redirect=${encodeURIComponent(window.location.href)}`;
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
                window.location.href = `/sign-in?redirect=${encodeURIComponent(window.location.href)}`;
                return;
            }

            // Nếu xác thực thành công và người dùng đang ở trang công khai (sign-in hoặc sign-up)
            createPost();
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
                <p class="blog-post-preview">${post.content.substring(0, 100)}...</p>
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
        document.getElementById('prevBtn').addEventListener('click', function prevPage() {
            console.log('heeeheh');
            if (currentPage > 1) {
                currentPage--;
                renderPosts();
            }
        })
        // function nextPage() {
        //     console.log("heeeheh")
        //     if (currentPage < Math.ceil(posts.length / postsPerPage)) {
        //         currentPage++;
        //         renderPosts();
        //     }
        // }
        document.getElementById('nextBtn').addEventListener('click', function nextPage() {
            console.log('heeeheh');
                if (currentPage < Math.ceil(posts.length / postsPerPage)) {
                    currentPage++;
                    renderPosts();
                }
        })
        renderPosts();
    });
});
