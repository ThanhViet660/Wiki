// ── Search Index ──
const SEARCH_INDEX = [
  // Commands
  { title: '/vcu reload', desc: 'Tải lại toàn bộ config và messages', page: 'commands.html', section: '#cmd-reload', icon: '🔄', tags: 'reload tải lại config' },
  { title: '/vcu editor', desc: 'Mở Editor GUI để quản lý hệ thống', page: 'commands.html', section: '#cmd-editor', icon: '🛠️', tags: 'editor gui quản lý chỉnh sửa' },
  { title: '/vcu open', desc: 'Mở menu trao đổi vật phẩm', page: 'commands.html', section: '#cmd-open', icon: '📂', tags: 'open mở menu trao đổi category' },
  { title: '/vcu open [path] [player]', desc: 'Mở menu cho người chơi khác', page: 'commands.html', section: '#cmd-open', icon: '👥', tags: 'open others người khác mở hộ' },
  { title: '/vcu upgrade', desc: 'Nâng cấp vật phẩm MMOItem trên tay', page: 'commands.html', section: '#cmd-upgrade', icon: '⬆️', tags: 'upgrade nâng cấp vật phẩm tay' },
  { title: '/vcu select', desc: 'Xem danh sách vật phẩm có thể nâng cấp', page: 'commands.html', section: '#cmd-select', icon: '📋', tags: 'select chọn xem danh sách nâng cấp' },

  // Permissions
  { title: 'vietcraftupgrade.command.reload', desc: 'Quyền sử dụng lệnh reload', page: 'commands.html', section: '#permissions', icon: '🔒', tags: 'permission quyền reload' },
  { title: 'vietcraftupgrade.command.editor', desc: 'Quyền truy cập editor GUI', page: 'commands.html', section: '#permissions', icon: '🔒', tags: 'permission quyền editor' },
  { title: 'vietcraftupgrade.command.open', desc: 'Quyền mở menu trao đổi', page: 'commands.html', section: '#permissions', icon: '🔒', tags: 'permission quyền open mở menu' },
  { title: 'vietcraftupgrade.command.open.others', desc: 'Quyền mở menu cho người khác', page: 'commands.html', section: '#permissions', icon: '🔒', tags: 'permission quyền open others người khác' },
  { title: 'vietcraftupgrade.command.upgrade', desc: 'Quyền nâng cấp vật phẩm', page: 'commands.html', section: '#permissions', icon: '🔒', tags: 'permission quyền upgrade nâng cấp' },
  { title: 'vietcraftupgrade.command.select', desc: 'Quyền xem vật phẩm nâng cấp', page: 'commands.html', section: '#permissions', icon: '🔒', tags: 'permission quyền select' },
  { title: 'vietcraftupgrade.bypass.successrate', desc: 'Bỏ qua tỉ lệ thành công (luôn 100%)', page: 'commands.html', section: '#permissions', icon: '⚡', tags: 'bypass bỏ qua tỉ lệ thành công 100' },
  { title: 'vietcraftupgrade.*', desc: 'Tất cả quyền plugin', page: 'commands.html', section: '#permissions', icon: '🌟', tags: 'wildcard all tất cả quyền' },

  // Config
  { title: 'Success_Rate', desc: 'Tỉ lệ thành công toàn cục (0-100)', page: 'config.html', section: '#config-exchange', icon: '🎲', tags: 'config success rate tỉ lệ thành công cấu hình' },
  { title: 'Lose_Ingredients_On_Fail', desc: 'Mất nguyên liệu khi thất bại', page: 'config.html', section: '#config-exchange', icon: '📦', tags: 'config lose ingredients fail mất nguyên liệu thất bại' },
  { title: 'Confirm_Before_Exchange', desc: 'Xác nhận trước khi trao đổi', page: 'config.html', section: '#config-exchange', icon: '✅', tags: 'config confirm xác nhận trao đổi' },

  // Data Structure
  { title: 'Exchange Group', desc: 'Nhóm chứa nhiều category (ví dụ: Vũ Khí, Áo Giáp)', page: 'config.html', section: '#data-structure', icon: '📁', tags: 'group nhóm danh mục tổng cấu trúc' },
  { title: 'Exchange Category', desc: 'Danh mục chứa các recipe trao đổi', page: 'config.html', section: '#data-structure', icon: '📋', tags: 'category danh mục recipe cấu trúc' },
  { title: 'Exchange Recipe', desc: 'Công thức trao đổi với result và ingredients', page: 'config.html', section: '#data-structure', icon: '🧪', tags: 'recipe công thức trao đổi result kết quả' },
  { title: 'Ingredient', desc: 'Nguyên liệu cần cho recipe (MMOItem/Vanilla)', page: 'config.html', section: '#data-structure', icon: '🧱', tags: 'ingredient nguyên liệu mmoitem vanilla material' },
  { title: 'Standalone Category', desc: 'Category không thuộc group nào', page: 'config.html', section: '#data-structure', icon: '📄', tags: 'standalone đơn lẻ category không group' },
  { title: 'Custom Layout', desc: 'Layout menu tùy chỉnh cho từng category', page: 'config.html', section: '#layout-system', icon: '🎨', tags: 'layout menu tùy chỉnh giao diện custom' },

  // Features
  { title: 'Hệ thống trao đổi', desc: 'Trao đổi vật phẩm theo công thức tùy chỉnh', page: 'features.html', section: '#feat-exchange', icon: '🔄', tags: 'trao đổi exchange vật phẩm chính' },
  { title: 'Nâng cấp vật phẩm', desc: 'Auto-detect level và tìm công thức nâng cấp', page: 'features.html', section: '#feat-upgrade', icon: '⬆️', tags: 'nâng cấp upgrade level auto tự động' },
  { title: 'Editor GUI', desc: 'Quản lý toàn bộ hệ thống qua giao diện trong game', page: 'features.html', section: '#feat-editor', icon: '🛠️', tags: 'editor gui giao diện quản lý game' },
  { title: 'VietStorage', desc: 'Lấy nguyên liệu từ kho VietStorage', page: 'features.html', section: '#feat-storage', icon: '📦', tags: 'vietstorage kho storage nguyên liệu' },
  { title: 'Auto-Create Recipes', desc: 'Tạo nhanh chuỗi recipe nâng cấp tự động', page: 'features.html', section: '#feat-autocreate', icon: '⚡', tags: 'auto create tạo nhanh tự động recipe' },
  { title: 'Shift Exchange', desc: 'Trao đổi nhiều lần với số lượng tùy chỉnh', page: 'features.html', section: '#feat-shift', icon: '🔢', tags: 'shift exchange nhiều lần số lượng tùy chỉnh' },
  { title: 'Custom Layout Menu', desc: 'Mỗi category có thể có giao diện menu riêng biệt', page: 'features.html', section: '#feat-layout', icon: '🎨', tags: 'layout menu tùy chỉnh giao diện' },
  { title: 'Tỉ lệ thành công', desc: 'Hệ thống tỉ lệ thành công có thể cấu hình', page: 'features.html', section: '#feat-success', icon: '🎲', tags: 'success rate tỉ lệ thành công' },

  // Guide
  { title: 'Hướng dẫn cài đặt', desc: 'Cách cài đặt plugin lên server', page: 'guide.html', section: '#install', icon: '🚀', tags: 'cài đặt install setup hướng dẫn bắt đầu' },
  { title: 'Tạo công thức qua Editor', desc: 'Hướng dẫn tạo group, category, recipe trong Editor', page: 'guide.html', section: '#editor-guide', icon: '🛠️', tags: 'editor tạo công thức recipe group category hướng dẫn' },
  { title: 'Cách trao đổi (Người chơi)', desc: 'Hướng dẫn người chơi trao đổi vật phẩm', page: 'guide.html', section: '#player-exchange', icon: '🎮', tags: 'người chơi player trao đổi hướng dẫn cách' },
  { title: 'Nâng cấp nhanh', desc: 'Cách dùng /vcu upgrade và /vcu select', page: 'guide.html', section: '#player-upgrade', icon: '⬆️', tags: 'nâng cấp nhanh upgrade select hướng dẫn' },
  { title: 'Loại nguyên liệu', desc: 'MMOItems Type, MATERIAL, VANILLA - Giải thích', page: 'guide.html', section: '#ingredients', icon: '🧱', tags: 'nguyên liệu loại type material vanilla mmoitem' },
  { title: 'AllowStorage', desc: 'Cách bật lấy nguyên liệu từ kho VietStorage', page: 'guide.html', section: '#ingredients', icon: '📦', tags: 'allowstorage vietstorage kho nguyên liệu bật tắt' },
  { title: 'Tùy chỉnh layout menu', desc: 'Cách tạo và gán layout riêng cho category', page: 'guide.html', section: '#layout-guide', icon: '🎨', tags: 'layout menu tùy chỉnh giao diện danh mục' },
  { title: 'Auto-Create hàng loạt', desc: 'Tạo nhanh chuỗi nâng cấp tự động qua dialog', page: 'guide.html', section: '#autocreate-guide', icon: '⚡', tags: 'auto create nhanh hàng loạt dialog tự động' },
  { title: 'Slot và Page tùy chỉnh', desc: 'Cách đặt vị trí slot và trang cho recipe', page: 'guide.html', section: '#slot-page', icon: '📌', tags: 'slot page vị trí trang tùy chỉnh recipe' },
  { title: 'MiniMessage format', desc: 'Cách dùng MiniMessage cho text hiển thị', page: 'guide.html', section: '#minimessage', icon: '💬', tags: 'minimessage format text message color màu sắc' },

  // Changelog
  { title: 'v1.0.0', desc: 'Phát hành chính thức - Tất cả tính năng', page: 'changelog.html', section: '#v100', icon: '🎉', tags: 'v1 phát hành chính thức update cập nhật' },
  { title: 'v0.9.0', desc: 'Beta - Shift Exchange, Ingredient Format', page: 'changelog.html', section: '#v090', icon: '🔧', tags: 'v0.9 beta shift exchange cập nhật' },
  { title: 'v0.8.0', desc: 'Alpha - VietStorage, Editor Dialogs', page: 'changelog.html', section: '#v080', icon: '🔧', tags: 'v0.8 alpha vietstorage editor cập nhật' },
];

const PAGE_LABELS = {
  'commands.html': 'Lệnh & Quyền',
  'config.html': 'Cấu hình',
  'features.html': 'Tính năng',
  'guide.html': 'Hướng dẫn',
  'changelog.html': 'Cập nhật',
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initTabs();
  initCopyButtons();
  initSearch();
  initSidebarTOC();
  initTableFilter();
  initNavbarScroll();
  initParallaxOrbs();

  // Apply staggered reveal class to grids and timelines
  document.querySelectorAll('.card-grid, .quick-nav, .timeline').forEach(el => {
    el.classList.add('reveal-stagger');
    // For timeline, we stagger the timeline items inside
    if (el.classList.contains('timeline')) {
      el.classList.remove('reveal-stagger'); // Keep timeline standard, items act independently based on scroll
      el.querySelectorAll('.timeline-item').forEach(item => item.classList.add('reveal'));
    }
  });

  // Re-run scroll reveal to catch newly added elements
  setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
});

// ── Background Parallax ──
function initParallaxOrbs() {
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length === 0) return;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs[0].style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    if (orbs[1]) orbs[1].style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    if (orbs[2]) orbs[2].style.transform = `translate(${x * 20 - window.innerWidth / 4}px, ${y * 20 - window.innerHeight / 4}px)`;
  });
}

// ── Navbar Scroll Effect ──
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── Mobile Menu ──
function initMobileMenu() {
  document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.navbar-center')?.classList.toggle('open');
  });
  document.querySelectorAll('.navbar-center a').forEach(link => {
    link.addEventListener('click', () => document.querySelector('.navbar-center')?.classList.remove('open'));
  });
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.classList.contains('reveal-stagger')) {
          e.target.classList.add('visible'); // Ensures immediate children trigger their transitions
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => obs.observe(el));
}

// ── Tabs ──
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabBar => {
    const container = tabBar.parentElement;
    tabBar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        container.querySelector(`#${btn.dataset.tab}`)?.classList.add('active');
      });
    });
  });
}

// ── Copy Buttons ──
function initCopyButtons() {
  document.querySelectorAll('.config-block').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '📋 Copy';
    btn.addEventListener('click', () => {
      const text = block.querySelector('.config-body')?.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '📋 Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
    block.appendChild(btn);
  });
}

// ── Global Search ──
function initSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!overlay || !input || !results) return;

  // Keyboard Navigation
  let selectedIndex = -1;

  document.querySelector('.search-trigger')?.addEventListener('click', openSearch);
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (overlay.classList.contains('open')) {
      if (e.key === 'Escape') {
        e.preventDefault(); closeSearch();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault(); selectResult(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault(); selectResult(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = document.querySelector('.search-result-item.selected');
        if (selected) {
          selected.click();
        } else if (results.firstElementChild?.classList.contains('search-result-item')) {
          results.firstElementChild.click();
        }
      }
    }
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.querySelector('.close-btn')?.addEventListener('click', closeSearch);

  input.addEventListener('input', () => {
    selectedIndex = -1;
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) {
      results.innerHTML = '<div class="search-empty"><div class="icon">🔍</div><div>Bắt đầu nhập từ khóa để tìm kiếm...</div></div>';
      return;
    }

    // Sort logic: title matches score higher than description
    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tags.includes(q)
    ).sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(q);
      const bTitle = b.title.toLowerCase().includes(q);
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    }).slice(0, 10);

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-empty"><div class="icon">👻</div><div>Không tìm thấy kết quả cho "<span style="color:var(--text-primary)">${escapeHtml(input.value)}</span>"</div></div>`;
      return;
    }

    results.innerHTML = matches.map((item, index) => `
      <a class="search-result-item" href="${item.page}${item.section}" data-index="${index}">
        <div class="sr-icon">${item.icon}</div>
        <div>
          <div class="sr-title">${highlight(item.title, q)}</div>
          <div class="sr-desc">${highlight(item.desc, q)}</div>
          <div class="sr-page">📄 ${PAGE_LABELS[item.page] || item.page}</div>
        </div>
      </a>
    `).join('');

    // Add event listeners to new results for mouse hover sync
    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.search-result-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedIndex = parseInt(item.dataset.index);
      });
    });
  });

  function selectResult(dir) {
    const items = document.querySelectorAll('.search-result-item');
    if (items.length === 0) return;
    items.forEach(i => i.classList.remove('selected'));
    selectedIndex += dir;
    if (selectedIndex < 0) selectedIndex = items.length - 1;
    if (selectedIndex >= items.length) selectedIndex = 0;
    items[selectedIndex].classList.add('selected');
    items[selectedIndex].scrollIntoView({ block: 'nearest' });
  }

  function openSearch() {
    overlay.classList.add('open');
    input.value = '';
    input.focus();
    selectedIndex = -1;
    results.innerHTML = '<div class="search-empty"><div class="icon">🔍</div><div>Tìm kiếm tài liệu VietCraftUpgrade...</div></div>';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  return text.substring(0, idx) + '<mark style="background:rgba(99,102,241,0.25);color:var(--accent-light);border-radius:4px;padding:0 4px;">' + text.substring(idx, idx + q.length) + '</mark>' + text.substring(idx + q.length);
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// ── Sidebar TOC Active & Smooth Scroll ──
function initSidebarTOC() {
  const links = document.querySelectorAll('.page-sidebar a');
  if (links.length === 0) return;
  const sections = [];
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        sections.push({ el, link });
        // Smooth scroll implementation instead of CSS (better offset control)
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPos = el.getBoundingClientRect().top + window.scrollY - 120; // 120px offset for sticky navbar + padding
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
          history.pushState(null, '', href);
        });
      }
    }
  });

  let timeout;
  window.addEventListener('scroll', () => {
    if (timeout) cancelAnimationFrame(timeout);
    timeout = requestAnimationFrame(() => {
      const scrollY = window.scrollY + 140; // Offset threshold
      let current = null;
      sections.forEach(s => { if (s.el.offsetTop <= scrollY) current = s; });
      if (!current && sections.length > 0) current = sections[0]; // Default to top

      links.forEach(l => l.classList.remove('active'));
      if (current) current.link.classList.add('active');
    });
  }, { passive: true });

  // Trigger once on load
  window.dispatchEvent(new Event('scroll'));
}

// ── Table Filter ──
function initTableFilter() {
  const input = document.getElementById('cmd-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.cmd-table tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      // Add a subtle fade animation on filter
      if (text.includes(q)) {
        row.style.display = '';
        row.style.animation = 'fadeIn 0.3s';
      } else {
        row.style.display = 'none';
      }
    });
  });
}
