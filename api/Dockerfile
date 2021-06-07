FROM lts-alpine3.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ENV ENCRYPTIONKEY = ujYUh7LLgaacQgtbasvzCJJg33prZiZx
ENV DBHOST = localhost
ENV DBPORT = 3306
ENV DBUSER = root
ENV DBPASSWORD = change_this
ENV DATABASE = password_pusher


EXPOSE 8080