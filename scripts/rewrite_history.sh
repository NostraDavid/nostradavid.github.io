#!/bin/sh

# From https://stackoverflow.com/a/750182/12210524
# Don't forget to change the "old@email.com" and run the commands from the URL above, like "git push --force --tags origin 'refs/heads/*'"
# There's also https://docs.github.com/en/enterprise/2.17/user/github/using-git/changing-author-info#changing-the-git-history-of-your-repository-using-a-script
git filter-branch --env-filter '
OLD_EMAIL="old@email.com"
CORRECT_NAME="NostraDavid"
CORRECT_EMAIL="55331731+NostraDavid@users.noreply.github.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
