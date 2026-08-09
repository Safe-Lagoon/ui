#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${REPO_DIR:-$HOME/ui}"
REPO_URL="${REPO_URL:-https://github.com/Safe-Lagoon/ui.git}"
BRANCH="${BRANCH:-main}"

if [ ! -d "$REPO_DIR/.git" ]; then
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

docker compose -f apps/docs/docker-compose.yml build --pull
docker compose -f apps/docs/docker-compose.yml up -d --remove-orphans

docker image prune -f

echo "Docs container status:"
docker compose -f apps/docs/docker-compose.yml ps
