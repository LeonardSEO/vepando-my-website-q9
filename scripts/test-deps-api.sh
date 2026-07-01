#!/bin/bash

# Test script voor de dependency API
# Usage: ./scripts/test-deps-api.sh [local|production]

set -euo pipefail

# Default to local
ENVIRONMENT=${1:-local}
CRON_SECRET=${CRON_SECRET:-"your-test-secret"}

if [ "$ENVIRONMENT" = "local" ]; then
    BASE_URL="http://localhost:3000"
    echo "🧪 Testing local dependency API..."
else
    BASE_URL="https://vepando.com"
    echo "🌐 Testing production dependency API..."
fi

echo "Environment: $ENVIRONMENT"
echo "Base URL: $BASE_URL"
echo "Secret: ${CRON_SECRET:0:10}..."
echo ""

# Test GET endpoint
echo "📡 Testing GET /api/deps..."
curl -s \
  -H "Authorization: Bearer $CRON_SECRET" \
  -H "Content-Type: application/json" \
  "$BASE_URL/api/deps" | jq '.'

echo ""
echo "✅ Test completed"
