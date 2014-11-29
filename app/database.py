# coding: utf-8

import os
import json

#-------------------------------------
class Database(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self, rootdir_str):
    #-------------------------------------
        self.rootdir_str = rootdir_str
        
        
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
    def insertFile(self, userData):
    #-------------------------------------
        # Create new file for user registration
        userData["id"] = self.next_user_id()
        json_file = open(self.rootdir_str + userData["id"] + ".json", "w+")
        json.dump(userData, json_file)
        json_file.close()
    
    #-------------------------------------
    def readFile(self, fileName):
    #-------------------------------------
        json_file = open(self.rootdir_str + fileName + ".json", "r+")
        json_str = json_file.read()
        json_obj = json.loads(json_str)
        json_file.close()
                
        return json_obj        
    
    #-------------------------------------
    def editFile(self, userData):
    #-------------------------------------
        json_file = open(self.rootdir_str + userData["id"] + ".json", "w+")
        json.dump(userData, json_file)
        json_file.close()
    
    #-------------------------------------
    def deleteFile(self, userData):
    #-------------------------------------
        os.remove(self.rootdir_str + userData["id"] + ".json")
        