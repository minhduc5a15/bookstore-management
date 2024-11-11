const publicRoutes = ['/sign-in', '/sign-up'];

document.addEventListener('DOMContentLoaded', async () => {
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
        window.location.href = '/'; // Chuyển hướng đến trang chính
    }
});
