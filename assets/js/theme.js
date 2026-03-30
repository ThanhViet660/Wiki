// wiki2/assets/js/theme.js — Dark/Light Mode Toggle
// Runs IMMEDIATELY (not deferred) to prevent FOUC

(function() {
    // 1. Khôi phục theme từ localStorage TRƯỚC KHI render
    const stored = localStorage.getItem('vcu-wiki-theme');
    if (stored === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    // 2. Setup toggle khi DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtns = document.querySelectorAll('.theme-toggle');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Thêm class transition tạm thời
                document.documentElement.classList.add('theme-transitioning');

                // Toggle
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('vcu-wiki-theme', isDark ? 'dark' : 'light');

                // Xóa transition class sau khi animation xong
                setTimeout(() => {
                    document.documentElement.classList.remove('theme-transitioning');
                }, 600);
            });
        });
    });
})();
