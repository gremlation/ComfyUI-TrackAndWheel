import { app } from "../../../scripts/app.js";

const defaultScaleFactor = 100;
let scaleFactor = defaultScaleFactor;

app.registerExtension({
    name: "gremlation:ComfyUI-TrackAndWheel",
    settings: [
        {
            id: "gremlation:ComfyUI-TrackAndWheel:ScaleFactor",
            name: "Scale factor",
            category: ["Track & Wheel ~🅖", "Scale Factor"],
            type: "slider",
            defaultValue: defaultScaleFactor,
            attrs: {
                min: 20,
                max: 1000,
                step: 20,
            },
            onChange: (newVal) => {
                scaleFactor = newVal;
            },
        }
    ],
    setup(app) {
        app.canvas.ds.element.addEventListener("wheel", handleWheelEvent);
    },
});

function handleWheelEvent(event) {
    if (event.metaKey || event.ctrlKey) {
        app.canvas.ds.changeScale(app.canvas.ds.scale - event.deltaY / scaleFactor, [event.clientX, event.clientY]);
    } else {
        app.canvas.ds.mouseDrag(-event.deltaX, -event.deltaY);
    }
    app.graph.change();
    event.preventDefault();
}
