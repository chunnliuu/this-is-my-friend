from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import webbrowser, argparse

parser = argparse.ArgumentParser()
parser.add_argument('--no-browser', action='store_true')
parser.add_argument('--port', type=int, default=0)
args = parser.parse_args()

root = Path(__file__).resolve().parent
handler = partial(SimpleHTTPRequestHandler, directory=str(root))
try:
    server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
except OSError as e:
    print('端口被占用，请关掉之前的启动窗口再试。', e)
    raise SystemExit(1)

url = f'http://127.0.0.1:{server.server_port}/index.html'
print()
print('  《这是我的朋友》已启动')
print('  游玩期间请保留这个窗口，关掉窗口即退出游戏。')
print(f'  如果浏览器没有自动打开，请手动访问：{url}')
print()
if not args.no_browser:
    webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
