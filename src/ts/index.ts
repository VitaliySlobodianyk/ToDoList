import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
 import {State} from "./interfaces";
 import {Card} from "./interfaces";
 import { Store } from "./modules";
 import {mainReducer} from "./reducers";
 import { Edit } from "./modules";
 import {Actions} from "./actions/action.enum" 
 import {Form}  from "./modules"
import { ToDos } from './modules/todos.module';

const state = new Store(mainReducer);
const edit = new Edit(state); 
const form = new Form(state);
const todos= new ToDos(state);

