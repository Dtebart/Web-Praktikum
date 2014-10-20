# coding: utf-8

import cherrypy
import json
import os

#-------------------------------------
class Application_cl(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        # constructor
        pass
    
    #-------------------------------------
    def default(self, *arglist, **kwargs):
    #-------------------------------------
        msg_s = "unbekannte Anforderung: " + \
              str(arglist) + \
              ' ' + \
              str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)
    
    default.exposed = True
    
    #-------------------------------------
    def get_user_id(self):
    #-------------------------------------
        id_file = open("data\\id.txt", "r+")
        user_id = int(id_file.read()) + 1
        id_file.close()
        
        
        id_file = open("data\\id.txt", "w")
        id_file.write(str(user_id))
        id_file.close()
        
        return str(user_id);
    
    #-------------------------------------
    def get_list(self, *arglist, **kwargs):
    #-------------------------------------
        participants_table = os.listdir("data")
        json_list = []
        
        for participant_file in participants_table:
            json_string = open("data\\" + participant_file, "r+").read()
            json_obj = json.loads(json_string)
            json_list.append(json_obj)
        
        return str(json_list)
    
    get_list.exposed = True
    
    #-------------------------------------
    def registrate(self, *arglist, **kwargs):
    #-------------------------------------
        registration_data = cherrypy.request.body.params
        user_id = self.get_user_id()
        json_file = open("data\\" + user_id + ".json", "w+")
        json.dump(registration_data, json_file)
        json_file.close()
        return str(registration_data)
    
    registrate.exposed = True
           
# EOF
            