#!/bin/bash

case "$1" in
  test)
    export NODE_ENV='test'
    export DATABASE_URL='./tmp/test.db'
    npx vitest
    ;;
esac
