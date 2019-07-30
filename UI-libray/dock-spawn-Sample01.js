import { DockManager } from "./dock-spawn-ts-master/lib/js/DockManager.js";
import { PanelContainer } from "./dock-spawn-ts-master/lib/js/PanelContainer.js";

// window.onload = () => { // Convert a div to the dock manager. Panels can then be docked on to it
//     let divDockContainer1 = document.getElementById('dock_div1');
//     let divDockManager1 = document.getElementById('my_dock_manager1');
//     let dockManager1 = new DockManager(divDockManager1);
//     let divDockContainer2 = document.getElementById('dock_div2');
//     let divDockManager2 = document.getElementById('my_dock_manager2');
//     let dockManager2 = new DockManager(divDockManager2);
//     dockManager1.initialize();
//     dockManager2.initialize();
//     dockManager1.resize(divDockContainer1.clientWidth, divDockContainer1.clientHeight);
//     dockManager2.resize(divDockContainer2.clientWidth, divDockContainer2.clientHeight);
//     let editor1_1 = new PanelContainer(document.getElementById("edt1_1"), dockManager1);
//     let editor2_1 = new PanelContainer(document.getElementById("edt2_1"), dockManager1);
//     let documentNode1 = dockManager1.context.model.documentManagerNode;
//     dockManager1.dockFill(documentNode1, editor1_1);
//     dockManager1.dockFill(documentNode1, editor2_1);
//     let editor1_2 = new PanelContainer(document.getElementById("edt1_2"), dockManager2);
//     let editor2_2 = new PanelContainer(document.getElementById("edt2_2"), dockManager2);
//     let documentNode2 = dockManager2.context.model.documentManagerNode;
//     dockManager2.dockFill(documentNode2, editor1_2);
//     dockManager2.dockFill(documentNode2, editor2_2);
// };


window.onload = () => {
    // Convert a div to a dock manager.  Panels can then be docked on to it
    let divDockManager = document.getElementById('dock_div');
    let dockManager = new DockManager(document.getElementById('my_dock_manager'));
    dockManager.initialize();

    // Let the dock manager element fill in the entire screen
    window.onresize = function() {
        dockManager.resize(
            window.innerWidth - (divDockManager.clientLeft + divDockManager.offsetLeft),
            window.innerHeight - (divDockManager.clientTop + divDockManager.offsetTop)
        );
    };
    window.onresize(null);

    // Convert existing elements on the page into "Panels". 
    // They can then be docked on to the dock manager 
    // Panels get a titlebar and a close button, and can also be 
    // converted to a floatingdialog box which can be dragged / resized 
    let solution = new PanelContainer(document.getElementById("solution_window"), dockManager);
    // let output = new PanelContainer(document.getElementById("output_window"), dockManager);
    // let properties = new PanelContainer(document.getElementById("properties_window"), dockManager);
    // let toolbox = new PanelContainer(document.getElementById("toolbox_window"), dockManager);
    // let outline = new PanelContainer(document.getElementById("outline_window"), dockManager);
    // let problems = new PanelContainer(document.getElementById("problems_window"), dockManager);
    // let editor1 = new PanelContainer(document.getElementById("editor1_window"), dockManager);
    // let editor2 = new PanelContainer(document.getElementById("editor2_window"), dockManager);
    // let infovis = new PanelContainer(document.getElementById("infovis"), dockManager);

    // Dock the panels on the dock manager
    let documentNode = dockManager.context.model.documentManagerNode;
    let solutionNode = dockManager.dockLeft(documentNode, solution, 0.20);
    // let outlineNode = dockManager.dockFill(solutionNode, outline);
    // let propertiesNode = dockManager.dockDown(outlineNode, properties, 0.6);
    // let outputNode = dockManager.dockDown(documentNode, output, 0.4);
    // let problemsNode = dockManager.dockRight(outputNode, problems, 0.40);
    // let toolboxNode = dockManager.dockRight(documentNode, toolbox, 0.20);
    // let editor1Node = dockManager.dockFill(documentNode, editor1);
    // let editor2Node = dockManager.dockFill(documentNode, editor2);
    dockManager.floatDialog(infovis, 50, 50);

    // You could listen to callbacks of DockManager like this, there are more event's then close available see ILayoutEventListener
    dockManager.addLayoutListener({
        onClosePanel: (dockManager, panel) => {
            console.log('onClosePanel: ', dockManager, panel);
            localStorage.setItem(storeKey, dockManager.saveState());
        }
    });
}