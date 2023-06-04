const mongoose = require("mongoose");

const password = "bi5rUUcJLiMoq3";

const url = `mongodb+srv://maoraz:${password}@cluster0.mspehtz.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const metaSchema = new mongoose.Schema({
  user: String,
  date: String,
  postId: String,
  url: String,
});

const Meta = mongoose.models.Meta || mongoose.model("Meta", metaSchema);

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default function uploadMeta(userName, postId, date, videoUrl) {
  const meta = new Meta({
    user: userName,
    postId: postId,
    date: date,
    url: videoUrl,
  });

  meta
    .save()
    .then((result) => {
      console.log("meta saved!");
    })
    .catch((error) => {
      console.error("Error saving meta: ", error);
    });
}
