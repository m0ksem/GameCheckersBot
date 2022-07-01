# Telegram bot template


## Deploy

### Github actions (deploy with SSH)
Setup new ssh key for this repository:
- `ssh-keygen -t rsa -f ~/.ssh/github-repo-name` - generate ssh key
- `cat ~/.ssh/github-repo-name.pub | ssh b@B 'cat >> ~/.ssh/authorized_keys'` - add key to authorized_keys for deployment
- `cat < ~/.ssh/github-repo-name` - copy private ssh key (with comments) and past in `PRIVATE_KEY` github secret 

You need to set following secrets in Github repository settings: 
- `DEPLOY_BRANCH` - branch from where source code must be pulled
- `DEPLOY_PATH` - path on server where to store repository
- `HOST` - server host ip
- `PORT` - ssh port (by default it 22)
- `USERNAME` - ssh user on server 
- `PRIVATE_KEY` - private key of ssh user on server

### Run as daemon
We use [pm2](https://pm2.keymetrics.io/) that handle background process. This is useful if you have many bot to deploy.

Custom scripts from `./daemon` directory takes process name fron `package.json` so don't forget to change it.

Additional commands:
- `yarn daemon:start` - start new background process
- `yarn daemon:stop` - stop background proces
- `yarn daemon:rebuild` - stop previous process (if exists), build and start new background process

## Requirements 
- Node >16
- yarn >1
