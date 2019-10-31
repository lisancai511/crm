#!/bin/bash

#api: ### `_trace`
_trace () {
  echo $1
}

#api: ### `_debug`
_debug () {
  echo $1
}

#api: ### `_info`
_info () {
  echo $1
}

#api: ### `_warn`
_warn () {
  echo $1
}

#api: ### `_error`
_error () {
  echo $1
}

#api: ### `_assert`
_assert () {
  local expression=$1
  local message=$2
  local lineno=$3

  local result=$(eval "test ${expression}" && echo "true")

  if [ "${result}" != "true" ]
  then
    if [[ ! -z "${message}" ]]; then
      local msg="${message}"
    fi

    if [[ ! -z "${lineno}" ]]; then
      local msg="${msg} '[File] $0@$lineno'"
    fi

    _error "${msg}"

    exit 1
  # else
  #   return
  #   and continue executing the script.
  fi
}
