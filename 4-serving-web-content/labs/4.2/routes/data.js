const { Router } = require("express");
const { finished, Readable, Transform } = require("stream");

const router = Router();

function stream() {
  const readable = Readable.from(
    ["this", "is", "a", "stream", "of", "data"].map((s) => s + "<br>")
  );
  const delay = new Transform({
    transform(chunk, enc, cb) {
      setTimeout(cb, 500, null, chunk);
    },
  });
  return readable.pipe(delay);
}

router.get("/", (req, res, next) => {
  const dataStream = stream();
  dataStream.pipe(res, { end: false });

  finished(dataStream, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.end();
  });
});

module.exports = router;
