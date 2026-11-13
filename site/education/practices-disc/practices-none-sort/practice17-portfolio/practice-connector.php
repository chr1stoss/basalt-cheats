<?php

declare(strict_types=1);

require dirname(__DIR__, 4) . '/bootstrap.php';

$isEn = current_lang() === 'en';
$pageTitle = $isEn ? 'Practice 17 — Portfolio' : 'Практика 17 — Портфолио';
require COMPONENTS_PATH . '/header.php';

$breadcrumbs = [
    ['label' => $pageTitle, 'href' => null],
];

$src = asset('education/practices-disc/practices-none-sort/practice17-portfolio/site/index.html');
?>
<div class="container">
    <?php require COMPONENTS_PATH . '/breadcrumbs.php'; ?>
    <header class="ws-page-hero">
        <p class="ws-hero-badge">PR-17</p>
        <h1 class="ws-page-title"><?= h($pageTitle) ?></h1>
        <p class="ws-page-lead">
            <?= h($isEn
                ? 'Portfolio about yourself creating using stack PHP/CSS/JS'
                : 'Создание портфолио о себе, используя стек HTML/CSS/JS') ?>
        </p>
        <div class="ws-divider" aria-hidden="true"><span>◇</span></div>
    </header>

    <p class="muted" style="max-width:760px;margin:0 auto 14px;text-align:center;">
        <?= $isEn
            ? 'On first load the page will ask 4 questions (category, experience, email, portfolio) — answer them to see the result.'
            : 'При первой загрузке страница задаст 4 вопроса (категория, стаж, e-mail, портфолио) — ответьте, чтобы увидеть результат.' ?>
    </p>

    <div class="card card-hover stack" style="padding:20px;">
        <div class="console-frame" style="height:75vh;background:#f5efe6;">
            <iframe
                title="practice17-portfolio"
                src="<?= h($src) ?>"
                style="width:100%;height:100%;border:0;background:#f5efe6;"
            ></iframe>
        </div>
    </div>
</div>
<?php require COMPONENTS_PATH . '/footer.php'; ?>