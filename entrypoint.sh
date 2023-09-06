#!/bin/bash
set -eo pipefail

# Create api.json file with API_URL
cat <<EOF > api.json
{"apiUrl": "${API_URL}"}
EOF

exec "$@"
