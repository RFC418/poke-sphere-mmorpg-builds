FROM ubuntu:22.04
WORKDIR /app
COPY server.x86_64 .
COPY server.pck .
RUN chmod +x server.x86_64
EXPOSE 10000
CMD ["./server.x86_64", "--headless"]