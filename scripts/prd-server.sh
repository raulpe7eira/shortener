# shortener/scripts/prd-server.sh

echo '\n\033[1;33m> PRODUCTION ENVIRONMENT MODE\033[m'
export NODE_ENV='prd'
export MONGOLAB_USER='ushortener'
export MONGOLAB_PASSWORD='#us%40abcd1234$'

echo '\n\033[0;33mProduction preparing...\033[m\n'
node 'scripts/prd-data.js' --timeout 10000

echo '\n\033[0;33mProduction running...\033[m\n'
nodemon server --timeout 10000

echo '\n\033[1;33m> DONE\033[m\n'