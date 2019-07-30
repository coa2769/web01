import { DockManager } from "../DockManager.js";
import { PanelContainer } from "../PanelContainer.js";
export class DockSpawnTsWebcomponent extends HTMLElement {
    constructor() {
        super();
        this.slotId = 0;
        const template = document.createElement('template');
        template.innerHTML = `
<link rel="stylesheet" href="${DockSpawnTsWebcomponent.cssRootDirectory}/lib/css/dock-manager.css">
<link rel="stylesheet" href="${DockSpawnTsWebcomponent.cssRootDirectory}/lib/css/dock-manager-style.css">
<div id="dockSpawnDiv" style="width:100%;height:100%;position:relative"></div>
`;
        this.windowResizedBound = this.windowResized.bind(this);
        this.slotElementMap = new Map();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        let dockSpawnDiv = shadowRoot.querySelector("#dockSpawnDiv");
        this.dockManager = new DockManager(dockSpawnDiv);
        this.dockManager.config.dialogRootElement = dockSpawnDiv;
        this.dockManager.initialize();
        this.dockManager.addLayoutListener({
            onClosePanel: (dockManager, dockNode) => {
                let slot = dockNode.elementContent;
                let element = this.slotElementMap.get(slot);
                this.removeChild(element);
                this.slotElementMap.delete(slot);
            }
        });
        for (let element of this.children) {
            this.handleAddedChildNode(element);
        }
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    this.handleAddedChildNode(node);
                });
                mutation.removedNodes.forEach((node) => {
                    this.handleRemovedChildNode(node);
                });
            });
        });
        this.observer.observe(this, { childList: true });
        this.dockManager.resize(this.clientWidth, this.clientHeight);
        requestAnimationFrame(() => {
            this.dockManager.resize(this.clientWidth, this.clientHeight);
        });
    }
    handleAddedChildNode(element) {
        let slot = document.createElement('slot');
        let slotName = 'slot_' + this.slotId++;
        slot.name = slotName;
        element.slot = slotName;
        let container = new PanelContainer(slot, this.dockManager);
        this.dockManager.dockFill(this.dockManager.context.model.documentManagerNode, container);
        if (element.style.display == 'none')
            element.style.display = 'block';
        this.slotElementMap.set(slot, element);
    }
    handleRemovedChildNode(element) {
        this.getDockNodeForElement(element).container.close();
    }
    connectedCallback() {
        window.addEventListener('resize', this.windowResizedBound);
        window.addEventListener('orientationchange', this.windowResizedBound);
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.windowResizedBound);
        window.removeEventListener('orientationchange', this.windowResizedBound);
    }
    windowResized() {
        this.resize();
    }
    resize() {
        this.dockManager.resize(this.clientWidth, this.clientHeight);
    }
    getDockNodeForElement(elementOrContainer) {
        let element = elementOrContainer;
        if (element.containerElement)
            element = elementOrContainer.containerElement;
        return this.dockManager.findNodeFromContainerElement(element);
    }
    dockFill(element, panelType, dockNode, title) {
        let container = new PanelContainer(element, this.dockManager, title, panelType);
        this.dockManager.dockFill(dockNode != null ? dockNode : this.dockManager.context.model.documentManagerNode, container);
    }
    dockLeft(element, panelType, dockNode, ratio, title) {
        let container = new PanelContainer(element, this.dockManager, title, panelType);
        this.dockManager.dockLeft(dockNode != null ? dockNode : this.dockManager.context.model.documentManagerNode, container, ratio);
    }
    dockRight(element, panelType, dockNode, ratio, title) {
        let container = new PanelContainer(element, this.dockManager, title, panelType);
        this.dockManager.dockRight(dockNode != null ? dockNode : this.dockManager.context.model.documentManagerNode, container, ratio);
    }
    dockUp(element, panelType, dockNode, ratio, title) {
        let container = new PanelContainer(element, this.dockManager, title, panelType);
        this.dockManager.dockUp(dockNode != null ? dockNode : this.dockManager.context.model.documentManagerNode, container, ratio);
    }
    dockDown(element, panelType, dockNode, ratio, title) {
        let container = new PanelContainer(element, this.dockManager, title, panelType);
        this.dockManager.dockDown(dockNode != null ? dockNode : this.dockManager.context.model.documentManagerNode, container, ratio);
    }
}
DockSpawnTsWebcomponent.cssRootDirectory = "../../";
window.customElements.define('dock-spawn-ts', DockSpawnTsWebcomponent);
//# sourceMappingURL=DockSpawnTsWebcomponent.js.map