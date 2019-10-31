#!/bin/bash

# reset
readonly COLOR_OFF='\033[0m'       # Text Reset

# styles
readonly _colorizer_BOLD='\033[1m'            # Bold
# readonly ITALICS='\033[3m'       # Italics : not working
readonly _colorizer_UNDERLINE='\033[4m'       # Underline
readonly _colorizer_INVERSE='\033[7m'         # Inverse
# readonly STRIKETHROUGH='\033[9m' # Strikethrough : not working

# regular colors
readonly _colorizer_BLACK='\033[0;30m'        # Black
readonly _colorizer_RED='\033[0;31m'          # Red
readonly _colorizer_GREEN='\033[0;32m'        # Green
readonly _colorizer_YELLOW='\033[0;33m'       # Yellow
readonly _colorizer_BLUE='\033[0;34m'         # Blue
readonly _colorizer_PURPLE='\033[0;35m'       # Purple
readonly _colorizer_CYAN='\033[0;36m'         # Cyan
readonly _colorizer_WHITE='\033[0;37m'        # White

# bold
readonly _colorizer_BBLACK='\033[1;30m'       # Black
readonly _colorizer_BRED='\033[1;31m'         # Red
readonly _colorizer_BGREEN='\033[1;32m'       # Green
readonly _colorizer_BYELLOW='\033[1;33m'      # Yellow
readonly _colorizer_BBLUE='\033[1;34m'        # Blue
readonly _colorizer_BPURPLE='\033[1;35m'      # Purple
readonly _colorizer_BCYAN='\033[1;36m'        # Cyan
readonly _colorizer_BWHITE='\033[1;37m'       # White

# underline
readonly _colorizer_UBLACK='\033[4;30m'       # Black
readonly _colorizer_URED='\033[4;31m'         # Red
readonly _colorizer_UGREEN='\033[4;32m'       # Green
readonly _colorizer_UYELLOW='\033[4;33m'      # Yellow
readonly _colorizer_UBLUE='\033[4;34m'        # Blue
readonly _colorizer_UPURPLE='\033[4;35m'      # Purple
readonly _colorizer_UCYAN='\033[4;36m'        # Cyan
readonly _colorizer_UWHITE='\033[4;37m'       # White

# background
readonly _colorizer_ON_BLACK='\033[40m'       # Black
readonly _colorizer_ON_RED='\033[41m'         # Red
readonly _colorizer_ON_GREEN='\033[42m'       # Green
readonly _colorizer_ON_YELLOW='\033[43m'      # Yellow
readonly _colorizer_ON_BLUE='\033[44m'        # Blue
readonly _colorizer_ON_PURPLE='\033[45m'      # Purple
readonly _colorizer_ON_CYAN='\033[46m'        # Cyan
readonly _colorizer_ON_WHITE='\033[47m'       # White

 # high intensity
readonly _colorizer_IBLACK='\033[0;90m'       # Black
readonly _colorizer_IRED='\033[0;91m'         # Red
readonly _colorizer_IGREEN='\033[0;92m'       # Green
readonly _colorizer_IYELLOW='\033[0;93m'      # Yellow
readonly _colorizer_IBLUE='\033[0;94m'        # Blue
readonly _colorizer_IPURPLE='\033[0;95m'      # Purple
readonly _colorizer_ICYAN='\033[0;96m'        # Cyan
readonly _colorizer_IWHITE='\033[0;97m'       # White

# bold high intensity
readonly _colorizer_BIBLACK='\033[1;90m'      # Black
readonly _colorizer_BIRED='\033[1;91m'        # Red
readonly _colorizer_BIGREEN='\033[1;92m'      # Green
readonly _colorizer_BIYELLOW='\033[1;93m'     # Yellow
readonly _colorizer_BIBLUE='\033[1;94m'       # Blue
readonly _colorizer_BIPURPLE='\033[1;95m'     # Purple
readonly _colorizer_BICYAN='\033[1;96m'       # Cyan
readonly _colorizer_BIWHITE='\033[1;97m'      # White

# high intensity backgrounds
readonly _colorizer_ON_IBLACK='\033[0;100m'   # Black
readonly _colorizer_ON_IRED='\033[0;101m'     # Red
readonly _colorizer_ON_IGREEN='\033[0;102m'   # Green
readonly _colorizer_ON_IYELLOW='\033[0;103m'  # Yellow
readonly _colorizer_ON_IBLUE='\033[0;104m'    # Blue
readonly _colorizer_ON_IPURPLE='\033[0;105m'  # Purple
readonly _colorizer_ON_ICYAN='\033[0;106m'    # Cyan
readonly _colorizer_ON_IWHITE='\033[0;107m'   # White

_colorize (){
  local color="$1"
  local message="$2"

  echo -e "${!color}${message}${COLOR_OFF}"
}

arr=`(set -o posix ; set) | grep '^_colorizer_' | awk '{split($0,c,"="); print c[1]}'`
for rawColor in $arr; do
  COLOR=${rawColor#_colorizer_}
  LOWERCASE_COLOR=$(echo "${COLOR}" | awk '{print tolower($0)}')
  eval "_${LOWERCASE_COLOR}() { _colorize \"_colorizer_${COLOR}\" \"\$1\"; }"
done
