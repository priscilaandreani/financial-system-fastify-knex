#!/bin/bash

case "$1" in
  test)
    export NODE_ENV='test'
    export DATABASE_URL='./tmp/test.db'
    export DATABASE_CLIENT='sqlite'
    npx vitest
    ;;
  build)
    rm -rf dist
    export NODE_ENV='production'
    npx tsup src
esac
