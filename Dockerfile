From node
LABEL name = "koa2"
LABEL version ="1.0"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD npm start