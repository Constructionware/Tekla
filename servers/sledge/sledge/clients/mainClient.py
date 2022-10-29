import os
from re import TEMPLATE

from starlette.applications import Starlette
from starlette.responses import PlainTextResponse, FileResponse
from starlette.routing import Route, Mount, WebSocketRoute
from starlette.staticfiles import StaticFiles


from starlette.templating import Jinja2Templates

from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

BASE_PATH = os.path.abspath(os.getcwd())
TEMPLATES_PATH = os.path.join(BASE_PATH, 'dist')
STATIC_PATH = os.path.join(TEMPLATES_PATH , 'assets')
templates = Jinja2Templates(directory=TEMPLATES_PATH)

print('BASEPATH', BASE_PATH)


async def homepage(request):
    return templates.TemplateResponse('index.html', {'request': request})


def base(request):
    path = request.path_params.get('path')
    file_path =  FileResponse(os.path.join(STATIC_PATH , path))
    return templates.TemplateResponse('index.html', {'request': request})

routes = [

    Route('/', homepage),
    Mount('/assets', StaticFiles(directory=STATIC_PATH )),
    Mount('/static', StaticFiles(directory=TEMPLATES_PATH )),
    Route('/{path}', base),

]


app = Starlette(debug=True, routes=routes)

app.add_middleware(
        CORSMiddleware, 
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=False,
        allow_origin_regex=None,
        expose_headers=[             
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Cedentials",
        "Access-Control-Allow-Expose-Headers",
        ],
        max_age=3600,

)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=9000)