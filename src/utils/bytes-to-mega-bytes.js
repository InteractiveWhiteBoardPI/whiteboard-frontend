const bytesToMegaBytes = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    if (megabytes >= 1) {
        return megabytes.toFixed(2) + " MB";
    } else {
        const kilobytes = bytes / 1024;
        return kilobytes.toFixed(2) + " KB";
    }
};


export default bytesToMegaBytes;