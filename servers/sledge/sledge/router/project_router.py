from starlette.responses import PlainTextResponse, JSONResponse
from starlette.routing import Route
from config import config
from models.project import Project
from models.tasks import Task


async def projectHome(request):
    p = Project()    
    data = await p.all() 
    name_index = await p.nameIndex()
    return config.templates.TemplateResponse('project/index.html', {'request': request, 'data': data, 'name_index': name_index})


async def newproject(request):
    try:
        p = Project()
        data = await request.json()
        res = await p.save(data=data)
        return JSONResponse({"status": "SUCCESS"})        
    except Exception as ex:
        return JSONResponse(str(ex))
    finally:
        del(p); del(data)    


async def projects(request):
    p = Project()    
    data = await p.nameIndex()    
    return JSONResponse({'state': 'OK', 'data':data})


async def project(request):
    id = request.path_params.get('id')
    p = Project()
    if request.method == 'GET':
        project = await p.get(id=id)    
        return config.templates.TemplateResponse('project/project.html', {'request': request, 'data': project})
    if request.method == 'PUT':
        data = await request.json()
        return JSONResponse( await p.update(data=data))
    if request.method == 'POST':
        data = await request.json()
        return JSONResponse( await p.save(data=data))
    
    if request.method == 'DELETE':
        return JSONResponse( await p.delete(data={"_id": id}))
        

async def jsonproject(request):
    id = request.path_params.get('id')
    p = Project()
    try:
        project = await p.get(id=id)    
        return JSONResponse(project)
    except Exception as e:
        return JSONResponse(str(e))
    finally: del(id); del(p); del(project) 
        
    


async def accountTransaction(request):
    id = request.path_params.get('id')
    data = await request.json()
    p = Project()
    try:
        result = await p.handleTransaction(id=id, data=data)
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({'error', str(e)})
    finally: del(id); del(data); del(p)


async def addWorkers( request ):
    id = request.path_params.get('id')
    data = await request.json()
    p = Project()
    try:
        result = await p.addWorkers(id=id, data=data)
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({'error', str(e)})
    finally: del(id); del(data); del(p)


async def addTask( request ):
    id = request.path_params.get('id')
    data = await request.json()
    p = Project()
    try:
        await p.addTask(id=id, data=data)
        return JSONResponse({"status": "Pending"})
    except Exception as e:
        return JSONResponse({'error', str(e)})
    finally: del(id); del(data); del(p)


async def getProjectTask( request ):
    id = request.path_params.get('id')
    p = Project()
    try:        
        data = await p.getTask(id=id) 
        return config.templates.TemplateResponse('project/task.html', {'request': request, 'data': data})
    except Exception as e:
        return JSONResponse({"error": str(e)})
    finally: del(p); del(data)


