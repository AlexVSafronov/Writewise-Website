#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# ── GitHub CLI ────────────────────────────────────────────────────────────────
if ! command -v gh &>/dev/null; then
  echo "[startup] Installing GitHub CLI..."
  GH_VERSION="2.71.0"
  curl -sL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" \
    | tar -xz -C /tmp
  mv "/tmp/gh_${GH_VERSION}_linux_amd64/bin/gh" /usr/local/bin/gh
  chmod +x /usr/local/bin/gh
  rm -rf "/tmp/gh_${GH_VERSION}_linux_amd64"
  echo "[startup] $(gh --version | head -1) installed"
else
  echo "[startup] gh already installed: $(gh --version | head -1)"
fi

# ── Google Cloud CLI ──────────────────────────────────────────────────────────
if ! command -v gcloud &>/dev/null; then
  echo "[startup] Installing Google Cloud CLI..."
  GCLOUD_VERSION="517.0.0"
  curl -sL "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-${GCLOUD_VERSION}-linux-x86_64.tar.gz" \
    | tar -xz -C /usr/local/lib
  /usr/local/lib/google-cloud-sdk/install.sh \
    --quiet --no-report-usage --usage-reporting=false \
    --path-update=false --command-completion=false
  ln -sf /usr/local/lib/google-cloud-sdk/bin/gcloud /usr/local/bin/gcloud
  ln -sf /usr/local/lib/google-cloud-sdk/bin/gsutil /usr/local/bin/gsutil
  echo "[startup] $(gcloud --version | head -1) installed"
else
  echo "[startup] gcloud already installed: $(gcloud --version | head -1)"
fi

# ── Website npm dependencies ──────────────────────────────────────────────────
echo "[startup] Installing website npm dependencies..."
cd "$CLAUDE_PROJECT_DIR/website" && npm install --prefer-offline --silent
echo "[startup] Website dependencies ready"
