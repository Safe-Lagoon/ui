#!/usr/bin/env bash
set -euo pipefail

CONF_NAME="ui"
DOCS_UPSTREAM="${DOCS_UPSTREAM:?Set DOCS_UPSTREAM to the docs host private IP:port (e.g. 10.0.0.5:8083)}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:?Set CERTBOT_EMAIL for Let's Encrypt notifications}"
CONF_SRC="${1:-$HOME/ui/deploy/nginx/ui.safelagoon.com.conf}"
CONF_RENDERED="/tmp/ui.safelagoon.com.conf"

sed "s/DOCS_UPSTREAM/${DOCS_UPSTREAM//\//\\/}/g" "$CONF_SRC" > "$CONF_RENDERED"

sudo cp "$CONF_RENDERED" "/etc/nginx/sites-available/$CONF_NAME"
sudo ln -sf "/etc/nginx/sites-available/$CONF_NAME" "/etc/nginx/sites-enabled/$CONF_NAME"
sudo nginx -t
sudo systemctl reload nginx

echo "Requesting certificate for ui.safelagoon.com..."
sudo certbot --nginx -d ui.safelagoon.com --non-interactive --agree-tos -m "$CERTBOT_EMAIL" --redirect

sudo nginx -t
sudo systemctl reload nginx

echo "ui.safelagoon.com is configured."
