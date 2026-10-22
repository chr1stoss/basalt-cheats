<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 16 — RBAC' : 'Практика 16 — RBAC';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = 'http://localhost:3000';

$panels = [
    'register' => [
        'label' => $isEn ? 'Register' : 'Регистрация',
        'src'   => $src . '/register',
    ],
    'login' => [
        'label' => $isEn ? 'Login' : 'Вход',
        'src'   => $src . '/login',
    ],
    'dashboard' => [
        'label' => $isEn ? 'Dashboard' : 'Личный кабинет',
        'src'   => $src . '/dashboard',
    ],
    'admin' => [
        'label' => $isEn ? 'Admin panel' : 'Админ-панель',
        'src'   => $src . '/admin',
    ],
];
$defaultKey = 'register';
$defaultSrc = $panels[$defaultKey]['src'];
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-16</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead">
            <?= h($isEn
                ? 'Node.js + Express: roles admin/user, requireAdmin middleware, admin panel, safe deletion.'
                : 'Node.js + Express: роли admin/user, middleware requireAdmin, админ-панель и безопасное удаление.') ?>
        </p>
        <div class="ws-divider" aria-hidden="true"><span>◇</span></div>
    </header>

    <p class="muted" style="max-width:760px;margin:0 auto 14px;text-align:center;">
        <?= $isEn
            ? 'Express runs on port 3000, separately from PHP/XAMPP. Start it with:'
            : 'Express запускается на порту 3000, отдельно от PHP/XAMPP. Запуск:' ?>
        <code>cd site/practice16-express &amp;&amp; npm install &amp;&amp; npm start</code>.
    </p>

    <div class="card card-hover stack" style="padding:20px;">
        <div class="practice-tabs" role="tablist"
             aria-label="<?= h($isEn ? 'RBAC sections' : 'Разделы RBAC') ?>"
             style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
            <?php foreach ($panels as $key => $panel) { ?>
                <button
                    type="button"
                    class="btn<?= $key === $defaultKey ? ' btn-primary' : ' btn-ghost' ?>"
                    role="tab"
                    aria-selected="<?= $key === $defaultKey ? 'true' : 'false' ?>"
                    data-pr16-panel="<?= h($key) ?>"
                    data-pr16-src="<?= h($panel['src']) ?>"
                ><?= h($panel['label']) ?></button>
            <?php } ?>
        </div>

        <div class="console-frame" style="height: 70vh;">
            <iframe
                id="pr16-frame"
                title="practice16-express"
                src="<?= h($defaultSrc) ?>"
                style="width:100%;height:100%;border:0;background:#fff;"
            ></iframe>
        </div>
    </div>
</div>

<script>
(() => {
  const frame = document.getElementById("pr16-frame");
  const tabs = document.querySelectorAll("[data-pr16-panel]");
  if (!frame || !tabs.length) return;

  const setActive = (active) => {
    tabs.forEach((btn) => {
      const on = btn === active;
      btn.setAttribute("aria-selected", on ? "true" : "false");
      btn.classList.toggle("btn-primary", on);
      btn.classList.toggle("btn-ghost", !on);
    });
  };

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-pr16-src");
      if (!src || frame.getAttribute("src") === src) return;
      frame.setAttribute("src", src);
      setActive(btn);
    });
  });
})();
</script>

<?php require COMPONENTS_PATH . '/footer.php'; ?>