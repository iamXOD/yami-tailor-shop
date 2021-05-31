//App Imports
import { InvestmentHandler } from "../handlers";
import buildRouter from "./buildRouter";

export default buildRouter(InvestmentHandler, { mergeParams: true });
