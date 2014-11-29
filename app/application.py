# coding: utf-8

import cherrypy
import json
import os

from app import database

#-------------------------------------
class Application_cl(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        # constructor
        self.database_obj = database.Database("data\\")
    
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
    def check_incoming_Data(self, data):
    #-------------------------------------
        if len(data.keys()) == 0:
            raise cherrypy.HTTPError(403, "No Data recieved")
        return True
	
    #-------------------------------------
    def get_list(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch a table of all files in directory data
        participants_table = os.listdir("data")
        json_list = []
        
        # Open all json files in directory data and append them to output string
        for participant_file in participants_table:
            if participant_file.endswith(".json"):
                json_obj = self.database_obj.readFile(participant_file[:-5])
                json_list.append(json_obj)
        return str(json_list)
    
    get_list.exposed = True
    
    #-------------------------------------
    def registrate(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch request-data
        registration_data = cherrypy.request.body.params
        self.check_incoming_Data(registration_data)
        self.database_obj.insertFile(registration_data)
        
        return str(registration_data)   
    
    registrate.exposed = True
    
    #-------------------------------------
    def edit(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch request-data
        edit_data = cherrypy.request.body.params
        self.check_incoming_Data(edit_data)	 		
        # Get password in file of requested user
        json_obj = self.database_obj.readFile(edit_data["id"])
        
        if json_obj["password"] == edit_data["password"]:
            # Override user-data with new data
            self.database_obj.editFile(edit_data)
        else:
            raise cherrypy.HTTPError(403, "Invalid password")
        
        return str(edit_data)
           
    edit.exposed = True
    
    #-------------------------------------
    def delete(self, *arglist, **kwargs):
    #-------------------------------------
        # Catch request-data
        delete_data = cherrypy.request.body.params
        self.check_incoming_Data(delete_data)
        
        json_obj = self.database_obj.readFile(delete_data["id"])
        if json_obj["password"] == delete_data["password"]:
            self.database_obj.deleteFile(delete_data)
        else:
            raise cherrypy.HTTPError(403, "Invalid password")        
        
        return str(delete_data)
    
    delete.exposed = True


# EOF
            