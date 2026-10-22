<?php

declare(strict_types=1);

require dirname(__DIR__, 5) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 6 — Laying out with kinetic (p2)' : 'Практика 6 — Верстка с кинетикой (p2)';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = asset('/education/practices-interfaces/practices-layout/practice6-landing/part-2/site/index.html');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-6.2</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead"><?= h($isEn ? 'Isolated laying out landing page with kinetic mini-site' : 'Изолированный сайт с небольшой наверстанной лендинг-страницей с кинетикой') ?></p>
    </header>
    <div class="console-frame" style="height: 75vh;">
        <iframe title="practice6-landing-part2" src="<?= h($src) ?>" style="width:100%;height:100%;border:0;"></iframe>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>