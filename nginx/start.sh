docker kill nginx
docker rm nginx
docker run -p 80:80 --name nginx -v /home/projects/sinn/web:/sinn -v /home/projects/sinn/test:/test -v /home/projects/ohaiyo/web:/ohaiyo -v /home/projects/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/projects/nginx/logs:/wwwlogs  -d nginx