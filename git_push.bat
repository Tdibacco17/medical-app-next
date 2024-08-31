@echo off
echo Pushing changes to main...
git checkout main
git push origin main
echo Pushing changes to develop...
git checkout develop
git push origin develop
echo Pushing all tags...
git push --tags
echo Pushes completed.
pause