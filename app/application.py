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
        # Return an error message
        msg_s = "unbekannte Anforderung: " + \
              str(arglist) + \
              ' ' + \
              str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)
    
    default.exposed = True
    
    #-------------------------------------
    def next_user_id(self):
    #-------------------------------------
        # Catch current user-id + 1
        id_file = open("data\\id.txt", "r+")
        user_id = int(id_file.read()) + 1
        id_file.close()
        
        # Override new user-id
        id_file = open("data\\id.txt", "w")
        id_file.write(str(user_id))
        id_file.close()
        
        return str(user_id);
    
    #-------------------------------------
    def get_list(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch a table of all files in directory data
        participants_table = os.listdir("data")
        json_list = []
        
        # Open all json files in directory data and append them to output string
        for participant_file in participants_table:
            if participant_file.endswith(".json"):
                file_obj = open("data\\" + participant_file, "r+")
                json_string = file_obj.read()
                json_obj = json.loads(json_string)
                json_list.append(json_obj)
                file_obj.close()
        
        return str(json_list)
    
    get_list.exposed = True
    
    #-------------------------------------
    def registrate(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch request-data
        registration_data = cherrypy.request.body.params
        
        # Create new file for user registration
        registration_data["id"] = self.next_user_id()
        json_file = open("data\\" + registration_data["id"] + ".json", "w+")
        json.dump(registration_data, json_file)
        json_file.close()
        
        return str(registration_data)
    
    registrate.exposed = True
    
    #-------------------------------------
    def edit(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch request-data
        edit_data = cherrypy.request.body.params
        
        # Override user-data with new data
        json_file = open("data\\" + edit_data["id"] + ".json", "w+")
        json.dump(edit_data, json_file)
        json_file.close()
        
        return str(edit_data)
           
    edit.exposed = True
    
    #-------------------------------------
    def delete(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch request-data
        delete_data = cherrypy.request.body.params
        
        os.remove("data\\" + delete_data["id"] + ".json")
        
        return str(delete_data)
    
    delete.exposed = True
# EOF
            