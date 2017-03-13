# shortener/scripts/tst-server.sh
echo '\n\033[1;33m> TEST ENVIRONMENT MODE\033[m'
export NODE_ENV='tst'

echo '\n\033[0;33mTest preparing...\033[m\n'
node 'test/data.js' --timeout 10000

echo '\n\033[0;33mTest running...\033[m'
mocha 'test/spec/*.js' --timeout 10000

echo '\033[1;33m> DONE\033[m\n'