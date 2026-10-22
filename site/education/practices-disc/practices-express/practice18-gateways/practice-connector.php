<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 18 — DOM Gateways' : 'Практика 18 — DOM Узлы';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = 'http://localhost:3000';
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-18</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead">
            <?= h($isEn
                ? 'JavaScript: object, template literals, prompt, dynamic DOM output.'
                : 'JavaScript: объект, шаблонные литералы, prompt, динамический вывод в DOM.') ?>
        </p>
        <div class="ws-divider" aria-hidden="true"><span>◇</span></div>
    </header>

    <p class="muted" style="max-width:760px;margin:0 auto 14px;text-align:center;">
        <?= $isEn
            ? 'Express runs on port 3000, separately from PHP/XAMPP. Start it with:'
            : 'Express запускается на порту 3000, отдельно от PHP/XAMPP. Запуск:' ?>
        <code>cd site/practice16-express &amp;&amp; npm install &amp;&amp; npm start</code>.
    </p>

    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice18-express" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;background:#0e0e0e;"></iframe>
    </div>
</div>

// <script>
// (() => {
//   const frame = document.getElementById("pr18-frame");
//   const tabs = document.querySelectorAll("[data-pr18-panel]");
//   if (!frame || !tabs.length) return;
//
//   const setActive = (active) => {
//     tabs.forEach((btn) => {
//       const on = btn === active;
//       btn.setAttribute("aria-selected", on ? "true" : "false");
//       btn.classList.toggle("btn-primary", on);
//       btn.classList.toggle("btn-ghost", !on);
//     });
//   };
//
//   tabs.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const src = btn.getAttribute("data-pr18-src");
//       if (!src || frame.getAttribute("src") === src) return;
//       frame.setAttribute("src", src);
//       setActive(btn);
//     });
//   });
// })();
// </script>

<?php require COMPONENTS_PATH . '/footer.php'; ?>