#!/bin/bash
# ausführen mit: ./Push.sh dev  oder  ./Push.sh main <-- immer dahin
# git branch 
# git switch --> Wichtig!! Wechsel zum aktuellen Stand
# Branches Workflow anpassen zu working in dev wenn software live ist!! vorher dran gewöhnen

REPO_PATH="$(cd "$(dirname "$0")" && pwd)"
REMOTE_URL="git@github.com/Johnyboi77/LF10.git"
BRANCH="${1:-main}"

cd "$REPO_PATH" || exit 1


### To add github email & user
# git config --global user.email  "jonasfrey0177@gmail.com"
# git config --global user.name "Johnyboi77"

# Check git config
echo "Current git user: $(git config user.name) <$(git config user.email)>"

# WICHTIG: Erst pullen!
git pull origin "$BRANCH"

# DANN adden & committen
git add .
git commit -m "$(date '+%Y-%m-%d %H:%M:%S') - Initial Commit"
git push origin "$BRANCH"