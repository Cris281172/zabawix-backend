const getCurrentDate = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

module.exports = getCurrentDate()