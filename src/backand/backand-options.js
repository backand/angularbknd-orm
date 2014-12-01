/**
 * @desc global configuration for the backand object
 * @param {string} url
 * @param {number} version
 * @author nir.k
 * @constructor
 */
function BackandOptions(url, version) {
    this.url = url;
    this.version = version.toString();
    this.verbs = {get: "GET", put: "PUT", post: "POST", delete: "DELETE"};
}

/**
 * @desc build and return the url
 * @param apiUrl
 * @returns {string}
 */
BackandOptions.prototype.getUrl = function (apiUrl) {
    return this.url + '/' + this.version + apiUrl;
};