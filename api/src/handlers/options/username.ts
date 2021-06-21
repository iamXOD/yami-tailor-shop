//App Imports
import { addParamToWhere, ifConditionMergeWhere, OptionsFn } from "./utils";

export const addUsername = addParamToWhere((s) => s.toLowerCase(), "name");

export const addCurrentUsername: OptionsFn = (req, options) => {
    const username = req.user?.username.toLowerCase();
    return ifConditionMergeWhere(options, Boolean(username), {
        username,
    });
};
