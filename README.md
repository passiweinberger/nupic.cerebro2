# Cerebro 2

A web-based visualization and debugging platform for NuPIC.

## Usage

Set up cerebro2.server to export your model state.

Then, un:

cd static
python -m SimpleHTTPServer 8000
Finally, visit the following URL in your browser:

http://localhost:8000


Quicker Solution: 
Make sure the 'nupic.cerebro2.server directory' is extracted in here and all requirements are installed. 
(Further information : see the READMEs)

First, patch your model:

    // Assuming `model` is a HTM model you already have
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
