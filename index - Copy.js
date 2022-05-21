
const {Engine, World, Render, Bodies,Runner,MouseConstraint, Mouse} = Matter;

//World's Dimesions
const Width = 800;
const Height = 500;
const engine = Engine.create();
const {world} = engine;
const render = Render.create({
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
    Bodies.rectangle(400,0,800,40,  {isStatic: true}),
    Bodies.rectangle(400,500,800,40,{isStatic: true}),
    Bodies.rectangle(0,300,40,600,  {isStatic: true}),
    Bodies.rectangle(800,300,40,600,{isStatic: true}),
]

const shape = [
    Bodies.rectangle(200,200,50,50,{isStatic: false}),
    Bodies.circle(200,50,50,{isStatic:false})    
    ];

//random Shapes
const count = 10
for(let shapes=0; shapes< count; shapes++){
    const x = Math.random()*Width;
    const y = Math.random()*Height;
    const length = Math.random()*80;
    const width = Math.random()*80;
    const radius = Math.random()*80;
    
    shape.push(Bodies.rectangle(x,x,length,width,{isStatic: false}))
    shape.push(Bodies.circle(x,y,radius, {isStatic: false}))
}

World.add(world,shape);
World.add(world,walls);
World.add(world, MouseConstraint.create(engine,{
    mouse: Mouse.create(render.canvas)
}))
   