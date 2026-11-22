<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 11 — Node.js Vue3 Counter' : 'Практика 11 — Node.js Vue3 Счетчик';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

// Express-сервер поднимается отдельно (см. practice11-node-vue3/site/README.md).
// Порт по умолчанию — 5173.
$src = 'http://localhost:5173';
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-11</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead"><?= h($isEn ? 'Isolated Node.js Vue3 Counter' : 'Isolated Node.js Vue3 Счетчик') ?></p>
    </header>
    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice8-landing-positivus" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;"></iframe>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>