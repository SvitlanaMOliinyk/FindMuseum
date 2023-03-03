import Museum from "../models/Museum.js";

export const getMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();
    res.status(200).json({ success: true, result: museums });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unable to get museums, please try again later",
    });
  }
};

export const getMuseumNamePlace = async (req, res) => {
  const { key } = req.params;
  try {
    const museumNamePlaceResult = await Museum.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { "address.city": { $regex: key, $options: "i" } },
      ],
    }).exec();
    res.status(200).json({ success: true, result: museumNamePlaceResult });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Museum with the name ${key} was not found`,
    });
  }
};

// Gokhan added
export const getMuseumById = async (req, res) => {
  const id = req.params.museumId;
  try {
    const museum = await Museum.find({ _id: id });
    res.status(200).json({ success: true, result: museum });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `unable to get museum with id: ${id}`,
    });
  }
};

// export const paginateUser = async (req, res) => {
//   const allMuseums = await Museum.find({});
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);

//   const startIndex = (page - 1) * limit;
//   const lastIndex = page * limit;

//   const results = {};
//   results.totalUser = allMuseums.length;
//   results.pageCount = Math.ceil(allMuseums.length / limit);

//   if (lastIndex < allMuseums.length) {
//     results.next = {
//       page: page + 1,
//     };
//   }
//   if (startIndex > 0) {
//     results.prev = {
//       page: page - 1,
//     };
//   }
//   results.result = allMuseums.slice(startIndex, lastIndex);
//   res.json(results);
// };
