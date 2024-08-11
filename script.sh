#!/bin/bash

case "$1" in
  test)
    export NODE_ENV="test"
    export DATABASE_URL="./tmp/test.db"
    export DATABASE_CLIENT="sqlite"
    npx vitest
    ;;
  build)
    echo "Building..."
    export NODE_ENV="production"
    export DATABASE_CLIENT="pg"
    echo "Injecting env: DATABASE_CLIENT=$DATABASE_CLIENT"
    npx tsup src
    ;;
esac
