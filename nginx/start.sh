# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ nginx启动脚本 (仅供参考)
# @ 使用docker官方nginx镜像

docker kill nginx
docker rm nginx
docker run -p 80:80 --name nginx -v /home/sinn/web:/sinn -v /home/sinn/test:/test -v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/logs:/wwwlogs  -d nginx