#! /bin/bash
echo "# js-learning" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/enablex3/js-learning
git push -u origin main