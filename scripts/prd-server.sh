# shortener/scripts/prd-server.sh

echo '\n\033[1;33m> PRODUCTION ENVIRONMENT MODE\033[m'

echo '\n\033[0;33mProduction preparing...\033[m\n'
node 'scripts/prd-data.js' --timeout 10000

echo '\n\033[0;33mProduction running...\033[m\n'
node server --timeout 10000

echo '\n\033[1;33m> DONE\033[m\n'