//App Imports
import { OptionsFn } from ".";

export const addActorId = (actorIdPropName: string): OptionsFn => {
    return (req, options = {}) => {
        const actorId = Number(req.params.actorId);
        if (actorId) {
            return {
                ...options,
                where: { ...options?.where, [actorIdPropName]: actorId },
            };
        }
        return options;
    };
};
