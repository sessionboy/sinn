
# 仅作参考
# 使用rsync命令将本地目录./nginx/下的所有文件同步到ip为10.10.10.10的远程服务器的/home/nginx目录

rsync -cavzP ./nginx/ --exclude-from='.rsync-exclude' root@10.10.10.10:/home/nginx