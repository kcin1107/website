<?php
/**
 * Copy this file to config.php and fill in real values.
 * config.php is git-ignored — upload it directly to the server via SFTP/IONOS
 * file manager. It is never built or deployed by the GitHub Action, so it
 * survives every future `git push` untouched.
 *
 * SMTP host/port: use the same settings your mail client uses for this
 * mailbox (IONOS shows these under the mailbox's "Mail client setup" page).
 */

return [
    'smtp_host' => 'smtp.ionos.de',
    'smtp_port' => 587,
    'smtp_user' => 'work@nickringelmann.com',
    'smtp_pass' => 'REPLACE_ME',
    'to_address' => 'work@nickringelmann.com',
];
