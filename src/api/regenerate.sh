#!/bin/sh
rm -rf swagger.json code-model-v1 src
wget http://localhost:5000/swagger/v1/swagger.json
autorest --typescript --input-file=swagger.json --output-folder=.
