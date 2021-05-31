//App Imports
import { OptionsFn } from ".";

export const addMaterialId: OptionsFn = (req, options = {}) => {
    const materialId = Number(req.params.materialId);
    if (materialId) {
        return { ...options, where: { ...options.where, materialId } };
    }
    return options;
};
