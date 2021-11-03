FROM nginx:latest

#拉取最新代码
RUN git pull
#执行更新
RUN npm i 
#执行打包
RUN npm run build
#拷贝文件
COPY /data/person-web-site/dist/. /usr/share/nginx/html/person/