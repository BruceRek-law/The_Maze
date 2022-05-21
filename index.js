
const {Engine, World, Render, Bodies,Runner} = Matter;

//World's Dimesions
const Width   =700;
const Height  =600;
const engine  = Engine.create();
const {world} = engine;
const render  = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes:false,
        width: Width,
        height: Height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
    Bodies.rectangle(Width/2,0,Width,40,  {isStatic: true}),
    Bodies.rectangle(Width/2,Height,Width,40,{isStatic: true}),
    Bodies.rectangle(0,Height/2,40,Height,  {isStatic: true}),
    Bodies.rectangle(Width,Height/2,40,Height,{isStatic: true}),
]

const shape = [
    Bodies.rectangle(200,200,50,50,{isStatic: false}),
    Bodies.circle(200,50,50,{isStatic:false})    
    ];



World.add(world,shape);
World.add(world,walls);

   