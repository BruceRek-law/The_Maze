
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

//Maze Generation
const grid = Array(CELLS)
            .fill()
            .map(()=>Array(CELLS).fill(false));
console.log(grid)

//Verticals
const Vert = Array(CELLS)
            .fill()
            .map(()=>Array(CELLS-1).fill(false));
            console.log(Vert)
//Horizontals
const Hori = Array(CELLS-1)
            .fill()
            .map(()=>Array(CELLS).fill(false));
            console.log(Hori)

//Random Starting position
const Row = Math.floor((Math.random())*CELLS);
const Col = Math.floor((Math.random())*CELLS);
console.log(Row, Col)

//Traversal
const Traversal = (Row,Col) =>{
    //Check if visited
    if(grid[Row][Col])
        return;
    //Mark as visited
    grid[Row][Col] = true;

    //Random select next spot
    let Neighbors = [
        [Row+1,Col],
        [Row,Col+1],
        [Row-1,Col],
        [Row,Col-1],
    ]
    
    console.log(Neighbors)
    console.log(Shuffle(Neighbors));

};

const Shuffle = (array)=>{
    let size = array.length;
    for(let i = 0; i < size; i++){
        let position = Math.floor(Math.random()*size);
        console.log(array[position], array[i]);
        let temp = array[i];
        array[i] = array[position];
        array[position] = temp;
    }
     console.log(array);
}
const Shuffle_2 = (array) =>{
    let counter = array.length;

    while(counter >0){
        const index = Math.floor(Math.random() * counter);
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

Traversal(Row,Col);
















//const shape = [
  //  Bodies.rectangle(200,200,50,50,{isStatic: false}),
    //Bodies.circle(200,50,50,{isStatic:false})    
    //];



//World.add(world,shape);
World.add(world,walls);

   