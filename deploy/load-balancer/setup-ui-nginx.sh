#!/usr/bin/env bash
set -euo pipefail

CONF_NAME="ui"
CONF_SRC="${1:-$HOME/ui/deploy/nginx/ui.safelagoon.com.conf}"

sudo cp "$CONF_SRC" "/etc/nginx/sites-available/$CONF_NAME"
sudo ln -sf "/etc/nginx/sites-available/$CONF_NAME" "/etc/nginx/sites-enabled/$CONF_NAME"
sudo nginx -t
sudo systemctl reload nginx

echo "Requesting certificate for ui.safelagoon.com..."
sudo certbot --nginx -d ui.safelagoon.com --non-interactive --agree-tos -m admin@safelagoon.com --redirect

sudo nginx -t
sudo systemctl reload nginx

echo "ui.safelagoon.com is configured."
