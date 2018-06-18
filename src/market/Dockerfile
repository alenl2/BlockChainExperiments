# production environment
FROM nginx:1.15.0-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir /etc/nginx/conf.d
COPY nginx-react.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]