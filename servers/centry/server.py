import requests
from config import config

from starlette.applications import Starlette
from starlette.responses import PlainTextResponse, JSONResponse
from starlette.routing import Route, Mount, WebSocketRoute
from starlette.staticfiles import StaticFiles

from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from router.project_router import (
    project, projectHome, projects, newproject, accountTransaction, addWorkers, addTask, getProjectTask,
    jsonproject
)
from models.project import addProjectInvoice
from models.tasks import getTasks, saveTask

from router.employee_router import (
    worker, workersHome, workers, getworker, newworker, updateworker, payworker, uploadProfileImage)
from models.equipment import (
    newTool, getTool, getTools, updateTool, deleteTool)

from models.document import pdfDoc, workerPayStatement
from models.supplier import (createSupplier, getSupplier, getSuppliers, suppliersNameIndex, invoiceIdIndex, checkInvoice )


async def homepage(request):
   
    return config.templates.TemplateResponse('index.html', {'request': request})


async def aboutus(request):
    return config.templates.TemplateResponse('about.html', {'request': request})


async def contactus(request):
    return config.templates.TemplateResponse('contact.html', {'request': request})


async def stats(request):
    return config.templates.TemplateResponse('stats.html', {'request': request})


async def news(request):
    return config.templates.TemplateResponse('news.html', {'request': request})


async def hostaddress(request):
   
    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        s.connect(('10.254.254.254', 1))
        address = dict(
            IP = s.getsockname()[0],
            LOCALHOST = socket.gethostbyname(socket.gethostname()),
            HOSTNAME = socket.gethostname()
        )
    except Exception:
        address = dict(
            LOCALHOST = socket.gethostbyname(socket.gethostname()),
            HOSTNAME = socket.gethostname()
        )
    finally: 
        s.close()
    return JSONResponse(address)
    

        
def user_me(request):
    username = "John Doe"
    return PlainTextResponse('Hello, %s!' % username)


def user(request):
    username = request.path_params['username']
    return PlainTextResponse('Hello, %s!' % username)


async def websocket_endpoint(websocket):
    await websocket.accept()
    await websocket.send_text('Hello, websocket!')
    await websocket.close()


def startup():
    print('Ready to go')


routes = [

    Route('/', homepage),
    Route('/about', aboutus),
    Route('/contact', contactus),
    Route('/stats', stats),
    # Network
    Route('/hostip', methods=['GET'], endpoint=hostaddress),
    Route('/news', news),
    Route('/user/me', user_me),
    Route('/user/{username}', user),
    WebSocketRoute('/ws', websocket_endpoint),
    Mount('/static', StaticFiles(directory="static")),
    # Project Routes
    Route('/project', methods=['GET'], endpoint=projectHome),
    Route('/newproject', methods=['POST'], endpoint=newproject),
    Route('/projects', methods=['GET'], endpoint=projects),
    Route('/project/{id}', methods=['GET','DELETE', 'POST', 'PUT'], endpoint=project),
    Route('/jsonproject/{id}', methods=['GET'], endpoint=jsonproject),
    Route('/transaction/{id}',
          methods=['POST', 'PUT'], endpoint=accountTransaction),
    Route('/add_project_invoice/{id}', methods=['POST'], endpoint=addProjectInvoice),
    Route('/addworkers/{id}', methods=['POST', ], endpoint=addWorkers),
    Route('/addtasks/{id}', methods=['POST', 'PUT'], endpoint=addTask),
    Route('/gettask/{id}', methods=['GET'], endpoint=getProjectTask),
    Route('/invoiceids', methods=['GET'], endpoint=invoiceIdIndex),
    # Employee Routes
    Route('/worker', methods=['GET'], endpoint=workersHome),
    Route('/newworker', methods=['POST'], endpoint=newworker),
    Route('/workers', methods=['GET'], endpoint=workers),
    Route('/worker/{id}', methods=['GET',
          'DELETE', 'POST', 'PUT'], endpoint=worker),
    Route('/getworker/{id}', methods=['GET'], endpoint=getworker),
    Route('/updateworker',  methods=['PUT'], endpoint=updateworker),
    Route('/payworker/{id}',  methods=['POST'], endpoint=payworker),
    Route('/uploadprofile', endpoint=uploadProfileImage, methods=['GET', 'POST']),
    Route('/paystatement/{id}', endpoint=workerPayStatement, methods=['GET']),
    # Supplier Routes
    Route('/newsupplier', methods=['POST'], endpoint=createSupplier),
    Route('/getsuppliers', methods=['GET'], endpoint=getSuppliers),
    Route('/supplier/{id}', methods=['GET'], endpoint=getSupplier),
    Route('/suppliers_name_index', methods=['GET'], endpoint=suppliersNameIndex),
    Route('/check_invoice', methods=['POST'], endpoint=checkInvoice),
    # Tasks Routes
    Route('/tasks', methods=['GET'], endpoint=getTasks),
    Route('/savetask', methods=['POST'], endpoint=saveTask),
    # Tools and Equipment Routes
    Route('/newtool', methods=['POST'], endpoint=newTool),
    Route('/gettool/{id}', methods=['GET'], endpoint=getTool),
    Route('/gettools', methods=['GET'], endpoint=getTools),
    Route('/updatetool', methods=['PUT'], endpoint=updateTool),
    Route('/deletetool/{id}', methods=['DELETE'], endpoint=deleteTool),
    # Document Routes
    Route('/doc/{id}', endpoint=pdfDoc, methods=['GET']),
    



]


app = Starlette(debug=True, routes=routes, on_startup=[startup])

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
