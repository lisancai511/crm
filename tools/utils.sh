function _is_osx(){
  if [[ "$(uname -a | grep "Darwin")" != "" ]] ; then
    return 0
  else
    return 1
  fi
}

function _substitute(){
  if _is_osx; then
    sed -i '' $@
  else
    sed -i $@
  fi
}

function _gradle(){
  if _is_osx; then
    ./gradlew "$@"
  else
    ./gradlew "$@"
  fi
}