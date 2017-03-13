# shortener/scripts/dev-server.sh

echo '\n\033[1;33m> DEVELOPMENT ENVIRONMENT MODE\033[m'
export NODE_ENV="dev"

echo '\n\033[0;33mDevelopment running...\033[m\n'
nodemon server --timeout 10000

echo '\n\033[1;33m> DONE\033[m\n'