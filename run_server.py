#!/usr/bin/env python

import os
import sys
import webbrowser
import subprocess
"""
## Usage
Make sure the 'nupic.cerebro2.server directory' is extracted in here and all requirements are installed. 
(Furter information : see the READMEs)

First, patch your model:

    // Assuming `model` is a CLA model you already have
    from cerebro2.patcher import Patcher
    Patcher().patchCLAModel(model)

You can also patch an SP or a TP directly:

    // Assuming `sp` and `tp` are already defined
    from cerebro2.patcher import Patcher
    Patcher().patchSP(sp)
    Patcher().patchTP(tp)

Then, after the model / SP / TP has through a number of iterations:


Then, run:

    ./run_server <PortNumber>

### Screenshots

To enable taking screenshots with the `p` keyboard shortcut, open `js/classes/abstract_visualization.js` and uncomment the line under the note about screenshots.

@author: passiweinberger
"""

DESCRIPTION = ("This is to set up a Cerebro2 server and open it in your browser.\n"
		"It is assumed, that you already patched your model or the SP & TP parameters.\n"
		"If not, do this as follows:\n\n"
		"First, patch your model:\n"
		
    		"// Assuming `model` is a CLA model you already have\n\n"
    		"from cerebro2.patcher import Patcher\n"
    		"Patcher().patchCLAModel(model)\n\n"
    		
		"You can also patch an SP or a TP directly:\n"

    		"// Assuming `sp` and `tp` are already defined\n\n"
    		"from cerebro2.patcher import Patcher\n"
    		"Patcher().patchSP(sp)\n"
    		"Patcher().patchTP(tp)\n\n"
    		
		"This scripc also assumes that you have the 'nupic.cerebro2.server' folder inside this directory!\n"
		"For further information read the READMEs in these two folders!\n\n"
		"If last lines for Exit Cmd uncommented:\n"
		"Press C-c to kill all the processes. \n"
		"(CAUTION: executes 'killall python' !!)\n")

		
def server_setup(StartDir):
    ServerDir = os.path.join(StartDir, 'nupic.cerebro2.server')
    if not os.path.isdir(ServerDir):
      print "Could not find the nupic.cerebro2.server directory! Please copy it into this Directory!\nTerminated."
      return 1
    else:
      os.chdir(ServerDir)
      print "Server is being set up...\n"
      subprocess.Popen(["python", "server.py"])


def server_call(StartDir, port):
    StaticDir = os.path.join(StartDir, 'static')
    os.chdir(StaticDir)
    print "Calling the server at port number %s" % port 
    command = "python -m SimpleHTTPServer " + str(port)    
    subprocess.Popen(["python", "-m", "SimpleHTTPServer", port])    
    print "Server is up and running at port %s!\n" % port


def open_browser(port):
    print "Opening port %s in your default Browser..." % port 
    url = "http://localhost:%d" % int(port)
    os.spawnl(os.P_NOWAIT, webbrowser.open_new_tab(url))



if __name__ == "__main__":
  if len(sys.argv) == 1:
    print "Please supply a port to be run on!\nTerminated."
  else:
    print DESCRIPTION
    StartDir = os.getcwd()
    port = sys.argv[1]
    #Setting up the server in nupic.cerebro2.server module:
    server_setup(StartDir)
    #Calling the server for the provided port:
    server_call(StartDir, port) 
    #Opening the browser at the port:
    open_browser(port)

    #Exit command:
    #if KeyboardInterrupt:
    #	os.system("gnome-terminal -e 'killall python'")
	

