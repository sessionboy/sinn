# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ nginx启动脚本 (仅供参考)
# @ 使用docker官方nginx镜像

docker kill nginx
docker rm nginx
docker run -p 80:80 --name nginx -v /home/projects/sinn/web:/sinn -v /home/projects/sinn/test:/test -v /home/projects/ohaiyo/web:/ohaiyo -v /home/projects/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/projects/nginx/logs:/wwwlogs  -d nginx