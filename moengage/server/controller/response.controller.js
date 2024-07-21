import { ResponseCode } from "../model/response.model.js";
import { List } from "../model/list.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const filterResponseCode = async (req, res, next) => {
  try {
    const filter = req.params.filter.replace(/x/g, "\\d");
    const regex = new RegExp(`^${filter}`);
    const lists = await List.find({ code: { $regex: regex } });
    const responseCodes = [];
    for (const list of lists) {
      const existingResponseCode = await ResponseCode.findOne({ code: list.code });
      if (!existingResponseCode) {
        const newResponseCode = new ResponseCode({
          code: list.code,
          imageUrl: list.image,
        });
        await newResponseCode.save();
        responseCodes.push(newResponseCode);
      } else {
        responseCodes.push(existingResponseCode);
      }
    }
    const resCode = await ResponseCode.find({ code: { $regex: regex } });

    return res
      .status(200)
      .json(new ApiResponse(200, resCode, "Response code fetched successfully"));
  } catch (error) {
    console.error("Error in filterResponseCode:", error);
    next(new ApiError(500, "Internal Server Error"));
  }
};

export { filterResponseCode };
