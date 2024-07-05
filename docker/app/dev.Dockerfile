FROM node:18 As development

MAINTAINER Hugo OTUSZEWSKI <hugo.otuszewski@gmail.com>

RUN mkdir -p /home/app
WORKDIR /home/app
COPY ../ /home/app/

RUN chmod 1777 /tmp

ENV NODE_ENV=development

RUN npm install -g nodemon
RUN npm install -g @nestjs/cli

RUN npm install

CMD [ "npm", "start" ]