# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node

ARG EXTRA_NODE_VERSION=node
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"
RUN npm install yarn typescript jest -g

