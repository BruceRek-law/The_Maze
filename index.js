const {Engine, World, Render, Bodies,Runner,Body, Events} = Matter;
const CELLS =4;
//World's Dimesions
const Width   =600;
const Height  =600;

const unitLength = Height/CELLS;
const engine  = Engine.create();
engine.world.gravity.y = 0;
const {world} = engine;
const render  = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes:true,
        width: Width,
        height: Height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
    Bodies.rectangle(Width/2,0,Width,1,      {isStatic: true}),
    Bodies.rectangle(Width/2,Height,Width,1, {isStatic: true}),
    Bodies.rectangle(0,Height/2,1,Height,    {isStatic: true}),
    Bodies.rectangle(Width,Height/2,1,Height,{isStatic: true}),
]
World.add(world,walls);

const Shuffle = (arr)=>{
    let counter = arr.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
  
      counter--;
  
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
  
    return arr;
}

//Maze Generation
const grid = Array(CELLS)
            .fill(null)
            .map(()=>Array(CELLS).fill(false));
console.log(grid)

//Verticals
const Vert= Array(CELLS)
            .fill(null)
            .map(()=>Array(CELLS-1).fill(false));
//console.log(Vert)
//Horizontals
const Hori  = Array(CELLS-1)
            .fill(null)
            .map(()=>Array(CELLS).fill(false));
//console.log(Hori)
//Random Starting position
const startRow = Math.floor((Math.random())*CELLS);
const startCol = Math.floor((Math.random())*CELLS);

//Traversal
const Traversal = (Row,Col) =>{
    //Check if visited
    if(grid[Row][Col])
        return;
    //Mark as visited
    grid[Row][Col] = true;

    //Random select next spot
    const Neighbors2 = Shuffle([
        [Row-1,Col,  'up'],
        [Row,  Col+1,'right'],
        [Row+1,Col,  'down'],
        [Row,  Col-1,'left'],
    ])
    
    //for each neighbor 
    for(let neighbor of Neighbors2){
        const [nextRow, nextColumn, direction] = neighbor;
        
        //Check for outofbounds
        if(nextColumn<0 || nextColumn >= CELLS ||nextRow<0     || nextRow >= CELLS)
            continue;
        //Check if visited
        if(grid[nextRow][nextColumn])
            continue;

        //Updating Verticals
        if(direction === 'left')
            Vert[Row][Col-1] = true;
        else if(direction === 'right')
            Vert[Row][Col] = true;
        else if(direction === 'up')
            Hori[Row-1][Col] = true;
        else if(direction === 'down')
            Hori[Row][Col] = true;    
        
        Traversal(nextRow,nextColumn);
    }  
};

Traversal(startRow,startCol);

Hori.forEach((row,columnIndex) =>{
    row.forEach((open,rowIndex) =>{
        if(open)
            return;
        
        const wall = Bodies.rectangle(
            columnIndex*unitLength+(unitLength/2),
            rowIndex*unitLength+unitLength,
            unitLength,
            1,
            {
                isStatic: true
            }
        );

        World.add(world,wall);
    })
})
Vert.forEach((row, rowIndex) =>{
    row.forEach((open,columnIndex) =>{
        if(open)
            return;
        
        const wall = Bodies.rectangle(
            columnIndex*unitLength+unitLength,
            rowIndex*unitLength+(unitLength/2),
            1,
            unitLength,
            {
                isStatic: true
            }
        )
        World.add(world,wall)
    })
})

const goal = Bodies.rectangle(
    Width-unitLength/2,
    Width-unitLength/2,
    unitLength/2,
    unitLength/2,
    {
        isStatic:true,
        label: 'goal'
    }
);

const ball = Bodies.circle(
    unitLength/2,
    unitLength/2,
    unitLength/4,
    {
    label: 'ball'
    }
)
const objects = [goal,ball]
World.add(world,objects);

document.addEventListener('keydown', event=>{
    let {x,y} = ball.velocity;

    console.log(event)
    if(event.keyCode === 38)
        Body.setVelocity(ball, {x, y:y-5})
    if(event.keyCode === 40)
        Body.setVelocity(ball, {x, y:y+5})
    if(event.keyCode ===37)
        Body.setVelocity(ball, {x :x-5, y})
    if(event.keyCode ===39)
        Body.setVelocity(ball, {x :x+5, y})
})

//Win Condition
Events.on(engine,'collisionStart', (event) =>{
    event.pairs.forEach((collision) =>{
        console.log(collision);
    })
    console.log(event);
})