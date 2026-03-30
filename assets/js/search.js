// wiki2/assets/js/search.js — Premium Search System

(function() {
    // Search Index — tất cả trang trong wiki
    // prefix sẽ được điều chỉnh dựa vào vị trí file hiện tại
    function getPrefix() {
        return document.querySelector('meta[name="wiki-prefix"]')?.content || '';
    }

    function getSearchIndex() {
        const p = getPrefix();
        return [
            {
                title: 'Giới thiệu',
                desc: 'Tổng quan về VietCraftUpgrade, requirements, plugin specs',
                keywords: 'giới thiệu overview introduction mmoitems mythiclib spigot paper',
                icon: 'info',
                url: p + 'index.html'
            },
            {
                title: 'Cài đặt & Khởi đầu',
                desc: 'Hướng dẫn cài đặt dependencies, download JAR, cấu hình ban đầu',
                keywords: 'cài đặt install setup download jar nightcore permissions config',
                icon: 'download',
                url: p + 'cai-dat.html'
            },
            {
                title: 'Tính năng — Tổng quan',
                desc: 'Bento grid tổng quan các tính năng nổi bật của plugin',
                keywords: 'tính năng features tổng quan overview trao đổi phân rã hooks',
                icon: 'extension',
                url: p + 'tinhnang/main.html'
            },
            {
                title: 'Trao đổi & Nâng cấp',
                desc: 'Hệ thống exchange, upgrade, shift-click, success rate',
                keywords: 'trao đổi exchange nâng cấp upgrade recipe auto-detect level shift batch',
                icon: 'swap_horiz',
                url: p + 'tinhnang/trao-doi.html'
            },
            {
                title: 'Phân rã Vật phẩm',
                desc: 'Disassembly system, recovery rates, booster, split mechanics',
                keywords: 'phân rã split disassembly booster recovery rate tier legendary epic',
                icon: 'science',
                url: p + 'tinhnang/phan-ra.html'
            },
            {
                title: 'Hooks & API',
                desc: 'VietStorage integration, developer hooks, plugin modules',
                keywords: 'hooks api vietstorage integration developer webhook event',
                icon: 'webhook',
                url: p + 'tinhnang/hooks.html'
            },
            {
                title: 'Lệnh & Quyền hạn',
                desc: 'Danh sách commands và permissions cho player và admin',
                keywords: 'lệnh command quyền permission admin player vcu reload editor open',
                icon: 'terminal',
                url: p + 'lenh-quyen.html'
            },
            {
                title: 'Cấu hình & Cấu trúc',
                desc: 'Config.yml, directory structure, data hierarchy, recipe layout',
                keywords: 'cấu hình config yaml yml structure directory group category recipe ingredient',
                icon: 'settings_input_component',
                url: p + 'cau-hinh.html'
            },
            {
                title: 'Hướng dẫn Editor GUI',
                desc: 'Drag & Drop system, auto-create recipes, split booster editor',
                keywords: 'hướng dẫn guide editor gui drag drop auto create recipe booster',
                icon: 'menu_book',
                url: p + 'huong-dan.html'
            },
            {
                title: 'Lịch sử cập nhật',
                desc: 'Changelog, version history, timeline phát triển',
                keywords: 'lịch sử history changelog version update timeline phát triển',
                icon: 'history',
                url: p + 'lich-su.html'
            }
        ];
    }

    // Fuzzy-ish matching
    function matchScore(query, text) {
        const q = query.toLowerCase().trim();
        const t = text.toLowerCase();
        if (!q) return 0;

        // Exact substring match (highest score)
        if (t.includes(q)) return 100;

        // Word-level matching
        const qWords = q.split(/\s+/);
        let score = 0;
        for (const w of qWords) {
            if (t.includes(w)) score += 30;
        }

        // Character sequence matching (for partial typing)
        let qi = 0;
        for (let i = 0; i < t.length && qi < q.length; i++) {
            if (t[i] === q[qi]) qi++;
        }
        if (qi === q.length) score += 20;

        return score;
    }

    function highlightText(text, query) {
        if (!query.trim()) return text;
        const regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function initSearch() {
        const searchInput = document.getElementById('wiki-search-input');
        const searchDropdown = document.getElementById('wiki-search-results');
        if (!searchInput || !searchDropdown) return;

        const index = getSearchIndex();
        let selectedIdx = -1;

        function renderResults(query) {
            if (!query.trim()) {
                searchDropdown.classList.remove('active');
                return;
            }

            const results = index
                .map(item => ({
                    ...item,
                    score: matchScore(query, item.title + ' ' + item.desc + ' ' + item.keywords)
                }))
                .filter(r => r.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 6);

            if (results.length === 0) {
                searchDropdown.innerHTML = '<div class="search-empty"><span class="material-symbols-outlined" style="font-size:32px;display:block;margin-bottom:8px;opacity:0.3">search_off</span>Không tìm thấy kết quả</div>';
            } else {
                searchDropdown.innerHTML = results.map((r, i) =>
                    `<a href="${r.url}" class="search-result-item${i === selectedIdx ? ' bg-white/5' : ''}" data-idx="${i}">
                        <span class="material-symbols-outlined result-icon">${r.icon}</span>
                        <div>
                            <div class="result-title">${highlightText(r.title, query)}</div>
                            <div class="result-desc">${highlightText(r.desc, query)}</div>
                        </div>
                    </a>`
                ).join('');
            }

            searchDropdown.classList.add('active');
            selectedIdx = -1;
        }

        // Input events
        searchInput.addEventListener('input', (e) => {
            renderResults(e.target.value);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                renderResults(searchInput.value);
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) {
                searchDropdown.classList.remove('active');
            }
        });

        // Keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            const items = searchDropdown.querySelectorAll('.search-result-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
                items.forEach((el, i) => el.classList.toggle('bg-white/5', i === selectedIdx));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIdx = Math.max(selectedIdx - 1, 0);
                items.forEach((el, i) => el.classList.toggle('bg-white/5', i === selectedIdx));
            } else if (e.key === 'Enter' && selectedIdx >= 0) {
                e.preventDefault();
                items[selectedIdx]?.click();
            } else if (e.key === 'Escape') {
                searchDropdown.classList.remove('active');
                searchInput.blur();
            }
        });

        // Global shortcut: Ctrl+K or /
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', initSearch);
})();
