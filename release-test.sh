
# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ 一键发布脚本
# @ use  使用rsync同步本地代码到远程服务器，一键发布
# @ tip 如果你使用的是window系统, 可使用cwrsync
#

rm -rf dist/assets
npm start
rsync -cavzP --delete-after ./dist/* --exclude-from='.rsync-exclude' root@120.24.6.18:/home/projects/sinn/test
