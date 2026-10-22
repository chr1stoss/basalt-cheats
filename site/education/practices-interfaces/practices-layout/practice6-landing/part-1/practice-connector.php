<?php

declare(strict_types=1);

require dirname(__DIR__, 5) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 6 — Laying out (p1)' : 'Практика 6 — Верстка (p1)';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = asset('/education/practices-interfaces/practices-layout/practice6-landing/part-1/site/index.html');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-6.1</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead"><?= h($isEn ? 'Isolated laying out landing page mini-site.' : 'Изолированный сайт с небольшой наверстанной лендинг-страницей') ?></p>
    </header>
    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice6-landing-part1" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;"></iframe>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>