import os
import datetime


from starlette.templating import Jinja2Templates

from utils.utilities import GenerateId

#----------------------------- ID Generation Service ----------------------------------
 

class Config:
    NAME = "Sledge"

    BASE_PATH = os.path.abspath(os.getcwd())
   
    STATIC_PATH = os.path.join(BASE_PATH, 'static')
    TEMPLATES_PATH = os.path.join(BASE_PATH, 'templates')
    JOB_TASK_PATH = os.path.join(BASE_PATH, 'task')
    WORKER_PROFILE_PATH = os.path.join(STATIC_PATH, 'imgs', 'workers')
    DOCUMENT_PATH = os.path.join(STATIC_PATH, 'documents')
    
    PORT = 7900
    HOST = '0.0.0.0'

    # Templates

    templates = Jinja2Templates(directory=TEMPLATES_PATH)


    @property
    def SECRET_KEY(self):
        try:
            g =  GenerateId()
            return g.gen_id('app')
        except Exception as e:
            print(str(e))
        finally:
            del(g)


config = Config()
