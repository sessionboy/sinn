
# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ 一键发布脚本到测试环境
# @ use  使用rsync同步本地代码到远程服务器，一键发布
# @ tip 如果你使用的是window系统, 可使用cwrsync
# @ rm -rf dist/assets  删除dist/assets文件夹
# @ npm start  webpack打包生成新的dist/assets
# 使用rsync命令将目录./dist/下的所有文件同步到ip为10.10.10.10的远程服务器的/home/sinn/test目录

rm -rf dist/assets
npm start
rsync -cavzP --delete-after ./dist/* --exclude-from='.rsync-exclude' root@10.10.10.10:/home/sinn/test
