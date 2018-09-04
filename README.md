# IndiaRush React

Built with:
* Node.js v8.9
* React v16
* Redux
* Express
* Babel
* WebPack 4
* MongoDB (3.4+)

#Git Checkout

git clone git@bitbucket.org:rahi_jain/irush.git  #Change User Name


# Installation
0. sudo chmod -R 777 dist/ node_modules/

npm install pm2 -g

npm cache clean --force

1. sudo npm install -g --unsafe-perm

2. sudo npm run build:watch

3. sudo npm start /

pm2 start process.json
sudo pm2 stop all



# Dev Starting

Checkout Docs Folder for basic help during development


#File Structure

process.json - # pm2 process file
dist/ - For simple bable can be removed
assets/ - Folder created after compilation of the code. This is the code which will be deployed on the production along with the npm pointed to src/server/index.js.
locale/ - Final text to keyword linking language wise.
src/ - All Development
    client/ - Client based files
    server/ - Server based files
    shared/ - All module files
        analytics - Will be moved
        lib - Will be moved
        modules - Component wise module structures
            category - Container
            components - Contains CSS / View Files
