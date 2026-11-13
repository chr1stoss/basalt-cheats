<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 7 — Landing from Figma design' : 'Практика 7 — Лендинг из дизайна Figma';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = asset('/education/practices-interfaces/practices-layout/practice7-landing-layout/site/index.html');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-7</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead"><?= h($isEn ? 'Isolated laying out landing page from Figma design mini-site' : 'Изолированный сайт с небольшой страницей из дизайна Figma') ?></p>
    </header>
    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice7-landing-layout" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;"></iframe>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>