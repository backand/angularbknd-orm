/**
 * @desc this class should be overridden
 * and implemented using another library (jquery, angular etc..)
 * @author nir.k
 * @constructor
 */
function BackandNetwork() {

    this.json = function () {
        throw Error("missing implementation.")
    };

    this.file = function () {
        throw Error("missing implementation.")
    }
}