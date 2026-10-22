<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 10 — Sweetty (part-1)' : 'Практика 10 — Sweetty (часть-1)';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = asset('education/practices-disc-legacy/practice10-sweetty/part-1/site/index.php');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-10.1</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead"><?= h($isEn ? 'Embedded original solution (isolated).' : 'Встроенный оригинал решения (изолированно).') ?></p>
        <div class="ws-divider" aria-hidden="true"><span>◇</span></div>
    </header>
    <div class="console-frame" style="height: 70vh;">
        <iframe title="practice10-sweetty-79" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;"></iframe>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>

