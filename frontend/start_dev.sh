#!/bin/sh

gatsby build
gatsby serve -H 0.0.0.0 &
gatsby develop -H 0.0.0.0