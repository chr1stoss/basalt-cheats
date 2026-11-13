<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 21 — News' : 'Практика 21 — News';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = asset('education/practices-disc/practices-express/practice21-news/site/index.html');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-21</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead">
            <?= h($isEn
                ? 'JavaScript: News'
                : 'JavaScript: Новости') ?>
        </p>
    </header>
    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice20-express" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;background:#0e0e0e;"></iframe>
    </div>
</div>

<?php require COMPONENTS_PATH . '/footer.php'; ?>