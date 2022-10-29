from starlette.responses import PlainTextResponse, JSONResponse
from starlette.routing import Route
from config import config
from models.employee import gen, Employee



async def workersHome(request):
    e = Employee()    
    data = await e.all_workers()    
    
    return config.templates.TemplateResponse('workers/index.html', {'request': request, 'data': data})


async def workers(request):
    try:
        e = Employee()    
        data = await e.all_workers()    
        return JSONResponse({'state': 'OK', 'data':data})
    except Exception as ex:
        return str(ex)
    finally:
        del(e); del(data)


async def worker(request): 
    id = request.path_params.get('id')
    e = Employee()   
    try:
        if request.method == 'GET':            
            await e.get_worker(id=id) 
            payload = e.worker           
            return config.templates.TemplateResponse('workers/worker.html', {'request': request, 'data': payload})
        elif request.method == 'PUT':            
            data = await request.json()
            payload = await e.update(data=data)
            return JSONResponse(payload)
        elif request.method == 'POST':
            data = await request.json()            
            payload = await e.save(data=data)
            return JSONResponse(payload)
        elif request.method == 'DELETE':
            payload = await e.delete(data={"_id": id})
            return JSONResponse(payload)
        else:
            return JSONResponse({"status": "Sorry the server is unable to process your Request!"})
    except Exception as ex: return JSONResponse(str(ex))
    finally: del(id); del(e); del(payload)   


async def getworker(request):
    '''Return a single worker object'''    
    try:
        if request.method == 'GET':
            id = request.path_params.get('id')
            e = Employee()
            await e.get_worker(id=id)            
            return JSONResponse(e.worker)
    except Exception as ex: return JSONResponse(str(ex))
    finally: del(id); del(e)     

async def newworker(request):
    '''Creates a new worker and return the data '''
    try:
        e = Employee()
        data = await request.json()
        response = await e.save(data=data)
        return JSONResponse(response)
    except Exception as ex:
        return str(ex)
    finally:
        del(e); del(data)   

async def updateworker(request):
    data = await request.json()            
    payload = await e.update(data=data)
    try:
        return JSONResponse(payload)
    except Exception as e:
        return JSONResponse(str(e))
    finally: del(data); del(payload)
 


async def payworker(request):
    try:
        e = Employee()
        id = request.path_params.get('id')
        data = await request.json()
        data['id'] = gen.gen_id('item')
        data['amount'] = float(data['amount'])
        result = await e.addPay(id=id, data=data)

        return JSONResponse( result )
    except Exception as ex:
        return JSONResponse({"success":False,"id":id, "data":str(ex)})
    finally:
        del(e); del(data)    
    

async def uploadProfileImage(request):
    
        try: 
            import os            
            form = await request.form()
            file=form["file"].file,
            original_filename=form["file"].filename
           
            #id = form['id']
            
            #filename = fileObj.filename
            #contents = await fileObj.file.read()
            #name = form['name']          
            
            
            
            
            '''url = os.path.join(config.WORKER_PROFILE_PATH, filename)
            contents = await form['file'].read()
            with open(url, "wb") as f:
                f.write(contents)
            f.close()'''
            

            return JSONResponse({"status": f"File Id: Name:  Uploaded {original_filename } Successfully!"})
        except Exception as e:
            return JSONResponse({"error": str(e)})
        finally: del(os); #del(form); del(filename); del(url); del(contents)
        