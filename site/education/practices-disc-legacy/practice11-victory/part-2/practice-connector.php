<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 11 — Hero cities (part-2)' : 'Практика 11 — Города-герои (часть-2)';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];
$src = asset('education/practices-disc-legacy/practice11-victory/part-2/site/index.php');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-11.2</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
    </header>
    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice11-cities" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;"></iframe>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>
