git config --global credential.helper 'cache --timeout=28800'
git add .
git commit -m "adding tabs in a loop - needs to wait for the layout.root to be created"
git remote add origin https://github.com/sachkosm/golden-layout-agGird-react-redux.git
git push -f -u origin master
