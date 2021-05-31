//Imports
import { OrderHandler } from "../handlers";
import buildRouter from "./buildRouter";

export default buildRouter(OrderHandler, { mergeParams: true });
