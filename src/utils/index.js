const getFileExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  };

const  onFormatTitle = (name) => {
    return name
      .replace(/\.[^/.]+$/, "")
      .replace(/_/g, " ")
      .replace(/-/g, " ");
  };

const onFormatName = (name) => {
    return name.replace(/\.[^/.]+$/, "");
  };

const onFormatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

const removeHyphen = (id) => {
   return id.replace(/-/g, "");
  };

export {
    getFileExtension,
    onFormatTitle,
    onFormatName,
    onFormatBytes,
    removeHyphen,
}