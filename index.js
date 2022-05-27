
const {Engine, World, Render, Bodies,Runner} = Matter;
const CELLS =3;
//World's Dimesions
const Width   =700;
const Height  =700;
const engine  = Engine.create();
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
    Bodies.rectangle(Width/2,0,Width,40,      {isStatic: true}),
    Bodies.rectangle(Width/2,Height,Width,40, {isStatic: true}),
    Bodies.rectangle(0,Height/2,40,Height,    {isStatic: true}),
    Bodies.rectangle(Width,Height/2,40,Height,{isStatic: true}),
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
   