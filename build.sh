#! /bin/bash
APP_VERSION=$(grep "version" ./package.json | awk -F '"' '{ print $4 }')
HOME_DIR=$(pwd)

# Default docker image name 
DOCKER_IMG="gqrx-remote-rest"

if [ "$1" == "dev" ]; then
  APP_VERSION=dev
fi

if [ "$1" == "latest" ]; then
  APP_VERSION=latest
fi

# Splash info
echo "--------------------------------------------------------------------"
echo "Image name: ${DOCKER_IMG}"
echo "App version: ${APP_VERSION}"
echo "--------------------------------------------------------------------"
 
# Auto build 
while true
do
  read -p "Proceed? (y/n)" response

  case $response in
   [yY]* )
      cd ${HOME_DIR}
      docker build -t ${DOCKER_IMG}:${APP_VERSION} .
      break;;

   [nN]* ) exit;;
 
   * )     echo "Oh no, please try again!"; break ;;
  esac
done
 
exit 0