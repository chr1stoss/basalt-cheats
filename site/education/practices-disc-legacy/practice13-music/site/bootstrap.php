<?php

declare(strict_types=1);

const ROOT = __DIR__;
const CONFIG_PATH = ROOT . '/config';

function is_mobile_client(): bool
{
    if (isset($_COOKIE['basalt_desktop']) && $_COOKIE['basalt_desktop'] === '1') {
        return false;
    }

    $secMobile = $_SERVER['HTTP_SEC_CH_UA_MOBILE'] ?? '';
    if ($secMobile === '?1') {
        return true;
    }

    $ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
    if ($ua === '') {
        return false;
    }

    return (bool) preg_match(
        '/Mobile|Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Windows Phone/i',
        $ua
    ) || (bool) preg_match('/iPad|Tablet|PlayBook|Silk/i', $ua);
}

function mobile_guard_should_run(): bool
{
    $script = basename((string) ($_SERVER['SCRIPT_NAME'] ?? ''));
    if ($script === 'mobile-blocked.php') {
        return false;
    }

    $uri = (string) ($_SERVER['REQUEST_URI'] ?? '');
    if (str_contains($uri, '/actions/')) {
        return false;
    }

    return true;
}

function mobile_guard_redirect(): void
{
    if (!mobile_guard_should_run() || !is_mobile_client()) {
        return;
    }

    if (isset($_GET['desktop']) && (string) $_GET['desktop'] === '1') {
        $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        setcookie('basalt_desktop', '1', [
            'expires' => time() + 86400,
            'path' => '/',
            'secure' => $secure,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        return;
    }

    header('Location: ' . asset('mobile-blocked.php'), true, 302);
    exit;
}

mobile_guard_redirect();