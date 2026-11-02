FROM ubuntu:22.04
WORKDIR /app
COPY server.x86_64 .
COPY server.pck .
RUN chmod +x server.x86_64
EXPOSE 7070
CMD ["./server.x86_64", "--headless"]