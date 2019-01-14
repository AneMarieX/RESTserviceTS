import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";


interface iProject{
    id: number;
    projectName: string;
    category: string;
    points: number;
   
}

let buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
buttonElement.addEventListener("click", showAll);

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

let buttonDeleteElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
buttonDeleteElement.addEventListener("click", deleteM);
let buttonShowElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Show1Button");
buttonShowElement.addEventListener("click", showOne)

function showOne(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("Show1Input");
    let uri: string = "https://restexamdll.azurewebsites.net/api/projects/";
    console.log(uri+inputElement.value);
    axios.get<iProject>(uri+inputElement.value)
        .then(function (response: AxiosResponse<iProject>): void {
          
            let result: string = "<table style=\"width:100%\"> <tr> <th>ID</th> <th>Name</th> <th>Category</th> <th>Points</th> </tr>";
            let mes: iProject;
            console.log(response.data)
            
            mes = response.data;
            if(mes.id!=undefined){
                result += "<tr> <th>" + mes.id + "</th> <th> " + mes.projectName + "</th> <th>" + mes.category;
                result += "</th> <th>"+mes.points+"</th> </tr>"
            
            result += "</table>";
            output.innerHTML = result;}else{
                output.innerHTML = "No item with this ID"
            }
        })
        .catch(function (error: AxiosError): void {
            if (error.response) {
               
                output.innerHTML = error;
            } else { 
                output.innerHTML = error;
            }
        });}

function showAll(): void {
    let uri: string = "https://restexamdll.azurewebsites.net/api/projects";
    axios.get<iProject[]>(uri)
        .then(function (response: AxiosResponse<iProject[]>): void {
         
            let result: string = "<table style=\"width:100%\"> <tr> <th>ID</th> <th>Name</th> <th>Cathegory</th> <th>Points</th> </tr> ";
            
            response.data.forEach((mes: iProject) => {
                result += "<tr> <th>" + mes.id + "</th> <th> " + mes.projectName + "</th> <th>" + mes.category;
                result += "</th> <th>"+mes.points+"</th> </tr>"
            });
            result += "</table>";
            outputElement.innerHTML = result;
        })
        .catch(function (error: AxiosError): void { 
            if (error.response) {
             
                outputElement.innerHTML = error;
            } else { 
                outputElement.innerHTML = error;
            }
        });
}

function deleteM(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let id: string = inputElement.value;
    let uri: string = "https://restexamdll.azurewebsites.net/api/projects" + id;
    axios.delete<iProject>(uri)
        .then(function (response: AxiosResponse<iProject>): void {
           
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { 
            if (error.response) {
   
                output.innerHTML = error;
            } else {
                output.innerHTML = error;
            }
        });
}

