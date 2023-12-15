function Sanitize(input) {
    input = input.replace("'", '')
    input = input.replace('"', '')
    input = input.replace(";", '')
    input = input.replace("-", '')
    input = input.replace("#", '')
    input = input.replace("%", '')
    input = input.replace("_", '')
    return input;
}
export default Sanitize;