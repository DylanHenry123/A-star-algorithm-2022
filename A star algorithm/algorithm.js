var arr = [];

function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

class Node{
    constructor(dx, dy){
        this.x = dx;
        this.y = dy;
        this.f = 1000; // g + h
        this.g = 1000; // Current distance travelled to reach this node
        this.h = 1000; // Heuristic distance to the end node
        this.start_node = false;
        this.end_node = false;
        this.considered = false;
        this.chosen = false;
        this.isBarrier = false;
        this.onPath = false;
    }

    get_neighbours(){
        if(this.x == 0 && this.y == 0){
            return [arr[this.x + 1][this.y], arr[this.x][this.y + 1], arr[this.x + 1][this.y + 1]];
        } else if(this.x == 0 && this.y == arr[0].length - 1){
            return [arr[this.x + 1][this.y], arr[this.x][this.y - 1], arr[this.x + 1][this.y - 1]];
        } else if(this.x == arr.length - 1 && this.y == 0){
            return [arr[this.x - 1][this.y], arr[this.x][this.y + 1], arr[this.x - 1][this.y + 1]];
        } else if(this.x == arr.length - 1 && this.y == arr[0].length - 1){
            return [arr[this.x - 1][this.y], arr[this.x][this.y - 1], arr[this.x - 1][this.y - 1]];
        } else if(this.x == 0){
            return [arr[this.x + 1][this.y], arr[this.x][this.y - 1], arr[this.x][this.y + 1], arr[this.x + 1][this.y - 1], arr[this.x + 1][this.y + 1]];
        } else if(this.x == arr.length - 1){
            return [arr[this.x - 1][this.y], arr[this.x][this.y - 1], arr[this.x][this.y + 1], arr[this.x - 1][this.y - 1], arr[this.x - 1][this.y + 1]];
        } else if(this.y == 0){
            return [arr[this.x + 1][this.y], arr[this.x - 1][this.y], arr[this.x][this.y + 1], arr[this.x + 1][this.y + 1], arr[this.x - 1][this.y + 1]];
        } else if(this.y == arr[0].length - 1){
            return [arr[this.x + 1][this.y], arr[this.x - 1][this.y], arr[this.x][this.y - 1], arr[this.x + 1][this.y - 1], arr[this.x - 1][this.y - 1]];
        } else {
            return [arr[this.x + 1][this.y], arr[this.x][this.y + 1], arr[this.x][this.y - 1], arr[this.x - 1][this.y], arr[this.x + 1][this.y + 1], 
                    arr[this.x + 1][this.y - 1], arr[this.x - 1][this.y + 1], arr[this.x - 1][this.y - 1]];
        }
    }
}

function fillArray(rows, cols){
    // Filling the initial array
    for(let i = 0; i < rows; i++){
        let this_row = [];
        for(let j = 0; j < cols; j++){
            this_row.push(" ");
        }

        arr.push(this_row);
    }
}

function generate_grid_attributes(width, height, start_node, end_node){
    // Function used to fill the initial array.
    let start_node_x = start_node[0];
    let start_node_y = start_node[1];

    let end_node_x = end_node[0];
    let end_node_y = end_node[1];

    console.log(`The start node is at: (${start_node_x}, ${start_node_y})`);
    console.log(`The end node is at: (${end_node_x}, ${end_node_y})`);

    for(let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            if(i == start_node_y && j == start_node_x){
                let new_node = new Node(i, j);
                new_node.start_node = true;
                arr[i][j] = new_node;

            } else if(i == end_node_y && j == end_node_x){
                let new_node = new Node(i, j);
                new_node.end_node = true;
                arr[i][j] = new_node;

            } else {
                let new_node = new Node(i, j);
                arr[i][j] = new_node;
            }
        }
    }
}

function draw_grid(){
    // Draws the array to the screen in an acceptable format

    let tbl = document.getElementById("canvas");

    for(let i = 0; i < arr.length; i++){

        let myRow = document.createElement("tr");
        myRow.id = "row" + i;

        tbl.appendChild(myRow);

        let rowCell = document.getElementById("row" + i);


        for(let j = 0; j < arr[0].length; j++){
            let myCell = document.createElement("td");
            rowCell.append(myCell);

            myCell.id = "row" + i + " " + "col" + j;

            myCell.addEventListener('click', function handleClick(event) {
                if(arr[i][j].isBarrier){
                    arr[i][j].isBarrier = false;
                    console.log(arr[i][j]);
                } else {
                    arr[i][j].isBarrier = true;
                    console.log(arr[i][j]);
                }
            
                updateGrid();
            });

            if(!(arr[i][j] == " ")){
                if(arr[i][j].start_node){
                    myCell.style.backgroundColor = "green";
                } else if(arr[i][j].end_node){
                    myCell.style.backgroundColor = "red";
                } else if(arr[i][j].onPath){
                    myCell.style.backgroundColor = "yellow";
                } else if(arr[i][j].chosen){
                    myCell.style.backgroundColor = "blue";
                } else if(arr[i][j].considered){
                    myCell.style.backgroundColor = "lightblue";
                } else if(arr[i][j].isBarrier){
                    myCell.style.backgroundColor = "black";
                } else {
                    myCell.style.backgroundColor = "white";
                }
            } else {
                myCell.style.backgroundColor = "white";
            }
        }
    }
}

function updateGrid(){
    for(let i = 0; i < arr.length; i++){
        let the_row = document.getElementById("row" + i);
        the_row.remove();
    }

    draw_grid();
}

function clear_grid(){
    for(let i = 0; i < arr.length; i++){
        let the_row = document.getElementById("row" + i);
        the_row.remove();
    }
}

function clear_from_screen(){
    for(let i = 0; i < arr.length; i++){
        let the_row = document.getElementById("row" + i);
        the_row.remove();
    }

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[0].length; j++){
            arr[i][j] = " ";
        }
    }

    draw_grid();
}

function algorithm(start_node, end_node){
    let start_node_x = start_node[1];
    let start_node_y = start_node[0];

    let end_node_x = end_node[1];
    let end_node_y = end_node[0];

    let start = arr[start_node_x][start_node_y];
    let target = arr[end_node_x][end_node_y];
    start.g = 0;
    target.h = 0;

    let chosen_nodes = [start];
    console.log(start_node_x, start_node_y, end_node_x, end_node_y);

    let node_list = calculate(start, start, target, end_node_x, end_node_y, chosen_nodes);

    console.log(node_list);

    return node_list;
}

function calculate(node, start, target, end_node_x, end_node_y, chosen_nodes){

    if(node == target){
        return chosen_nodes;
    } else {
        let neighbour_list = node.get_neighbours();
        let adequate_nodes = [];

        for(let i = 0; i < neighbour_list.length; i++){
            let current_node = neighbour_list[i];

            if(current_node != start){
                if(!current_node.isBarrier && !current_node.chosen && !current_node.considered){
                    current_node.considered = true;

                    current_node.g = chosen_nodes[chosen_nodes.length - 1].g + 1;
                    current_node.h = round(Math.sqrt(Math.pow((end_node_x - current_node.x), 2) + Math.pow((end_node_y - current_node.y), 2)), 2);
                    current_node.f = round(current_node.g + current_node.h, 2);

                    adequate_nodes.push(current_node);
                }
            }
        }

        updateGrid();

        let selected_node = new Node(100, 100);
        // Planned update to the code
        if (adequate_nodes.length > 0){
            selected_node = adequate_nodes[0];
        }

        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[0].length; j++){
                if(arr[i][j] != start && !arr[i][j].chosen && arr[i][j] != selected_node){
                    if(arr[i][j].f < selected_node.f){
                        selected_node = arr[i][j];
                    }
                } 
            }
        }

        selected_node.chosen = true;
        chosen_nodes.push(selected_node);

        updateGrid();

    }

    let next_node = chosen_nodes[chosen_nodes.length - 1];
    console.log(next_node);

    return calculate(next_node, start, target, end_node_x, end_node_y, chosen_nodes);
    // return next_node;
}

function getThePath(node_list){
    let path = [];

    let this_node_in_path = node_list[node_list.length - 1];
    console.log(this_node_in_path);
    path.push(this_node_in_path);

    path = calculate_path(this_node_in_path, path);

    updateGrid();

    return path;
}

function calculate_path(node, path){
    let neighbour_list = node.get_neighbours();
    console.log(neighbour_list);

    if(node.g == 1){
        path.push(node);
        node.onPath = true;
        return path;
    } else {
        for(let j = 0; j < neighbour_list.length; j++){
            console.log(neighbour_list[j].g == node.g - 1);
            if(neighbour_list[j].g == node.g - 1){
                path.push(neighbour_list[j]);
                neighbour_list[j].onPath = true;

                updateGrid();
                return calculate_path(neighbour_list[j], path);
            }
        }
    }
}

function gridSetUp(){
    let starting_node_x = document.getElementById("start_x").value;
    let starting_node_y = document.getElementById("start_y").value;
    let ending_node_x = document.getElementById("end_x").value;
    let ending_node_y = document.getElementById("end_y").value;

    let start_node = [starting_node_x, starting_node_y];
    let end_node = [ending_node_x, ending_node_y];

    console.log(start_node, end_node);

    clear_grid();

    generate_grid_attributes(50, 50, start_node, end_node);

    console.log(arr);

    draw_grid();
}

function main(){
    let starting_node_x = document.getElementById("start_x").value;
    let starting_node_y = document.getElementById("start_y").value;
    let ending_node_x = document.getElementById("end_x").value;
    let ending_node_y = document.getElementById("end_y").value;

    let start_node = [starting_node_x, starting_node_y];
    let end_node = [ending_node_x, ending_node_y];

    let outcome = algorithm(start_node, end_node);

    let path = getThePath(outcome);

    console.log(path);

    let text = document.getElementById('the_length');
    
    text.innerHTML = `The length of this path is: ${path.length - 1}`;

    updateGrid();
}

fillArray(50, 50);
draw_grid();


// Could add something to highlight the optimal path when the target node is reached by backtracking the distances.
// Issue could be that it is not chosing the shortest node in f at the time and only the nodes whose f values can be considered in the calculate function.
// Step through the code to make sure that the right decision is being made at each step of the problem.


// Original code:
        // let selected_node = list_to_chose[0];

        // for(let i = 1; i < list_to_chose.length; i++){
        //     if(list_to_chose[i] != start){
        //         if(list_to_chose[i].f < selected_node.f){
        //             selected_node = list_to_chose[i];
        //             console.log(selected_node);
        //         }
        //     }
        // }