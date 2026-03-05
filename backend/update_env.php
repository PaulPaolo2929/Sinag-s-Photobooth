<?php
$env = file_get_contents('.env');
$lines = explode(PHP_EOL, $env);
$newLines = [];
foreach($lines as $line) {
    if(str_starts_with($line, 'DB_CONNECTION=')) $line = 'DB_CONNECTION=mysql';
    if(str_starts_with($line, '# DB_HOST=')) continue;
    if(str_starts_with($line, '# DB_PORT=')) continue;
    if(str_starts_with($line, '# DB_DATABASE=')) continue;
    if(str_starts_with($line, '# DB_USERNAME=')) continue;
    if(str_starts_with($line, '# DB_PASSWORD=')) continue;
    if(str_starts_with($line, 'DB_HOST=')) $line = 'DB_HOST=127.0.0.1';
    if(str_starts_with($line, 'DB_PORT=')) $line = 'DB_PORT=3306';
    if(str_starts_with($line, 'DB_DATABASE=')) $line = 'DB_DATABASE=sinagphotobooth';
    if(str_starts_with($line, 'DB_USERNAME=')) $line = 'DB_USERNAME=root';
    if(str_starts_with($line, 'DB_PASSWORD=')) $line = 'DB_PASSWORD=';
    if(str_starts_with($line, 'APP_NAME=')) $line = 'APP_NAME=SinagPhotobooth';
    if(str_starts_with($line, 'SESSION_DRIVER=')) $line = 'SESSION_DRIVER=file';
    if(str_starts_with($line, 'CACHE_STORE=')) $line = 'CACHE_STORE=file';
    $newLines[] = $line;
}
file_put_contents('.env', implode(PHP_EOL, $newLines));
echo 'Done';

