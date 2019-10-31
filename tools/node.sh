#!/bin/bash

# make the executable accessible
if [[ "$(echo ${PATH}|grep ./node_modules/.bin)" == "" ]]; then
  PATH=./node_modules/.bin:$PATH
fi

export PATH
