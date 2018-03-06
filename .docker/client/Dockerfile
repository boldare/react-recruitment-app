FROM node:8.9.4

RUN npm install -g yarn

RUN LD_LIBRARY_PATH=/usr/local/lib && export LD_LIBRARY_PATH
RUN echo "LD_LIBRARY_PATH=/usr/local/lib && export LD_LIBRARY_PATH" >> ~/.bashrc

# set entrypoint
COPY entrypoint.sh /usr/local/bin/
RUN chmod a+x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
