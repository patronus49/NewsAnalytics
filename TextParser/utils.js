const trimTrailingCommaFromString = (string) => {
    string = string.replace(/,+$/, "");
    return string;
}

const Utils = {
    trimTrailingCommaFromString
}

module.exports = Utils;