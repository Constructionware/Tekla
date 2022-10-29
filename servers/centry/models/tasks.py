#tasks.py

import requests
import orjson as json
from starlette.responses import PlainTextResponse, JSONResponse

from utils.utilities import GenerateId, timestamp

from models.database import Connection

class Task(
    Connection,
    
):
    _id:str = None    
    meta_data:dict = {"created":"today", "database": "cp-tasks"}
    index:set = set()
    task:dict = {}
    tasks:list = []
    
    def __init__(self, data:dict=None) -> None:
        if data:
            self.data = data
            if self.data.get("_id"):
                pass
            else:
                self.generate_id()


    def mount(self, data:dict=None) -> None:        
        if data:
            self.data = data
            if self.data.get("_id"):
                pass
            else:
                self.generate_id()


    async def all(self):
        r = requests.get(f"{self.db_con}_all_docs") 
        return r.json() 

    async def all_tasks(self):        
        def processTasks(task):
            return task['value']
            
        try:
            r = requests.get(f"{self.db_con}_design/index/_view/document").json()
            return list(map(processTasks,  r.get('rows') ))
        except Exception as e:
            return str(e)
        finally: del(r)
             



    async def get(self, id:str=None):
        r = requests.get(f"{self.db_con}{id}") 
        return r.json()  


    async def save(self):        
        response = requests.post(f"{self.db_con}", json=self.data).json()
        print(response)
        return self.data

    async def update(self, data:dict=None):
        task = requests.get(f"{self.db_con}{data.get('_id')}").json()
        payload = task | data
        try:
            return requests.put(f"{self.db_con}{data.get('_id')}", json=payload)
        except Exception as e:
            print(e)
        finally:
            del(data) ; del(task); del(payload)


    async def delete(self, data:dict=None):
        task = requests.get(f"{self.db_con}{data.get('_id')}").json()
        try:
            return requests.delete(f"{self.db_con}{data.get('_id')}?rev={task['_rev']}")
        except Exception as e:
            print(e)
        finally:
            del(task); del(data)

    async def get_elist(self):
        await self.all()
        return self.tasks

    def generate_id(self):
        ''' Generates a unique task id, also updates the task data''' 
        gen = GenerateId()
        try:
            ln = self.data.get('title').split(' ')
            self._id =  gen.name_id(ln=ln[1], fn=self.data.get('title'))
            
        except:
            self._id = gen.name_id('P', 'T')
        finally:
            self.data['_id']=self._id
            return self._id

    @property
    def db_con(self):
        return self.conn(db=self.meta_data.get('database'))


    def update_index(self, data:str) -> None:
        '''  Expects a unique id string ex. JD33766'''        
        self.index.add(data) 


    @property 
    def list_index(self) -> list:
        ''' Converts set index to readable list'''
        return [item for item in self.index]



async def getTasks( request ):
    try:
        t = Task()
        tasks = await t.all_tasks()
        return JSONResponse(tasks)
    except Exception as e:
        return JSONResponse({"error": str(e)})
    finally: del(t); del(tasks)


async def saveTask( request ):
    try:
        payload = await request.json()
        t = Task(data=payload)        
        response = await t.save()       
        return JSONResponse(response )
    except Exception as e:
        return JSONResponse({"error": str(e)})
    finally: del(t); 





