//Imports
//App Imports
import { FixHandler } from "../handlers";
import buildRouter from "./buildRouter";

export default buildRouter(FixHandler, { mergeParams: true });
