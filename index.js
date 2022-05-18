
const {Engine, World, Render, Bodies,Runner,MouseConstraint} = Matter;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 500
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
    Bodies.rectangle(400,0,800,40,  {isStatic: true}),
    Bodies.rectangle(400,500,800,40,{isStatic: true}),
    Bodies.rectangle(0,300,40,600,  {isStatic: true}),
    Bodies.rectangle(800,300,40,600,  {isStatic: true}),
]

const shape = [
Bodies.rectangle(200,200,50,50,{isStatic: false}),
Bodies.circle(300,70,70,{isStatic:false})    
];
World.add(world,shape);
World.add(world,walls);
World.add(world, MouseConstraint.create(engine,{
    mouse:Mouse.create(render.canvas)
}))
   