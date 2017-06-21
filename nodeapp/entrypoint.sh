#!/bin/sh


echo "This is a idle script (infinite loop) to keep container running."
echo "It will exit if the programm returns non zero."
echo "Otherwise it will sleep 1 minute and run the programm again."

cleanup ()
{
  kill -s SIGTERM $!
  exit 0
}

startApp ()
{
    npm run docker:live
    rc=$?
    if [[ $rc != 0 ]]
    then
        exit $rc
    else
        sleep 60
    fi
    
}

trap cleanup SIGINT SIGTERM

while [ 1 ]
do
  startApp
done