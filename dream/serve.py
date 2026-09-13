from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import webbrowser
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--no-browser', action='store_true')
parser.add_argument('--port', type=int, default=0)
args = parser.parse_args()
root = Path(__file__).resolve().parent
handler = partial(SimpleHTTPRequestHandler, directory=str(root))
try:
    server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
except PermissionError as error:
    print("当前运行环境不允许启动本机试玩服务：", error)
    raise SystemExit(1)
except OSError as error:
    print('试玩端口已被占用，请关闭先前打开的试玩启动窗口，再重试。', error)
    raise SystemExit(1)
url = f'http://127.0.0.1:{server.server_port}/index.html'
print('游戏已打开。游玩期间请保留这个窗口。', flush=True)
print(url, flush=True)
if not args.no_browser:
    webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
