@echo off
echo Pulling changes from main...
git checkout main
git pull origin main
echo Pulling changes from develop...
git checkout develop
git pull origin develop
echo Pulling all tags...
git fetch --tags
echo Pulls completed.
pause