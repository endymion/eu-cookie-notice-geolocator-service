#!/bin/sh
npm test && sls offline start --noEnvironment --host 0.0.0.0
